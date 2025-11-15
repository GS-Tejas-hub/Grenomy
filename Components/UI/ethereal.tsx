"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Section = { id: string; headline: string; subheadline: string; body: string };

type Palette = {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  dark: string;
};

type Props = {
  sections?: Section[];
  colorPalette?: Palette;
  logo?: string;
  menuItems?: string[];
  backgroundOnly?: boolean;
  afterContent?: React.ReactNode;
};

const DEFAULT_SECTIONS: Section[] = [
  { id: "hero", headline: "Grenomy", subheadline: "Beyond Reality", body: "Immersive experiences through computational artistry" },
  { id: "about", headline: "Innovation", subheadline: "Through Design", body: "Pushing boundaries of digital experiences" },
  { id: "services", headline: "Crafted", subheadline: "With Purpose", body: "Every pixel serves a greater vision" },
  { id: "contact", headline: "Connect", subheadline: "Create Together", body: "Let's build something extraordinary" }
];

const DEFAULT_PALETTE: Palette = {
  primary: "#10b981",   // emerald-500
  secondary: "#0ea5a4", // teal-500
  tertiary: "#22c55e",  // green-500
  accent: "#34d399",    // emerald-400
  dark: "#0a0a0a"
};

const paletteGLSL = `
  vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b*cos(6.28318*(c*t + d));
  }
`;

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying float vDist;
  uniform float uTime;
  uniform float uScrollVelocity;
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g  = step(x0.yzx, x0.xyz);
    vec3 l  = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = i - floor(i * (1.0/289.0)) * 289.0;
    vec4 p = ((i.z + vec4(0.0, i1.z, i2.z, 1.0))*34.0 + 1.0) * (i.z + vec4(0.0, i1.z, i2.z, 1.0));
    p = p - floor(p * (1.0/289.0)) * 289.0;
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0*floor(p*ns.z*ns.z);
    vec4 x_ = floor(j*ns.z);
    vec4 y_ = floor(j - 7.0*x_);
    vec4 x = x_*ns.x + ns.yyyy;
    vec4 y = y_*ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314*vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m*m;
    return 42.0*dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }
  void main(){
    vUv = uv;
    vec3 pos = position;
    float t = uTime * 0.3;
    float warp = snoise(pos*1.2 + vec3(t, -t*0.7, t*0.4))*0.15;
    float twist = uScrollVelocity * 0.6;
    float angle = pos.y * twist;
    mat2 R = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    pos.xz = R * pos.xz;
    vDist = warp;
    pos += normal * warp;
    vec4 world = modelMatrix * vec4(pos,1.0);
    vWorldPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying float vDist;
  uniform float uTime;
  uniform float uSectionIndex;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uAccent;
  ${paletteGLSL}
  vec3 normalFromDerivatives(vec3 p){
    vec3 dx = dFdx(p);
    vec3 dy = dFdy(p);
    return normalize(cross(dx,dy));
  }
  void main(){
    vec3 N = normalFromDerivatives(vWorldPos);
    vec3 V = normalize(cameraPosition - vWorldPos);
    float t = uTime*0.6;
    vec3 L1pos = vec3( 6.0*sin(t*0.7),  4.0,  6.0*cos(t*0.7));
    vec3 L2pos = vec3(-5.0*cos(t*0.5), -3.5, 5.0*sin(t*0.45));
    vec3 L3pos = vec3( 0.0,  6.0*sin(t*0.25), -6.0);
    vec3 L1 = normalize(L1pos - vWorldPos);
    vec3 L2 = normalize(L2pos - vWorldPos);
    vec3 L3 = normalize(L3pos - vWorldPos);
    float gp = sin(vUv.x*4.0 + t*0.25)*0.3 + cos(vUv.y*3.0 - t*0.2)*0.2 + 0.5 + vDist*0.6;
    float sectionMix = clamp(uSectionIndex/3.0, 0.0, 1.0);
    vec3 palA = cosPalette(gp, vec3(0.55,0.55,0.58), vec3(0.45,0.35,0.35), vec3(0.95,0.80,0.70), vec3(0.00,0.35,0.55));
    vec3 palB = cosPalette(gp + 0.15*sin(uTime*0.25), vec3(0.55,0.56,0.58), vec3(0.35,0.45,0.55), vec3(0.90,0.55,0.75), vec3(0.25,0.10,0.60));
    vec3 baseAlbedo = mix(palA, palB, sectionMix);
    baseAlbedo = mix(baseAlbedo, uColor1, 0.15);
    baseAlbedo = mix(baseAlbedo, uColor2, 0.10);
    float NdotL1 = max(dot(N,L1), 0.0);
    float NdotL2 = max(dot(N,L2), 0.0);
    float NdotL3 = max(dot(N,L3), 0.0);
    vec3 c1 = vec3(1.0);
    vec3 c2 = mix(uColor3, vec3(0.9,0.95,1.0), 0.6);
    vec3 c3 = mix(uAccent, vec3(1.0,0.9,0.75), 0.5);
    vec3 color = baseAlbedo*0.5 + c1*NdotL1*0.9 + c2*NdotL2*0.5 + c3*NdotL3*0.4;
    color += abs(vDist)*0.12*uAccent; // reduce glow contribution
    color *= 0.75; // overall dim to avoid overbright center
    color = clamp(color, 0.0, 2.5);
    color = pow(color, vec3(1.0/2.2));
    gl_FragColor = vec4(color, 1.0);
  }
`;

const cinematicPostShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() }
  },
  vertexShader: `
    varying vec2 vUv;
    void main(){
      vUv = uv;
      gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0);
    }
  `,
  fragmentShader: `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2  uResolution;
    float rand(vec2 co){ return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453); }
    void main(){
      vec3 col = texture2D(tDiffuse, vUv).rgb;
      float n = rand(vUv*vec2(uResolution.x,uResolution.y)+uTime*60.0)-0.5;
      col += n*0.02;
      col = pow(col, vec3(1.0/2.2));
      gl_FragColor = vec4(col,1.0);
    }
  `
};

const ScrollHero: React.FC<Props> = ({
  sections = DEFAULT_SECTIONS,
  colorPalette = DEFAULT_PALETTE,
  logo = "STUDIO",
  menuItems = [],
  backgroundOnly = false,
  afterContent
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const scrollRef = useRef({ progress: 0, velocity: 0, rotation: { x: 0, y: 0 } });
  const mouseRef = useRef({ x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 });

  useEffect(() => {
    if (!canvasRef.current) return;

    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, composer: EffectComposer;
    let frameId: number | null = null;
    const clock = new THREE.Clock();

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0, window.innerWidth < 768 ? 6.5 : 5);

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.85; // dim overall exposure
      renderer.outputEncoding = THREE.sRGBEncoding;

      const geometry = new THREE.IcosahedronGeometry(1.85, 5);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uScrollVelocity: { value: 0 },
          uSectionIndex: { value: 0 },
          uColor1: { value: new THREE.Color(colorPalette.primary) },
          uColor2: { value: new THREE.Color(colorPalette.secondary) },
          uColor3: { value: new THREE.Color(colorPalette.tertiary) },
          uAccent: { value: new THREE.Color(colorPalette.accent) }
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        side: THREE.DoubleSide
      });
      const mesh = new THREE.Mesh(geometry, material);
      meshRef.current = mesh;
      if (window.innerWidth < 768) {
        mesh.scale.set(0.7, 0.7, 0.7); // smaller on mobile
      }
      scene.add(mesh);

      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.35, // lower strength
        0.25, // radius
        0.95  // threshold
      );
      composer.addPass(bloom);
      const cinePass = new ShaderPass(cinematicPostShader as any);
      (cinePass.uniforms as any).uResolution.value.set(window.innerWidth, window.innerHeight);
      composer.addPass(cinePass);
      composerRef.current = composer;

      setIsLoaded(true);

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        if (meshRef.current) {
          (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
          (meshRef.current.material as THREE.ShaderMaterial).uniforms.uScrollVelocity.value = scrollRef.current.velocity;
          meshRef.current.rotation.x = scrollRef.current.rotation.x;
          meshRef.current.rotation.y = scrollRef.current.rotation.y;
          // gentle idle bob when not scrolling
          if (Math.abs(scrollRef.current.velocity) < 0.01) {
            meshRef.current.position.y = Math.sin(t * 0.45) * 0.06;
          } else {
            meshRef.current.position.y *= 0.9;
          }
        }
        const lastPass = composerRef.current?.passes[composerRef.current.passes.length - 1] as any;
        if (lastPass?.uniforms?.uTime) lastPass.uniforms.uTime.value = t;
        composerRef.current?.render();
      };
      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        // adjust size on mobile/desktop
        if (meshRef.current) {
          if (window.innerWidth < 768) {
            meshRef.current.scale.set(0.7, 0.7, 0.7);
            camera.position.z = 6.5;
          } else {
            meshRef.current.scale.set(1, 1, 1);
            camera.position.z = 5;
          }
        }
        const lastPass = composer.passes[composer.passes.length - 1] as any;
        if (lastPass?.uniforms?.uResolution) {
          lastPass.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        }
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        if (frameId) cancelAnimationFrame(frameId);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };
    init();
  }, [colorPalette]);

  // Scroll logic
  useEffect(() => {
    if (!isLoaded || backgroundOnly) return;
    let lastY = window.scrollY;
    let vel = 0;
    let velTimeout: any;

    ScrollTrigger.create({
      trigger: containerRef.current!,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollRef.current.progress = self.progress;
        const y = window.scrollY;
        vel = (y - lastY) * 0.01;
        lastY = y;
        scrollRef.current.velocity = THREE.MathUtils.clamp(vel, -1, 1);
        gsap.to(scrollRef.current.rotation, {
          x: self.progress * Math.PI * 3.0,
          y: self.progress * Math.PI * 4.5,
          duration: 0.3,
          ease: "power2.out"
        });
        clearTimeout(velTimeout);
        velTimeout = setTimeout(() => {
          gsap.to(scrollRef.current, { velocity: 0, duration: 0.5, ease: "power2.out" });
        }, 120);
        if (progressRef.current) {
          gsap.to(progressRef.current, { scaleY: self.progress, duration: 0.12 });
        }
      }
    });

    sections.forEach((_, idx) => {
      const el = sectionsRef.current[idx];
      if (!el) return;
      gsap.fromTo(
        el.querySelectorAll(".section-headline, .section-subheadline, .section-body"),
        { opacity: 0, y: 80, rotationX: -10 },
        {
          opacity: 1, y: 0, rotationX: 0, duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 20%",
            scrub: 1
          }
        }
      );

      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => {
          setActiveSection(idx);
          if (meshRef.current) {
            gsap.to((meshRef.current.material as THREE.ShaderMaterial).uniforms.uSectionIndex, {
              value: idx,
              duration: 1.2,
              ease: "power2.inOut"
            });
          }
        },
        onEnterBack: () => {
          setActiveSection(idx);
          if (meshRef.current) {
            gsap.to((meshRef.current.material as THREE.ShaderMaterial).uniforms.uSectionIndex, {
              value: idx,
              duration: 1.2,
              ease: "power2.inOut"
            });
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isLoaded, sections, backgroundOnly]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Basic styles for progress and layout without requiring extra global CSS
  const InlineStyles = () => (
    <style>
      {`
      .scroll-hero { position: relative; width: 100%; min-height: 100vh; overflow: hidden; background: transparent; }
      .hero-canvas { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; }
      .scroll-progress { position: fixed; left: 12px; top: 0; bottom: 0; width: 3px; background: rgba(16,185,129,0.15); transform-origin: top; z-index: 40; }
      .scroll-progress-bar { width: 3px; height: 100%; background: linear-gradient(180deg,#10b981,#14b8a6); transform: scaleY(0); transform-origin: top; }
      .hero-section { min-height: 90vh; display: flex; align-items: center; justify-content: center; position: relative; z-index: 30; }
      .section-content { text-align: center; max-width: 900px; padding: 2rem; }
      .loading-overlay { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(2,6,23,0.6); color: white; z-index: 60; transition: opacity .6s ease; }
      .loading-overlay.loaded { opacity: 0; pointer-events: none; }
      @media (max-width: 767px) {
        .hero-section { min-height: 110vh; }
      }
    `}
    </style>
  );

  if (backgroundOnly) {
    return (
      <div className="absolute inset-0 -z-10">
        <canvas ref={canvasRef} className="hero-canvas" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="scroll-hero">
      <InlineStyles />
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="scroll-progress">
        <div ref={progressRef} className="scroll-progress-bar" />
      </div>
      {menuItems.length > 0 && (
        <nav className="nav-container pointer-events-auto">
          <div className="nav-inner">
            <div className="nav-logo">{logo}</div>
            <div className="nav-menu">
              {menuItems.map((item, i) => (
                <a key={i} href={`#${item.toLowerCase()}`} className={`nav-item ${activeSection === i ? "active" : ""}`}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="hero-section"
          data-section={index}
        >
          <div className="section-content">
            <div className="mx-auto inline-block rounded-2xl px-8 py-10 md:px-12 md:py-14 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/20 backdrop-blur-sm ring-1 ring-white/10 shadow-2xl">
              <h1 className="section-headline text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 drop-shadow-lg">
                {section.headline}
              </h1>
              <h2 className="section-subheadline mt-3 text-3xl md:text-5xl text-emerald-200">
                {section.subheadline}
              </h2>
              <p className="section-body mt-8 text-emerald-100/90 max-w-3xl mx-auto text-lg md:text-xl">
                {section.body}
              </p>
            </div>
          </div>
        </section>
      ))}
      {/* Render any additional page content after the animated sections */}
      {afterContent && <div className="relative z-30">{afterContent}</div>}
      <div className={`loading-overlay ${isLoaded ? "loaded" : ""}`}>
        <div className="loading-text">Loading</div>
      </div>
    </div>
  );
};

export default ScrollHero;
export { ScrollHero };


