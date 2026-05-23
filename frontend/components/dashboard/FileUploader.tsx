"use client";

import React, { useState } from "react";
import { Upload, File, X, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploaded(false);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!file || !subject) {
      setError("Please select a file and enter a subject");
      return;
    }
    
    setUploading(true);
    setError("");
    
    try {
      await api.upload("/upload", file, subject);
      setUploading(false);
      setUploaded(true);
      setFile(null);
      setSubject("");
    } catch (err: any) {
      setError(err.message || "Upload failed");
      setUploading(false);
    }
  };

  return (
    <Card className="p-8 border-2 border-dashed border-blue-200 bg-blue-50/30">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
          <Upload className="w-8 h-8" />
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-gray-900">Upload Learning Materials</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Upload your class notes, textbooks, or PDFs to generate AI tests.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4 text-left">
          <Input 
            label="Subject (e.g., Science, History)"
            placeholder="What subject is this?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          
          <label className="relative cursor-pointer block">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="bg-white border border-gray-200 rounded-2xl py-3 px-4 text-sm text-gray-600 hover:border-blue-400 transition-all">
              {file ? file.name : "Click to select a PDF"}
            </div>
          </label>
        </div>

        <AnimatePresence>
          {file && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-gray-100 w-full max-w-sm shadow-sm"
            >
              <File className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium flex-1 truncate">{file.name}</span>
              <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {uploaded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-2 text-green-600 font-semibold text-sm bg-green-50 p-4 rounded-2xl border border-green-100"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                File uploaded successfully!
              </div>
              <p className="text-[10px] text-green-700 font-medium text-center">
                Our AI is currently analyzing your document. It will be ready for a quiz in about 30 seconds!
              </p>
            </motion.div>
          )}

          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}
        </AnimatePresence>

        <Button
          onClick={handleUpload}
          disabled={!file || !subject || uploading}
          className="w-full max-w-sm"
        >
          {uploading ? "Uploading..." : "Start Learning"}
        </Button>
      </div>
    </Card>
  );
}
