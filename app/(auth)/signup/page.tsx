'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { Wand2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Data = {
  email: string
  password: string
  name: string
  token: string;
}

type Error = {
  success: boolean,
  message: string
}

export default function SignUpPage() {
  const Router = useRouter()
  const queryClient = useQueryClient() // Access the TanStack Query client
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const signUpUser = async (data: { email: string; password: string; name: string }) => {
    setLoading(true)
    try {
      const response = await axios.post<Data>('http://localhost:5000/auth/register', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      setLoading(false)
      return response.data
    } catch (error) {
      setLoading(false)
      console.error('Sign-up failed:', error)
      toast({
        title: "Sign-up Failed",
        description: "There was an issue with your sign-up. Please try again.",
        variant: "destructive",
      })
      throw new Error('Sign-up failed')
    }
  }

  const mutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data: Data) => {
      // Save the token in TanStack Query as Bearer token
      queryClient.setQueryData(['auth'], { token: `Bearer ${data.token}` })

      toast({
        title: "Sign-up Successful",
        description: "Welcome aboard! Redirecting you...",
        variant: "default",
      })
      Router.push('/chatapp')

      // Optionally redirect the user
    },
    onError: (error: Error) => {
      toast({
        title: "Sign-up Failed",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords do not match. Please try again.",
        variant: "destructive",
      })
      return
    }

    mutation.mutate({ email, password, name })
  }

  // Fetch Example: Including Bearer Token in Headers
  const makeAuthorizedRequest = async () => {
    const auth = queryClient.getQueryData<{ token: string }>(['auth'])
    const token = auth?.token

    if (!token) {
      toast({
        title: "Unauthorized",
        description: "You need to log in first.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await axios.get('http://localhost:5000/protected-route', {
        headers: {
          Authorization: token, // Use the Bearer token
          'Content-Type': 'application/json',
        },
      })
      console.log(response.data)
    } catch (error) {
      console.error('Protected request failed:', error)
      toast({
        title: "Request Failed",
        description: "Could not fetch the protected resource.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Join the Adventure!</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#FFA726] hover:bg-[#FF6F61] text-white"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button variant="outline" className="w-full" onClick={makeAuthorizedRequest}>
          <Wand2 className="mr-2 h-4 w-4" />
          Test Protected Request
        </Button>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-[#FFA726] hover:underline">
            Log In
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
