'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { BookOpen, LogIn, UserPlus, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const isHomePage = pathname === '/'

  return (
    <nav className="bg-[#00BFA5] p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">StoryBot</span>
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            <NavLink href="/" active={isHomePage}>Home</NavLink>
            <AnchorLink href="#aboutus" active={isHomePage && window.location.hash === '#aboutus'}>About</AnchorLink>
            <AnchorLink href="#features" active={isHomePage && window.location.hash === '#features'}>Features</AnchorLink>
            <Button asChild variant="ghost" className="text-white hover:bg-[#00A896]">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white text-[#00BFA5] hover:bg-[#E4E4E4]">
              <Link href="/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 flex flex-col space-y-4 md:hidden">
            <NavLink href="/" active={isHomePage}>Home</NavLink>
            <AnchorLink href="#about" active={isHomePage && window.location.hash === '#about'}>About</AnchorLink>
            <AnchorLink href="#features" active={isHomePage && window.location.hash === '#features'}>Features</AnchorLink>
            <Button asChild variant="ghost" className="text-white hover:bg-[#00A896] justify-start">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white text-[#00BFA5] hover:bg-[#E4E4E4] justify-start">
              <Link href="/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`text-white hover:text-[#E4E4E4] px-3 py-2 rounded-md text-sm font-medium ${
        active ? 'bg-[#00A896]' : ''
      }`}
    >
      {children}
    </Link>
  )
}

function AnchorLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') {
      e.preventDefault()
      router.push(`/${href}`)
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`text-white hover:text-[#E4E4E4] px-3 py-2 rounded-md text-sm font-medium ${
        active ? 'bg-[#00A896]' : ''
      }`}
    >
      {children}
    </a>
  )
}
