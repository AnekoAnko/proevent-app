"use client"

import Link from "next/link"
import { Calendar, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { useRouter, usePathname } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AppHeaderProps {
  user?: User | null
}

export function AppHeader({ user }: AppHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const initials = user?.email?.split("@")[0].slice(0, 2).toUpperCase() || "U"

  // const navLinks = [
  //   { href: "/dashboard", label: "Dashboard" },
  //   { href: "/ai-suggestions", label: "AI Suggestions" },
  //   { href: "/about", label: "About" },
  //   { href: "/support", label: "Support" },
  //   { href: "/faq", label: "FAQ" },
  // ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">EventManager</span>
          </Link>

          {/* {user && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button variant={pathname === link.href ? "secondary" : "ghost"} size="sm">
                    {link.label}
                  </Button>
                </Link>
              ))}
            </nav>
          )} */}
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                {/* <SheetContent side="left" className="w-64">
                  <nav className="flex flex-col gap-2 mt-8">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <Button
                          variant={pathname === link.href ? "secondary" : "ghost"}
                          className="w-full justify-start"
                        >
                          {link.label}
                        </Button>
                      </Link>
                    ))}
                  </nav>
                </SheetContent> */}
              </Sheet>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">My Account</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <nav className="flex items-center gap-2">
              <Link href="/about">
                <Button variant="ghost" size="sm">
                  About
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="ghost" size="sm">
                  FAQ
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button size="sm">Get Started</Button>
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
