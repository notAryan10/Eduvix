"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { api } from "@/services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data: any = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="bg-blue-500 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-black text-gray-900">Eduvix</span>
      </Link>

      <Card className="w-full max-w-md p-10 border-none shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Ready to continue your learning adventure?</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="text-right">
            <Link href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 text-lg shadow-blue-100">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
...
        <div className="mt-10 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            New to Eduvix?{" "}
            <Link href="/register" className="font-bold text-blue-600 hover:text-blue-700">
              Create an account
            </Link>
          </p>
        </div>
      </Card>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; 2024 Eduvix. All rights reserved.</p>
        <div className="flex gap-4 justify-center mt-2">
          <Link href="#" className="hover:text-gray-600">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-600">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}
