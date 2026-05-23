"use client";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { HelpCircle, MessageCircle, FileText, Lightbulb, Search } from "lucide-react";

export default function HelpPage() {
  const faqs = [
    {
      q: "How do I create a quiz?",
      a: "First, upload a PDF in the Dashboard. Then click on 'Adaptive Quiz' and enter the subject of your PDF!"
    },
    {
      q: "Can I use Eduvix on my tablet?",
      a: "Yes! Eduvix is built to work perfectly on computers, tablets, and even your phone."
    },
    {
      q: "Is my data safe?",
      a: "Absolutely. We take privacy very seriously and all your data is encrypted and kept private."
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-12">
        <div className="text-center">
          <HelpCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-black text-gray-900">How can we help?</h1>
          <p className="text-gray-500 mt-2 text-lg">Find answers to common questions or reach out to us.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:border-blue-200">
            <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-sm text-gray-500">Talk to our friendly AI guide anytime.</p>
          </Card>
          <Card className="p-6 text-center hover:border-purple-200">
            <div className="bg-purple-50 w-12 h-12 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Guides</h3>
            <p className="text-sm text-gray-500">Step-by-step tutorials for everything.</p>
          </Card>
          <Card className="p-6 text-center hover:border-orange-200">
            <div className="bg-orange-50 w-12 h-12 rounded-2xl flex items-center justify-center text-orange-600 mx-auto mb-4">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Tips</h3>
            <p className="text-sm text-gray-500">Learn how to study better with AI.</p>
          </Card>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="p-6">
                <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </section>

        <Card className="bg-blue-600 p-10 text-center text-white border-none shadow-xl shadow-blue-200">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-blue-100 mb-8 max-w-lg mx-auto">
            Our support team is always here to help you on your learning journey.
          </p>
          <button className="bg-white text-blue-600 font-bold px-10 py-4 rounded-2xl hover:bg-blue-50 transition-all">
            Contact Support
          </button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
