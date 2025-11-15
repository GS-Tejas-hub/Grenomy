import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { 
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Globe,
  Award,
  Lightbulb
} from "lucide-react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp.tsx";
import { ShaderAnimation } from "@/components/ui/shader-lines.tsx";

export default function AboutUs() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge AI technology to solve complex sustainability challenges"
    },
    {
      icon: Heart,
      title: "Impact",
      description: "Committed to creating measurable positive environmental impact through our solutions"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Building partnerships across industries to accelerate the transition to sustainable practices"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering the highest quality insights and maintaining rigorous accuracy standards"
    }
  ];

  const stats = [
    { value: "2020", label: "Founded" },
    { value: "500+", label: "Clients Worldwide" },
    { value: "50+", label: "Team Members" },
    { value: "15+", label: "Countries Served" }
  ];

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "CEO & Founder",
      bio: "20+ years in automotive sustainability and AI research"
    },
    {
      name: "Rajesh Kumar",
      role: "CTO",
      bio: "Former Tata Motors engineer, expert in green technology"
    },
    {
      name: "Dr. Anjali Patel",
      role: "Chief Data Scientist",
      bio: "PhD in Environmental Science, AI specialist"
    },
    {
      name: "Arjun Mehta",
      role: "Head of Product",
      bio: "15 years in SaaS and sustainability solutions"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Animated Hero Section (Lamp) */}
      <section className="relative overflow-hidden">
        <LampContainer className="min-h-[70vh]">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
            className="mt-8 bg-gradient-to-br from-emerald-200 to-emerald-400 py-4 bg-clip-text text-center text-4xl md:text-6xl font-bold tracking-tight text-transparent"
          >
            About Grenomy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: 'easeInOut' }}
            className="text-center text-emerald-100 max-w-3xl mx-auto"
          >
            We're on a mission to make sustainability accessible, measurable, and actionable for every company building the future of transportation and green technology
          </motion.p>
        </LampContainer>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60">
          <ShaderAnimation />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2020, Grenomy emerged from a simple observation: companies developing sustainable products lacked the sophisticated tools needed to measure and optimize their environmental impact.
                </p>
                <p>
                  Our founders, a team of AI researchers and automotive industry veterans, recognized that artificial intelligence could revolutionize how we approach sustainability analysis. What started as a research project has grown into a comprehensive platform trusted by hundreds of companies worldwide.
                </p>
                <p>
                  Today, we continue to push the boundaries of what's possible, combining deep industry expertise with cutting-edge AI to help companies make data-driven decisions that benefit both their business and the planet.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=800&fit=crop"
                  alt="Team collaboration"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    To empower every company in the automotive and green industries with AI-powered insights that make sustainable innovation faster, easier, and more effective.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    A world where every product is designed with sustainability at its core, enabled by intelligent technology that makes the right choice the easy choice.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to driving sustainable innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                      {member.name}
                    </h3>
                    <p className="text-emerald-600 font-medium text-center mb-3 text-sm">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm text-center">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Us on Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's work together to build a more sustainable future
            </p>
            <Link to={createPageUrl("Contact")}>
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-lg px-8 py-6">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Also export a named version to avoid default-export resolution quirks in some dev servers
export { AboutUs };