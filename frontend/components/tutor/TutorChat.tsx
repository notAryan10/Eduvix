"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, User, Bot, Sparkles, Brain } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function TutorChat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const res: any = await api.tutorChat(query, sessionId);
      setMessages((prev) => [...prev, { role: "assistant", content: res.answer }]);
      if (!sessionId) setSessionId(res.sessionId);
    } catch (err) {
      console.error("Tutor chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] p-0 overflow-hidden border-none shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">AI Personal Tutor</h3>
            <p className="text-blue-100 text-xs">Always here to help you learn!</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Online
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
        {messages.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-blue-100 w-16 h-16 rounded-3xl flex items-center justify-center text-blue-600 mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Hello! I'm your Study Buddy.</h4>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              Ask me anything about your lessons, or just say hello to start learning!
            </p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"
                }`}>
                  {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white text-gray-900 border border-gray-100 rounded-tl-none"
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-gray-50 border-none rounded-2xl px-6 py-3 text-sm focus:ring-2 focus:ring-blue-400 transition-all text-gray-900"
            placeholder="Type your question here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button 
            onClick={handleSend} 
            disabled={!query.trim() || loading}
            className="h-12 w-12 rounded-2xl p-0 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
