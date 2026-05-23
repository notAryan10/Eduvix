"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Settings, 
  HelpCircle,
  LogOut,
  GraduationCap,
  TrendingUp,
  Sparkles,
  Calendar,
  Trophy,
  Volume2
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Tutor", href: "/tutor", icon: Sparkles },
  { name: "Voice Mode", href: "/tutor/voice", icon: Volume2 },
  { name: "Achievements", href: "/achievements", icon: Trophy },
  { name: "Revision", href: "/revision", icon: Calendar },
  { name: "Tests", href: "/dashboard/tests", icon: FileText },
  { name: "Topics", href: "/dashboard/topics", icon: BookOpen },
  { name: "Progress", href: "/analytics", icon: TrendingUp },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 w-64 p-6">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-blue-500 p-2 rounded-xl">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Eduvix
        </span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group",
                isActive 
                  ? "bg-blue-50 text-blue-600 font-semibold" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-900"
              )} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100 space-y-2">
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all"
        >
          <HelpCircle className="w-5 h-5 text-gray-400" />
          Help Center
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
