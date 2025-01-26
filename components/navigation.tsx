"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useMutation, useQuery ,useQueryClient} from "@tanstack/react-query"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { BookOpen, LogIn, LogOut, Menu, X } from "lucide-react"
import NavLink from "@/components/support/navlink"
import AnchorLink from "@/components/support/anchorlink"

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'], // Unique key for caching and refetching
    queryFn: async () => {
      const authToken = typeof window !== 'undefined' ? localStorage.getItem('Token') : null;

      if (!authToken) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:5000/auth/profile', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      return response.data;
    },
    staleTime: Infinity, // Data remains fresh (no automatic refetch)
    refetchOnWindowFocus: false, // Prevents refetching on window focus
    refetchOnReconnect: false, // Prevents refetching on network reconnect
  });
};

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const queryClient = useQueryClient()

  // Profile Query
  const {
    data: profileData,
    isSuccess,
    isPending
  } = useProfile();

  // Logout Mutation
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const authToken = localStorage.getItem("Token")
      if (!authToken) throw new Error("No token found")
      const response = await axios.post(
        `http://localhost:5000/auth/logout`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } },
      )
      localStorage.removeItem("Token")
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.push("/")
      //reload the page
      window.location.reload();
    },
  })

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const handleMenuClick = () => setIsMenuOpen(false)

  const isLoggedIn = isSuccess && profileData?.success

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout()
    } else {
      router.push("/login")
    }
  }

  const AuthButton = ({ className = "" }) => (
    <Button variant="ghost" className={`text-white hover:bg-accent ${className}`} onClick={handleAuthAction}>
      <div className="flex items-center">
        {isLoggedIn ? <LogOut className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />}
        <span>{isLoggedIn ? "Logout" : "Login"}</span>
      </div>
    </Button>
  )

  return (
    <nav className="bg-[#00BFA5] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-white" />
          <span className="text-xl font-bold text-white">StoryBot</span>
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink href="/" active={pathname === "/"}>
            Home
          </NavLink>
          <AnchorLink href="#about" active={pathname === "/" && window.location.hash === "#about"}>
            About
          </AnchorLink>
          <AnchorLink href="#features" active={pathname === "/" && window.location.hash === "#features"}>
            Features
          </AnchorLink>
          {isPending ? (
            <Button variant="ghost" className="text-white" disabled>
              Loading...
            </Button>
          ) : (
            <AuthButton />
          )}
        </div>
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="mt-4 flex flex-col space-y-4 md:hidden">
          <NavLink href="/" active={pathname === "/"} onClick={handleMenuClick}>
            Home
          </NavLink>
          <AnchorLink
            href="#about"
            active={pathname === "/" && window.location.hash === "#about"}
            onClick={handleMenuClick}
          >
            About
          </AnchorLink>
          <AnchorLink
            href="#features"
            active={pathname === "/" && window.location.hash === "#features"}
            onClick={handleMenuClick}
          >
            Features
          </AnchorLink>
          {isPending ? (
            <Button variant="ghost" className="text-white justify-start" disabled>
              Loading...
            </Button>
          ) : (
            <AuthButton className="justify-start" />
          )}
        </div>
      )}
    </nav>
  )
}
