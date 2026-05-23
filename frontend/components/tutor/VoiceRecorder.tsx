"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  isListening: boolean;
  setIsListening: (val: boolean) => void;
}

export function VoiceRecorder({ onTranscript, isListening, setIsListening }: VoiceRecorderProps) {
  const recognitionRef = useRef<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'network') {
          setErrorMsg("I'm having trouble connecting to the internet. Please check your connection!");
        } else if (event.error === 'not-allowed') {
          setErrorMsg("I need permission to use your microphone to hear you.");
        } else {
          setErrorMsg("Oops! Something went wrong with the microphone. Try again?");
        }
        setIsListening(false);
        setTimeout(() => setErrorMsg(""), 5000);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [onTranscript, setIsListening]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setErrorMsg("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <AnimatePresence>
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-16 bg-red-100 text-red-700 px-6 py-3 rounded-2xl text-xs font-bold shadow-sm border border-red-200 max-w-xs text-center"
          >
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleListening}
        className={`h-24 w-24 rounded-full flex items-center justify-center shadow-2xl transition-all ${
          isListening ? "bg-red-500 text-white animate-pulse" : "bg-blue-600 text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="mic-off"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MicOff className="w-10 h-10" />
            </motion.div>
          ) : (
            <motion.div
              key="mic-on"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Mic className="w-10 h-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <p className="text-sm font-bold text-gray-500">
        {isListening ? "I'm listening... speak now!" : "Tap to talk to your AI Tutor"}
      </p>
    </div>
  );
}
