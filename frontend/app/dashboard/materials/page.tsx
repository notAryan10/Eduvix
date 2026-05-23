"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { api } from "@/services/api";
import { FileText, Rocket, Trash2, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { FileUploader } from "@/components/dashboard/FileUploader";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = async () => {
    try {
      // Re-using dashboard call for now or we could add a specific route
      const data: any = await api.get("/dashboard");
      setMaterials(data.recentMaterials || []);
    } catch (err) {
      console.error("Failed to fetch materials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-500" />
              Learning Materials
            </h1>
            <p className="text-gray-500 mt-1">Manage your textbooks and notes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : materials.length > 0 ? (
              <div className="grid gap-4">
                {materials.map((file, i) => (
                  <Card key={i} className="flex items-center justify-between p-6 group">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{file.subject}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {new Date(file.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {file.filename}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href={`/quiz?subject=${encodeURIComponent(file.subject)}`}>
                        <button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2">
                          <Rocket className="w-4 h-4" /> Start Quiz
                        </button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center border-dashed border-2">
                <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">No materials yet</h3>
                <p className="text-gray-500 mt-2">Upload your first PDF on the right to start learning!</p>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <FileUploader />
            <Card className="p-6 bg-blue-50 border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">Pro Tip</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                The more materials you upload, the better your AI Tutor understands your syllabus!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
