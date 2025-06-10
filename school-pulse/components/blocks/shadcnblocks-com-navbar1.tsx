"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Settings, LogOut, Shield, Menu, Home, Info, Mail, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import { NeonText } from "@/components/ui/neon-text"
import { useUser } from "@stackframe/stack"

interface NavbarProps {
  menu: Array<{
    title: string
    url: string
  }>
  auth?: {
    login: {
      text: string
      url: string
    }
    signup: {
      text: string
      url: string
    }
  }
  user?: {
    id: string
    displayName?: string | null
    primaryEmail?: string | null
    profileImageUrl?: string | null
    signOut: () => Promise<void>
    usePermission: (permission: string) => boolean
  } | null
}

export function Navbar1({ menu, auth, user }: NavbarProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    if (user?.signOut) {
      await user.signOut()
      router.push("/")
    }
  }
  const currentUser = useUser({ or: "redirect" })
  const isAdmin = currentUser?.useTeam('bbc7a225-bff8-46e6-b779-77cc06fadb2c')
  const isModo = currentUser?.useTeam('3086b24e-6828-4b66-b097-58cedaa1ac9c')

  const getMenuIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "home":
        return <Home className="w-4 h-4" />
      case "about":
        return <Info className="w-4 h-4" />
      case "contact":
        return <Mail className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-primary/5"
          : "bg-background/80 backdrop-blur-lg border-b border-white/5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-purple-600 to-blue-600 text-primary-foreground relative overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
              <span className="text-sm font-bold relative z-10">SP</span>
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-blue-600 opacity-80 animate-gradient" />
            </div>
            <NeonText
              color="text-white"
              glowColor="rgba(132, 90, 223, 0.7)"
              intensity="medium"
              className="hidden font-bold sm:inline-block text-lg tracking-wider"
            >
              School Pulse
            </NeonText>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="group flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white relative"
              >
                <span className="flex items-center gap-2">
                  {getMenuIcon(item.title)}
                  <span>{item.title}</span>
                </span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Admin Link */}
            {(isAdmin || isModo) && (
              <Link
                href="/admin"
                className="group flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white relative"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs bg-gradient-to-r from-primary/30 to-purple-500/30 border border-primary/40 text-white"
                  >
                    {isAdmin ? "Admin" : "Modo"}
                  </Badge>
                </span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full overflow-hidden border border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(132,90,223,0.5)]"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profileImageUrl || ""} alt={user.displayName || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
                        {user.displayName?.charAt(0)?.toUpperCase() ||
                          user.primaryEmail?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-background/95 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/50"
                  align="end"
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user.displayName && <p className="font-medium text-white">{user.displayName}</p>}
                      {user.primaryEmail && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user.primaryEmail}</p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild className="focus:bg-primary/20 text-white hover:text-white">
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-primary/20 text-white hover:text-white">
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </Link>
                  </DropdownMenuItem>
                  {(isAdmin || isModo) && (
                    <>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem asChild className="focus:bg-primary/20 text-white hover:text-white">
                        <Link href="/admin" className="flex items-center">
                          <Crown className="mr-2 h-4 w-4 text-primary" />
                          <span>Administration</span>
                          <Badge
                            variant="outline"
                            className="ml-auto text-xs border-primary/30 bg-primary/10 text-primary"
                          >
                            {isAdmin ? "Admin" : "Modo"}
                          </Badge>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-400 focus:bg-red-950/30 focus:text-red-400 hover:text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : auth ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 text-white hover:text-white"
                >
                  <Link href={auth.login.url}>{auth.login.text}</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 border-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(132,90,223,0.5)] text-white"
                >
                  <Link href={auth.signup.url}>{auth.signup.text}</Link>
                </Button>
              </div>
            ) : null}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden border border-white/10 hover:border-primary/50 hover:bg-primary/10 text-white hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden bg-background/95 backdrop-blur-xl animate-in fade-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-3">
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white px-2 py-1.5 rounded-md hover:bg-primary/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {getMenuIcon(item.title)}
                  <span>{item.title}</span>
                </Link>
              ))}
              {(isAdmin || isModo) && (
                <Link
                  href="/admin"
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white px-2 py-1.5 rounded-md hover:bg-primary/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Crown className="w-4 h-4 text-primary" />
                  <span>Administration</span>
                  <Badge
                    variant="secondary"
                    className="ml-1 text-xs bg-gradient-to-r from-primary/30 to-purple-500/30 border border-primary/40 text-white"
                  >
                    {isAdmin ? "Admin" : "Modo"}
                  </Badge>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
