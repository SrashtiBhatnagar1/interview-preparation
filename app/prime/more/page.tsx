"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, MessageSquare, Briefcase, BarChart3, ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function MorePrimeChallenges() {
  const [activeSection, setActiveSection] = useState("coding");

  const menuItems = [
    { id: "coding", label: "Coding Questions", icon: Code },
    { id: "sql", label: "SQL Questions", icon: BarChart3 },
    { id: "technical", label: "Technical Questions", icon: BarChart3 },
    { id: "managerial", label: "Managerial Questions", icon: Briefcase },
    { id: "hr", label: "HR Questions", icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="flex min-h-screen">
        {/* Sidebar Menu */}
        <aside className="w-64 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-700 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-8 transition font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Menu</h2>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        isActive
                          ? "bg-gray-900 text-white font-semibold"
                          : "text-gray-600 dark:text-gray-300 hover:text-black dark:text-white hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 text-sm mb-2">Pro Tip</h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                Practice at least 5-10 questions daily for consistent improvement in your interview preparation.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <section className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
            <div className="px-8 py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">👑</span>
                  <div>
                    <h1 className="text-4xl font-bold text-black dark:text-white">TCS Prime Profile</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">More Advanced Questions & Challenges</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Content Section */}
          <section className="px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-6">👑</div>
                    <h2 className="text-3xl font-bold text-black dark:text-white">
                      Elite Prime Questions
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                      This section will contain additional Prime-level interview questions, 
                      leadership scenarios, design patterns, expert-level technical challenges, 
                      and advanced system design problems specifically curated for the TCS Prime profile.
                    </p>
                    <div className="pt-6">
                      <p className="text-sm text-gray-500 italic">
                        More content coming soon. Stay tuned for updates!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Back to Prime Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link href="/prime">
                <Button className="rounded-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                  Return to Prime Track
                </Button>
              </Link>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default function MorePrimePage() {
  return (
    <ProtectedRoute>
      <MorePrimeChallenges />
    </ProtectedRoute>
  );
}
