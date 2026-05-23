"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Brain, 
  Rocket, 
  Gamepad2, 
  ShieldCheck, 
  ChevronRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-1.5 rounded-lg">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">Eduvix</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</Link>
          <Link href="#parents" className="hover:text-blue-600 transition-colors">For Parents</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 pt-20 pb-32 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-600 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Learning for Kids
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
            Learn anything with your <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Study Buddy
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Eduvix turns boring textbooks into fun games, personalized tests, 
            and exciting challenges tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 text-lg shadow-xl shadow-blue-200">
                Start Your Journey
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14 px-10 text-lg">
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Floating Elements Mock */}
        <div className="relative mt-20 max-w-5xl mx-auto">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4 text-left max-w-xs absolute -left-10 top-20 hidden lg:flex"
          >
            <div className="bg-green-100 p-3 rounded-2xl text-green-600">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <p className="font-bold text-gray-900">New High Score!</p>
              <p className="text-sm text-gray-500">You mastered Fractions!</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4 text-left max-w-xs absolute -right-10 top-0 hidden lg:flex"
          >
            <div className="bg-purple-100 p-3 rounded-2xl text-purple-600">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-gray-900">AI Tutor Active</p>
              <p className="text-sm text-gray-500">Ready for your questions</p>
            </div>
          </motion.div>

          <div className="aspect-video bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-[40px] border border-gray-100 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
            <Gamepad2 className="w-20 h-20 text-blue-200 absolute" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-gray-500 text-lg">Everything you need to succeed in school</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "PDF to Tests",
                desc: "Upload your school PDFs and get instant quizzes tailored to your syllabus.",
                icon: FileText,
                color: "blue"
              },
              {
                title: "AI Personal Tutor",
                desc: "Get 24/7 help with any subject. Our AI explains things in a way you'll love.",
                icon: Brain,
                color: "purple"
              },
              {
                title: "Gamified Learning",
                desc: "Earn points, level up, and unlock rewards as you study and pass tests.",
                icon: Gamepad2,
                color: "orange"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`bg-${feature.color}-50 w-14 h-14 rounded-2xl flex items-center justify-center text-${feature.color}-600 mb-6`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-12 h-12 text-green-500" />
            <div>
              <p className="text-lg font-bold text-gray-900">Safe & Secure</p>
              <p className="text-gray-500">Privacy first, built for children.</p>
            </div>
          </div>
          <div className="flex gap-8 opacity-50 grayscale">
            {/* Mock brand logos */}
            <div className="text-2xl font-black">SCHOOLS</div>
            <div className="text-2xl font-black">PARENTS+</div>
            <div className="text-2xl font-black">EDUCATORS</div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { FileText } from "lucide-react";
