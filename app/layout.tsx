import { Navigation } from '@/components/navigation'
import { Inter } from 'next/font/google'
import { QueryClientWrapper } from './querywrapper/clientwrapper'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'StoryBot - Interactive Storytelling for Kids',
  description: 'Engage your child with AI-powered interactive storytelling',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientWrapper>
        <Navigation />
        <main>{children}</main>
          </QueryClientWrapper>
      </body>
    </html>
  )
}

