"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Bell, Shield, Settings as SettingsIcon, Save } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSave = () => {
    setLoading(true);
    // Mock save
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(user));
      setLoading(false);
      alert("Settings saved!");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-blue-500" />
            Settings
          </h1>
          <p className="text-gray-500 mt-1">Manage your account and preferences.</p>
        </div>

        <div className="grid gap-8">
          <Card className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Input 
                label="Full Name" 
                value={user.name} 
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <Input 
                label="Email Address" 
                value={user.email} 
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                disabled
              />
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-purple-100 p-3 rounded-2xl text-purple-600">
                <Bell className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer">
                <span className="font-medium text-gray-700">Daily Study Reminders</span>
                <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg text-blue-500" />
              </label>
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl cursor-pointer">
                <span className="font-medium text-gray-700">Quiz Performance Reports</span>
                <input type="checkbox" defaultChecked className="w-6 h-6 rounded-lg text-blue-500" />
              </label>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-green-100 p-3 rounded-2xl text-green-600">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Privacy & Security</h2>
            </div>
            
            <Button variant="outline" className="w-full md:w-auto">Change Password</Button>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="w-full md:w-48 h-14 text-lg">
            {loading ? "Saving..." : (
              <>
                <Save className="w-5 h-5 mr-2" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
