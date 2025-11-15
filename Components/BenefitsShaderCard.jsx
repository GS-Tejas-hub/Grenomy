import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Shield, Users } from 'lucide-react';

export default function BenefitsShaderCards() {
  const features = [
    {
      title: "AI-Powered Insights",
      description: "Advanced algorithms analyze sustainability metrics in real-time, providing actionable recommendations for your products.",
      icon: Lightbulb,
      gradient: "from-emerald-500 via-green-500 to-teal-500"
    },
    {
      title: "Predictive Analytics",
      description: "Stay ahead with predictive models that forecast environmental impact and compliance requirements.",
      icon: TrendingUp,
      gradient: "from-green-500 via-emerald-500 to-lime-500"
    },
    {
      title: "Compliance Assurance",
      description: "Ensure your products meet all sustainability standards and regulations across global markets.",
      icon: Shield,
      gradient: "from-teal-500 via-cyan-500 to-emerald-500"
    },
    {
      title: "Industry Expertise",
      description: "Specialized knowledge in automotive and green industries, tailored to your specific needs.",
      icon: Users,
      gradient: "from-lime-500 via-green-500 to-emerald-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Grenomy?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI technology with deep industry expertise to deliver unparalleled sustainability insights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-80 group"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-90`}>
                  {/* Animated overlay effect */}
                  <div className="absolute inset-0 opacity-50">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse" />
                    <div 
                      className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(255,255,255,0.2),transparent_50%)]"
                      style={{
                        animation: 'moveGradient 8s ease-in-out infinite',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Content overlay */}
              <div className="relative z-10 p-8 rounded-3xl h-full flex flex-col bg-black/40 backdrop-blur-sm border border-white/20 group-hover:bg-black/50 transition-all duration-300">
                <div className="mb-6 filter drop-shadow-lg">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">
                  {feature.title}
                </h3>

                <p className="leading-relaxed flex-grow text-white/95 drop-shadow-md">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="mr-2">Learn more</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <style>{`
                @keyframes moveGradient {
                  0%, 100% {
                    transform: translate(0%, 0%) scale(1);
                  }
                  25% {
                    transform: translate(30%, 20%) scale(1.1);
                  }
                  50% {
                    transform: translate(-20%, 30%) scale(1.05);
                  }
                  75% {
                    transform: translate(20%, -20%) scale(1.1);
                  }
                }
              `}</style>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}