import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { GlowCard } from "@/Components/UI/spotlight-card.jsx";
import { 
  Car,
  Leaf,
  BarChart3,
  FileCheck,
  Gauge,
  Recycle,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

export default function Products() {
  const products = [
    {
      icon: BarChart3,
      title: "Carbon Footprint Analyzer",
      description: "Comprehensive carbon emission analysis for automotive products throughout the entire lifecycle, from manufacturing to end-of-life.",
      features: [
        "Real-time emission tracking",
        "Scope 1, 2, and 3 analysis",
        "Predictive modeling",
        "Compliance reports"
      ],
      badge: "Most Popular",
      glowColor: "emerald"
    },
    {
      icon: Car,
      title: "EV Impact Assessment",
      description: "Specialized analysis for electric vehicle components, battery lifecycle, and overall environmental impact compared to traditional vehicles.",
      features: [
        "Battery sustainability metrics",
        "Supply chain analysis",
        "Comparative assessments",
        "Market insights"
      ],
      badge: "New",
      glowColor: "blue"
    },
    {
      icon: Recycle,
      title: "Circular Economy Optimizer",
      description: "AI-driven recommendations for product design that maximizes recyclability, reusability, and circular economy principles.",
      features: [
        "Material optimization",
        "End-of-life planning",
        "Recycling pathways",
        "Cost-benefit analysis"
      ],
      badge: null,
      glowColor: "purple"
    },
    {
      icon: FileCheck,
      title: "Compliance Monitor",
      description: "Stay ahead of evolving sustainability regulations with automated compliance tracking and reporting for global markets.",
      features: [
        "Regulatory updates",
        "Automated reporting",
        "Risk assessment",
        "Multi-region support"
      ],
      badge: null,
      glowColor: "orange"
    },
    {
      icon: Gauge,
      title: "Performance Dashboard",
      description: "Centralized dashboard providing real-time sustainability metrics, KPIs, and progress tracking for all your products.",
      features: [
        "Custom KPI tracking",
        "Visual analytics",
        "Team collaboration",
        "Export capabilities"
      ],
      badge: null,
      glowColor: "teal"
    },
    {
      icon: Leaf,
      title: "Green Material Advisor",
      description: "Discover and compare sustainable materials with AI-powered recommendations tailored to your product requirements.",
      features: [
        "Material database",
        "Impact comparisons",
        "Supplier connections",
        "Cost analysis"
      ],
      badge: null,
      glowColor: "green"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-emerald-300 text-sm font-medium">AI-Powered Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Products
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive suite of AI-powered tools designed specifically for sustainability analysis in automotive and green industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid with GlowCard */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlowCard 
                  glowColor={product.glowColor}
                  customSize={true}
                  className="h-full w-full"
                >
                  <div className="flex flex-col h-full p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                        <product.icon className="w-7 h-7 text-white" />
                      </div>
                      {product.badge && (
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-none">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-white">{product.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-4 text-sm">{product.description}</p>
                    
                    <ul className="space-y-2 mb-6 flex-grow">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={createPageUrl("Contact")} className="w-full">
                      <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full transform translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full transform -translate-x-1/3 translate-y-1/3" />
            </div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Seamless Integration
              </h2>
              <p className="text-xl mb-8 text-emerald-50">
                All our products work together seamlessly, providing a unified platform for your sustainability initiatives
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Contact")}>
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                    Request Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to={createPageUrl("AboutUs")}>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600">
                    Learn About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Provide named export for flexible import
export { Products };