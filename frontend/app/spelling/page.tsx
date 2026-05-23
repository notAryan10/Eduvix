"use client";

import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BookOpen, Sparkles, CheckCircle2, XCircle, Volume2, Eye, RefreshCw } from "lucide-react";

export default function SpellingPage() {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isPeeking, setIsPeeking] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const data: any = await api.getSpellingWords();
      setWords(data);
      setCurrentWordIndex(0);
      setScore(0);
      setUserInput("");
      setShowResult(null);
    } catch (err) {
      console.error("Failed to fetch adaptive words");
      setWords(["Photosynthesis", "Atmosphere", "Metamorphosis", "Ecosystem", "Velocity"]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const speakWord = () => {
    if (words.length === 0) return;
    const utterance = new SpeechSynthesisUtterance(words[currentWordIndex]);
    utterance.rate = 0.8;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <div className="mb-10 flex flex-col items-center">
        <BookOpen className="w-16 h-16 text-purple-500 mb-4" />
        <h1 className="text-3xl font-bold">Spelling Challenge</h1>
        <p className="text-gray-500">Listen to the word and type it correctly!</p>
        <div className="inline-flex items-center gap-2 mt-4 bg-purple-50 px-4 py-2 rounded-full text-purple-600 text-sm font-bold">
          <Sparkles className="w-4 h-4" /> AI Generated for You
        </div>
      </div>

      <Card className="p-12 shadow-2xl border-purple-100 bg-white">
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
             <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Word {currentWordIndex + 1} of {words.length}
            </span>
            <button onClick={fetchWords} className="text-gray-400 hover:text-purple-600 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
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
                {words[currentWordIndex]?.split('').map((_, i) => (
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
