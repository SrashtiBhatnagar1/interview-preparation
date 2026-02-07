"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, Users, BookOpen, Target, Award } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function TCSInterviewBundle() {
  const tracks = [
    {
      title: "TCS Ninja",
      description: "Strong foundation track focusing on core programming, aptitude, and behavioral interview rounds. Designed for consistency and confidence-building.",
      link: "/ninja",
      icon: "🥷",
      color: "from-blue-500 to-cyan-500",
      highlights: ["Core Programming", "Aptitude", "Behavioral Rounds"]
    },
    {
      title: "TCS Digital",
      description: "Advanced problem-solving, system fundamentals, and in-depth technical interviews aligned with 2026 curriculum and real hiring patterns.",
      link: "/digital",
      icon: "💻",
      color: "from-purple-500 to-pink-500",
      highlights: ["Advanced DSA", "System Design", "Technical Depth"]
    },
    {
      title: "TCS Prime",
      description: "Elite-level preparation for high-impact technical, design, and leadership rounds with curated expert-level interview scenarios.",
      link: "/prime",
      icon: "👑",
      color: "from-amber-500 to-orange-500",
      highlights: ["Leadership Ready", "Design Patterns", "Elite Level"]
    },
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Most Important Questions",
      description: "Curated from real TCS interview experiences — every question matters."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "2026 Curriculum Aligned",
      description: "Fully updated with the latest TCS hiring patterns and question sets."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Built by Interviewees",
      description: "Real insights from candidates who've successfully cracked TCS interviews."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Structured Learning Path",
      description: "From fundamentals to advanced — a clear progression for mastery."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Comprehensive Coverage",
      description: "All three TCS tracks (Ninja, Digital, Prime) in one complete bundle."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Proven Success Rate",
      description: "Trusted by thousands of candidates preparing for TCS interviews."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-indigo-100 border border-indigo-300 text-indigo-700 text-sm font-medium"
          >
            ⭐ Updated for 2026 — Latest TCS Curriculum
          </motion.div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-gray-900">
            The Ultimate <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">TCS Interview Bundle</span>
          </h1>

          <p className="text-xl text-gray-700 leading-relaxed mb-4">
            Everything you need to <span className="text-gray-900 font-semibold">crack your TCS interview</span> in 2026.
          </p>

          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            This comprehensive bundle contains the <span className="text-gray-900 font-semibold">most commonly asked and most important TCS interview questions</span>, 
            expertly curated based on the <span className="text-gray-900 font-semibold">latest 2026 curriculum</span>. 
            Everything here is built from real interview experiences of candidates who have successfully passed TCS hiring rounds.
          </p>

          <p className="text-gray-600 mb-10 max-w-2xl mx-auto italic">
            "You're not just preparing. You're training with proven strategies and real interview insights from the field."
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="rounded-full px-10 py-6 text-lg font-semibold shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all">
              Start Your Preparation Journey →
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Tracks Section */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Choose Your <span className="text-indigo-600">TCS Track</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Each track is tailored for different preparation levels and career goals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {tracks.map((track, index) => (
              <motion.div
                key={track.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all h-full overflow-hidden group">
                  {/* Top gradient bar */}
                  <div className={`h-1 bg-gradient-to-r ${track.color}`}></div>
                  
                  <CardContent className="p-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-5xl mb-4">{track.icon}</div>
                      <h3 className="text-3xl font-bold mb-2 text-gray-900">
                        {track.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {track.highlights.map((highlight, idx) => (
                          <span key={idx} className="text-xs bg-indigo-100 border border-indigo-300 rounded-full px-3 py-1 text-indigo-700">
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {track.description}
                      </p>
                    </div>

                    <a
                      href={track.link}
                      className={`mt-8 block text-center rounded-full font-semibold py-3.5 px-2.5 text-sm transition-all bg-gradient-to-r ${track.color} hover:shadow-lg text-white w-full`}
                    >
                      Explore {track.title} →
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose This Bundle Section */}
      <section className="px-6 py-20 md:py-32 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900"
          >
            Why This Bundle is <span className="text-indigo-600">Your Best Choice</span>
          </motion.h2>
          
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Built by candidates who've been through the process. Everything here is battle-tested and proven.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all h-full">
                  <CardContent className="p-6">
                    <div className="text-indigo-600 mb-4 text-2xl">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="px-6 py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Built with <span className="text-indigo-600">Real Experience</span></h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Every question, every concept, and every strategy in this bundle is derived from the 
              <span className="text-gray-900 font-semibold"> real interview experiences of candidates who have successfully cleared TCS interviews</span>.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">1000+</div>
                <p className="text-gray-600">Curated Interview Questions</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
                <p className="text-gray-600">Successful Candidates</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-indigo-600 mb-2">2026</div>
                <p className="text-gray-600">Latest Curriculum</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-r from-indigo-100 to-blue-100 border border-indigo-300 rounded-3xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to Crack Your TCS Interview?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Start with any track and progress at your own pace. All materials are designed for serious candidates ready to succeed.
          </p>
          <Button className="rounded-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all text-white">
            Begin Your Preparation Today
          </Button>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="px-6 py-12 border-t border-gray-200 text-center bg-white">
        <p className="text-gray-600 mb-2">
          Crafted by interview experience. Built for your success.
        </p>
        <p className="text-gray-500 text-sm">
          © 2026 TCS Interview Bundle. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <TCSInterviewBundle />
    </ProtectedRoute>
  );
}