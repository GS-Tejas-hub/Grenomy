import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import ScrollHero from "@/components/ui/ethereal";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: ""
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "info@grenomy.com",
      link: "mailto:info@grenomy.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 80 4567 8900",
      link: "tel:+918045678900"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Koramangala, Bangalore, Karnataka 560095",
      link: null
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 3D Scroll Sections (Ethereal) */}
      <section className="relative">
        <ScrollHero
          sections={[
            { id: "ethereal", headline: "Grenomy", subheadline: "Beyond Reality", body: "AI-powered sustainability artistry for automotive and green tech" },
            { id: "innovation", headline: "Innovation", subheadline: "Through Design", body: "Pushing boundaries of sustainability intelligence and design" },
            { id: "crafted", headline: "Crafted", subheadline: "With Purpose", body: "Every insight serves a greener vision" },
            { id: "connect", headline: "Connect", subheadline: "Create Together", body: "Let's build something extraordinary—and sustainable" }
          ]}
          colorPalette={{
            primary: "#10b981",
            secondary: "#0ea5a4",
            tertiary: "#22c55e",
            accent: "#34d399",
            dark: "#0a0a0a"
          }}
          menuItems={[]}
        />
      </section>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 bg-transparent">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mx-auto inline-block rounded-2xl px-6 py-6 bg-gradient-to-b from-slate-900/60 via-slate-900/35 to-slate-900/20 backdrop-blur-sm ring-1 ring-white/10 shadow-xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-emerald-50 max-w-3xl mx-auto">
                Ready to transform your sustainability journey? We'd love to hear from you
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-slate-900/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-2xl">
                <CardContent className="p-10 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                      <p className="text-gray-600">
                        We've received your message and will get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Rahul Sharma"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="rahul@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            name="company"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={handleChange}
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your sustainability goals..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="min-h-32"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white h-14 text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
                <CardContent className="p-8 md:p-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Contact Information
                  </h2>
                  <p className="text-emerald-50 text-lg leading-relaxed">
                    Have questions about our products or want to schedule a demo? Our team is here to help you every step of the way.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                            {info.link ? (
                              <a
                                href={info.link}
                                className="text-gray-600 hover:text-emerald-600 transition-colors"
                              >
                                {info.content}
                              </a>
                            ) : (
                              <p className="text-gray-600">{info.content}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info Card */}
              <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                  <div className="space-y-2 text-emerald-50">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                    <p>Sunday: Closed</p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-emerald-50">
                      For urgent inquiries, please call our 24/7 support line
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative z-10 py-20 bg-transparent pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="border-none shadow-2xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.653725304775!2d77.61248931482192!3d12.927923090885954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1441c0677333%3A0x2e3e6d0e5e5c5e5c!2sKoramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Grenomy Office Location"
                ></iframe>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Provide named export for flexible import
export { Contact };