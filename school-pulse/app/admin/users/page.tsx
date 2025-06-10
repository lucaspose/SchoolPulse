import { stackServerApp } from "@/stack"
import { UserList } from "./UserList"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Shield, Activity } from "lucide-react"
import { ParticleBackground } from "@/components/ui/particle-background"
import { AnimatedGradient } from "@/components/ui/animated-gradient"
import { GlowCard } from "@/components/ui/glow-card"
import { NeonText } from "@/components/ui/neon-text"

export default async function UserModerationPage() {
  const users = await stackServerApp.listUsers()

  const safeUsers = (users ?? []).map((u) => ({
    id: u.id,
    displayName: u.displayName,
    primaryEmail: u.primaryEmail,
    profileImageUrl: u.profileImageUrl,
    signedUpAt: u.signedUpAt,
  }))

  const totalUsers = safeUsers.length
  const recentUsers = safeUsers.filter((u) => {
    const signUpDate = new Date(u.signedUpAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return signUpDate > weekAgo
  }).length

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <ParticleBackground particleCount={80} color="rgba(132, 90, 223, 0.3)" speed={0.5} />
      <AnimatedGradient intensity="medium" speed="slow" className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <NeonText
                as="h1"
                color="text-white"
                glowColor="rgba(132, 90, 223, 0.7)"
                intensity="medium"
                className="text-4xl font-bold mb-2"
              >
                Gestion des Utilisateurs
              </NeonText>
              <p className="text-muted-foreground animate-pulse-glow">
                Administrez les comptes utilisateurs et leurs permissions
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <GlowCard
                className="border-l-4 border-l-blue-500 backdrop-blur-lg bg-card/40"
                glowColor="rgba(59, 130, 246, 0.5)"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Utilisateurs</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{totalUsers}</div>
                  <p className="text-xs text-blue-400/80">Comptes enregistrés</p>
                </CardContent>
              </GlowCard>

              <GlowCard
                className="border-l-4 border-l-green-500 backdrop-blur-lg bg-card/40"
                glowColor="rgba(34, 197, 94, 0.5)"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Nouveaux (7j)</CardTitle>
                  <UserPlus className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{recentUsers}</div>
                  <p className="text-xs text-green-400/80">Inscriptions récentes</p>
                </CardContent>
              </GlowCard>

              <GlowCard
                className="border-l-4 border-l-purple-500 backdrop-blur-lg bg-card/40"
                glowColor="rgba(168, 85, 247, 0.5)"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Administrateurs</CardTitle>
                  <Shield className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1</div>
                  <p className="text-xs text-purple-400/80">Comptes privilégiés</p>
                </CardContent>
              </GlowCard>

              <GlowCard
                className="border-l-4 border-l-orange-500 backdrop-blur-lg bg-card/40"
                glowColor="rgba(249, 115, 22, 0.5)"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Actifs (24h)</CardTitle>
                  <Activity className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{Math.floor(totalUsers * 0.3)}</div>
                  <p className="text-xs text-orange-400/80">Connexions récentes</p>
                </CardContent>
              </GlowCard>
            </div>

            {/* User List */}
            <GlowCard
              className="shadow-lg backdrop-blur-lg bg-card/40"
              glowColor="rgba(132, 90, 223, 0.3)"
              glowIntensity="subtle"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <NeonText color="text-white" glowColor="rgba(132, 90, 223, 0.5)" intensity="subtle">
                      Liste des Utilisateurs
                    </NeonText>
                  </CardTitle>
                  <Badge variant="secondary" className="bg-primary/20 border border-primary/30 text-primary">
                    {totalUsers} utilisateur{totalUsers > 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <UserList users={safeUsers} />
              </CardContent>
            </GlowCard>
          </div>
        </div>
      </AnimatedGradient>
    </div>
  )
}
