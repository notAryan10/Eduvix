"use client";

import { useState } from "react";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BookOpen, Sparkles, CheckCircle2, XCircle, Volume2, Eye } from "lucide-react";

export default function SpellingPage() {
  const words = ["Photosynthesis", "Atmosphere", "Metamorphosis", "Ecosystem", "Velocity"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isPeeking, setIsPeeking] = useState(false);

  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(words[currentWordIndex]);
    utterance.rate = 0.8; // Speak slightly slower for clarity
    window.speechSynthesis.speak(utterance);
  };

  const peekWord = () => {
    setIsPeeking(true);
    setTimeout(() => setIsPeeking(false), 2000);
  };

  const checkWord = async () => {
    const word = words[currentWordIndex];
    const isCorrect = word.toLowerCase() === userInput.toLowerCase().trim();
    
    setShowResult(isCorrect);
    if (isCorrect) setScore(score + 1);

    try {
      await api.checkSpelling({
        word,
        userAnswer: userInput,
        difficulty: "medium"
      });
    } catch (err) {
      console.error("Failed to save spelling result");
    }

    setTimeout(() => {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
        setUserInput("");
        setShowResult(null);
        setIsPeeking(false);
      } else {
        alert(`Spelling test complete! Your score: ${score + (isCorrect ? 1 : 0)}/${words.length}`);
        window.location.href = "/dashboard";
      }
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <div className="mb-10">
        <BookOpen className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Spelling Challenge</h1>
        <p className="text-gray-500">Listen to the word and type it correctly!</p>
      </div>

      <Card className="p-12 shadow-2xl border-purple-100">
        <div className="mb-10">
          <span className="text-sm font-bold text-gray-400 block mb-6 uppercase tracking-widest">
            Word {currentWordIndex + 1} of {words.length}
          </span>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant="outline" 
              className="h-20 w-20 rounded-3xl border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={speakWord}
            >
              <Volume2 className="w-10 h-10" />
            </Button>
            <Button 
              variant="ghost" 
              className="h-20 w-20 rounded-3xl text-gray-400 hover:text-blue-500"
              onClick={peekWord}
              disabled={showResult !== null}
            >
              <Eye className="w-8 h-8" />
            </Button>
          </div>

          <div className="h-16 flex items-center justify-center">
            {(isPeeking || showResult !== null) ? (
              <p className={`text-4xl font-black tracking-widest uppercase ${showResult === false ? 'text-red-500' : 'text-blue-600'}`}>
                {words[currentWordIndex]}
              </p>
            ) : (
              <div className="flex gap-2">
                {words[currentWordIndex].split('').map((_, i) => (
                  <div key={i} className="w-6 h-1 bg-gray-200 rounded-full" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            className={`w-full p-6 text-2xl text-center border-2 rounded-2xl mb-6 transition-all ${
              showResult === true ? 'border-green-500 bg-green-50' : 
              showResult === false ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="Type the word here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={showResult !== null}
            autoFocus
          />
          
          {showResult === true && (
            <div className="flex items-center justify-center gap-2 text-green-600 font-bold mb-4">
              <CheckCircle2 /> Awesome! You got it right!
            </div>
          )}
          {showResult === false && (
            <div className="flex items-center justify-center gap-2 text-red-600 font-bold mb-4">
              <XCircle /> Not quite. Keep practicing!
            </div>
          )}
        </div>

        <Button 
          className="w-full h-16 text-xl" 
          onClick={checkWord}
          disabled={!userInput || showResult !== null}
        >
          Check Spelling <Sparkles className="ml-2" />
        </Button>
      </Card>
    </div>
  );
}
