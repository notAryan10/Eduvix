"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { VoiceRecorder } from "@/components/tutor/VoiceRecorder";
import { api } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Volume2, Sparkles, User, Bot, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function VoiceTutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsThinking] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setIsThinking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleTranscript = async (text: string) => {
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    try {
      // Use existing tutorChat but we can also use voiceTeach if we want specific voice logic
      const res: any = await api.tutorChat(text, sessionId || undefined);
      const aiMessage: Message = { role: "assistant", content: res.answer };
      setMessages((prev) => [...prev, aiMessage]);
      if (!sessionId) setSessionId(res.sessionId);
      
      speak(res.answer);
    } catch (err) {
      console.error("Voice tutor error:", err);
      setIsThinking(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/tutor" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Chat
          </Link>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-600 text-sm font-bold border border-blue-100">
            <Volume2 className="w-4 h-4" /> Voice Mode Active
          </div>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-blue-600 w-20 h-20 rounded-[32px] flex items-center justify-center text-white mx-auto shadow-xl shadow-blue-200">
            <Brain className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-gray-900">Your AI Voice Tutor</h1>
          <p className="text-gray-500 text-lg">Talk to me just like a real teacher!</p>
        </div>

        <Card className="p-12 flex flex-col items-center justify-center gap-12 bg-white border-blue-50 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
          
          <AnimatePresence mode="wait">
            {messages.length > 0 ? (
              <motion.div
                key="last-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full text-center"
              >
                <div className="inline-block p-6 rounded-3xl bg-blue-50 border border-blue-100 text-gray-900 text-xl font-medium leading-relaxed max-w-2xl italic">
                  "{messages[messages.length - 1].content}"
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-blue-600 font-bold text-sm uppercase tracking-widest">
                  {messages[messages.length - 1].role === 'user' ? (
                    <><User className="w-4 h-4" /> You Said</>
                  ) : (
                    <><Bot className="w-4 h-4" /> AI Buddy Answered</>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-2"
              >
                <Sparkles className="w-12 h-12 text-yellow-400 mx-auto opacity-50" />
                <p className="text-gray-400 font-bold">Say "Hi" to start our conversation!</p>
              </motion.div>
            )}
          </AnimatePresence>

          <VoiceRecorder 
            onTranscript={handleTranscript} 
            isListening={isListening} 
            setIsListening={setIsListening} 
          />

          {isSpeaking && (
            <div className="flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest ml-2">AI is thinking...</span>
            </div>
          )}
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: "Concise Answers", desc: "Short and sweet speech", icon: Volume2 },
            { label: "Kid-Friendly", desc: "Simple words used", icon: Sparkles },
            { label: "Always Helpful", desc: "24/7 learning buddy", icon: Brain }
          ].map((item, i) => (
            <div key={i} className="text-center p-4">
              <div className="bg-gray-50 w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 mx-auto mb-3">
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{item.label}</h4>
              <p className="text-[10px] text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
