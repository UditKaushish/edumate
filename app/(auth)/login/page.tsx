'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Wand2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query' // Import useQueryClient
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

type data = {
  success: boolean
  token: string
}

type error = {
  success: boolean
  message: string
}

export default function LoginPage() {
  const queryClient = useQueryClient() // Initialize QueryClient
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (data: { email: string; password: string }) => {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive", 
      })
      throw new Error('Login failed')
    }

    const result = await response.json()
    toast({
      title: "Login Successful",
      description: "You have logged in successfully.",
      variant: "default", 
    })
    router.push('/chatapp')
    return result
  }

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: data) => {
      // Assuming `response.success` is available in the response data
      if (data.success) {
        // Save the token in React Query's cache
        console.log('Login successful:', data.token)
        const tokensetter = queryClient.setQueryData(['authToken'],`Bearer ${data.token}`) // Cache the token
        localStorage.setItem('Token', data.token) // Store the token in localStorage
        console.log('Token set:', tokensetter)
        toast({
          title: "Login Successful",
          description: "You have logged in successfully.",
          variant: "default",
        })
        console.log('Login successful:', data)
  
        // Redirect the user to /chatapp after successful login
        router.replace('/chatapp')
      } else {
        toast({
          title: "Login Failed",
          description: "There was an issue logging in. Please try again.",
          variant: "destructive",
        })
      }
    },
    onError: (error: error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      console.error('Error during login:', error)
    },
  })  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email and password before submitting
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in both email and password.",
        variant: "destructive",
      })
      return
    }

    mutation.mutate({ email, password })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#FFA726] hover:bg-[#FF6F61] text-white"
            disabled={mutation.isPending} 
          >
            {mutation.isPending ? 'Logging In...' : 'Log In'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button variant="outline" className="w-full">
          <Wand2 className="mr-2 h-4 w-4" />
          Login with Magic Link
        </Button>
        <p className="text-sm text-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#FFA726] hover:underline">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
