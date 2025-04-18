"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const questions = [
  {
    question: "What is SchoolGrid?",
    answer:
      "SchoolGrid is a digital platform to manage classes, students, and communication efficiently. It is built for students, by students. and helps to manage the academic life of the students.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "In case of forgot password, you can take help from admin. Admin can reset the password from the admin dashboard.",
  },
  {
    question: "Can I access SchoolGrid on mobile?",
    answer: "Yes, SchoolGrid is fully responsive and works on all devices.",
  },
];

export default function QnaPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {questions.map((item, index) => (
          <div
            key={index}
            className="border border-border rounded-2xl overflow-hidden bg-card shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-muted transition-colors"
            >
              <span>{item.question}</span>
              <div>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>

            {openIndex === index && (
              <div>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
