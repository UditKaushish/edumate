"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { BookOpen, Brain, MessageCircle, Star, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Progress } from "@/components/ui/progress"

const data = [
  {
    name: "Week 1",
    correct: 4,
    incorrect: 2,
  },
  {
    name: "Week 2",
    correct: 3,
    incorrect: 1,
  },
  {
    name: "Week 3",
    correct: 5,
    incorrect: 2,
  },
  {
    name: "Week 4",
    correct: 6,
    incorrect: 1,
  },
]

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <h1 className="text-lg font-semibold">StoryTime Dashboard</h1>
      </header>
      <main className="flex-1 p-4 lg:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stories Read</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Correct Answers</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9.2</div>
              <p className="text-xs text-muted-foreground">Out of 10</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reading Streak</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Reading Progress</CardTitle>
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
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Stories</CardTitle>
              <CardDescription>You've read 3 stories this week</CardDescription>
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
                    <p className="text-sm font-medium leading-none">The Little Red Hen</p>
                    <p className="text-sm text-muted-foreground">Read on: May 15, 2023</p>
                  </div>
                  <div className="ml-auto font-medium">90%</div>
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
                    <p className="text-sm font-medium leading-none">The Ugly Duckling</p>
                    <p className="text-sm text-muted-foreground">Read on: May 13, 2023</p>
                  </div>
                  <div className="ml-auto font-medium">85%</div>
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
                    <p className="text-sm font-medium leading-none">The Three Little Pigs</p>
                    <p className="text-sm text-muted-foreground">Read on: May 10, 2023</p>
                  </div>
                  <div className="ml-auto font-medium">95%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Reading Skills Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Comprehension</div>
                    <div className="text-sm text-muted-foreground">Understanding the story</div>
                  </div>
                  <div className="w-[100px] text-right text-sm text-muted-foreground">85%</div>
                </div>
                {/* <Progress value={85} className="h-2" /> */}
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Vocabulary</div>
                    <div className="text-sm text-muted-foreground">Learning new words</div>
                  </div>
                  <div className="w-[100px] text-right text-sm text-muted-foreground">70%</div>
                </div>
                {/* <Progress value={70} className="h-2" /> */}
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="text-sm font-medium">Critical Thinking</div>
                    <div className="text-sm text-muted-foreground">Analyzing the story</div>
                  </div>
                  <div className="w-[100px] text-right text-sm text-muted-foreground">60%</div>
                </div>
                {/* <Progress value={60} className="h-2" /> */}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>You've earned 3 new badges this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="rounded-full bg-primary p-2 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="text-sm font-medium">Bookworm</div>
                </div>
                <div className="text-center">
                  <div className="rounded-full bg-secondary p-2 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <Brain className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div className="text-sm font-medium">Quick Thinker</div>
                </div>
                <div className="text-center">
                  <div className="rounded-full bg-accent p-2 w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <MessageCircle className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="text-sm font-medium">Storyteller</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

