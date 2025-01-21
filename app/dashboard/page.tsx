"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { BookOpen, Brain, MessageCircle, Star, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { name: "Week 1", correct: 4, incorrect: 2 },
  { name: "Week 2", correct: 3, incorrect: 1 },
  { name: "Week 3", correct: 5, incorrect: 2 },
  { name: "Week 4", correct: 6, incorrect: 1 },
];

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <h1 className="text-lg font-semibold text-[#333333]">StoryTime Dashboard</h1>
      </header>
      <main className="flex-1 p-4 lg:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-[#FFD43B] hover:bg-[#FFA726] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Total Stories Read</CardTitle>
              <BookOpen className="h-4 w-4 text-[#333333]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#333333]">18</div>
              <p className="text-xs text-[#333333]">+2 from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-[#6FCF97] hover:bg-[#00BFA5] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Correct Answers</CardTitle>
              <Brain className="h-4 w-4 text-[#333333]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#333333]">85%</div>
              <p className="text-xs text-[#333333]">+5% from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-[#A461D8] hover:bg-[#6FCF97] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Engagement Score</CardTitle>
              <Star className="h-4 w-4 text-[#333333]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#333333]">9.2</div>
              <p className="text-xs text-[#333333]">Out of 10</p>
            </CardContent>
          </Card>
          <Card className="bg-[#FF6F61] hover:bg-[#FFD43B] transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#333333]">Reading Streak</CardTitle>
              <Zap className="h-4 w-4 text-[#333333]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#333333]">7 days</div>
              <p className="text-xs text-[#333333]">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 bg-[#FAFAFA]">
            <CardHeader>
              <CardTitle className="text-[#333333]">Reading Progress</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Bar dataKey="correct" fill="#6FCF97" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="incorrect" fill="#FF6F61" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3 bg-[#E4E4E4]">
            <CardHeader>
              <CardTitle className="text-[#333333]">Recent Stories</CardTitle>
              <CardDescription className="text-[#333333]">You've read 3 stories this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mr-4">
                    <img
                      className="aspect-square h-full w-full"
                      alt="The Little Red Hen"
                      src="/placeholder.svg?height=40&width=40"
                    />
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-[#333333]">The Little Red Hen</p>
                    <p className="text-sm text-[#333333]">Read on: May 15, 2023</p>
                  </div>
                  <div className="ml-auto font-medium text-[#333333]">90%</div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mr-4">
                    <img
                      className="aspect-square h-full w-full"
                      alt="The Ugly Duckling"
                      src="/placeholder.svg?height=40&width=40"
                    />
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-[#333333]">The Ugly Duckling</p>
                    <p className="text-sm text-[#333333]">Read on: May 13, 2023</p>
                  </div>
                  <div className="ml-auto font-medium text-[#333333]">85%</div>
                </div>
                <div className="flex items-center">
                  <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mr-4">
                    <img
                      className="aspect-square h-full w-full"
                      alt="The Three Little Pigs"
                      src="/placeholder.svg?height=40&width=40"
                    />
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-[#333333]">The Three Little Pigs</p>
                    <p className="text-sm text-[#333333]">Read on: May 10, 2023</p>
                  </div>
                  <div className="ml-auto font-medium text-[#333333]">95%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
