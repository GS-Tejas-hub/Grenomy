import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Zap, 
  BarChart3,
  Award,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { ScrollExpandMedia } from "../Components/ScrollExpandMedia.jsx";
import BenefitsShaderCards from "../Components/BenefitsShaderCard.jsx";

export default function Home() {
  const stats = [
    { value: "85%", label: "Faster Analysis", icon: Zap },
    { value: "500+", label: "Products Analyzed", icon: BarChart3 },
    { value: "98%", label: "Accuracy Rate", icon: Award },
    { value: "24/7", label: "AI Support", icon: Shield },
  ];

  const clients = [
    "Tata Motors", "Mahindra & Mahindra", "Hero MotoCorp", "Bajaj Auto", 
    "TVS Motor Company", "Ashok Leyland", "Ola Electric", "Ather Energy",
    "Reliance Industries", "Adani Green Energy", "ReNew Power", "Suzlon Energy"
  ];

  const homeContent = (
    <div className="min-h-screen">
      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
            Trusted by Industry Leaders
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-gray-700 font-medium text-sm text-center">{client}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Shader Cards */}
      <BenefitsShaderCards />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build a Sustainable Future?
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Join hundreds of companies already using Grenomy to make their products more sustainable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-6">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl("Products")}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-6">
                  View Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );

  return (
    <ScrollExpandMedia
      mediaType="image"
      mediaSrc="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1280&h=720&fit=crop"
      bgImageSrc="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1920&h=1080&fit=crop"
      title="Transform Your Sustainability Journey"
      date="AI-Powered Analysis"
      scrollToExpand="Scroll to Explore"
      textBlend={true}
    >
      {homeContent}
    </ScrollExpandMedia>
  );
}

// Provide named export for flexible import
export { Home };