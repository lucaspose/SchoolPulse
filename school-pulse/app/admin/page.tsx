"use client"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { useUser } from "@stackframe/stack"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, BarChart3, MessageSquare, Shield, Activity, TrendingUp, Clock } from "lucide-react"
import { ParticleBackground } from "@/components/ui/particle-background"
import { AnimatedGradient } from "@/components/ui/animated-gradient"
import { GlowCard } from "@/components/ui/glow-card"
import { NeonText } from "@/components/ui/neon-text"
import { useEffect, useState } from "react"

const Data = [
  {
    name: "Gestion des Utilisateurs",
    className: "col-span-2 md:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-blue-600/20 to-transparent" />,
    Icon: Users,
    description: "Gérez les utilisateurs, leurs rôles et permissions dans le système.",
    href: "/admin/users",
    cta: "Gérer les Utilisateurs",
  },
  {
    name: "Modération des Posts",
    className: "col-span-2 md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-purple-600/20 to-transparent" />
    ),
    Icon: FileText,
    description: "Modérez le contenu, approuvez ou supprimez les publications.",
    href: "/admin/posts",
    cta: "Modérer le Contenu",
  },
  {
    name: "Statistiques & Analytics",
    className: "col-span-2 md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 via-green-600/20 to-transparent" />
    ),
    Icon: BarChart3,
    description: "Consultez les métriques, logs et statistiques d'utilisation.",
    href: "/admin/logs",
    cta: "Voir les Stats",
  },
  {
    name: "Support & Tickets",
    className: "col-span-2 md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-orange-600/20 to-transparent" />
    ),
    Icon: MessageSquare,
    description: "Gérez les demandes de support et les tickets utilisateurs.",
    href: "/admin/support",
    cta: "Gérer le Support",
  },
]

export default function AdminPage() {
  const user = useUser({ or: "redirect" })
  const isAdmin = user?.useTeam('bbc7a225-bff8-46e6-b779-77cc06fadb2c')
  const isModo = user?.useTeam('3086b24e-6828-4b66-b097-58cedaa1ac9c')

  if (!isAdmin && !isModo) {
    throw new Error("401: Unauthorized")
  }
  const [stats, setStats] = useState({
    users: { value: 0, target: 1234 },
    posts: { value: 0, target: 856 },
    tickets: { value: 0, target: 23 },
    response: { value: 0, target: 2.4 },
  })

  useEffect(() => {
    // Animate stats counting up
    const interval = setInterval(() => {
      setStats((prev) => ({
        users: {
          ...prev.users,
          value:
            prev.users.value < prev.users.target
              ? prev.users.value + Math.ceil(prev.users.target / 30)
              : prev.users.target,
        },
        posts: {
          ...prev.posts,
          value:
            prev.posts.value < prev.posts.target
              ? prev.posts.value + Math.ceil(prev.posts.target / 30)
              : prev.posts.target,
        },
        tickets: {
          ...prev.tickets,
          value: prev.tickets.value < prev.tickets.target ? prev.tickets.value + 1 : prev.tickets.target,
        },
        response: {
          ...prev.response,
          value:
            prev.response.value < prev.response.target
              ? Number.parseFloat((prev.response.value + 0.1).toFixed(1))
              : prev.response.target,
        },
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <ParticleBackground particleCount={100} color="rgba(132, 90, 223, 0.3)" speed={0.5} />
      <AnimatedGradient intensity="medium" speed="slow" className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <NeonText
                    as="h1"
                    color="text-white"
                    glowColor="rgba(132, 90, 223, 0.7)"
                    intensity="medium"
                    className="text-4xl font-bold mb-2"
                  >
                    Tableau de Bord Admin
                  </NeonText>
                  <p className="text-muted-foreground mt-2 animate-pulse-glow">
                    Gérez votre plateforme School Pulse en toute simplicité
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-primary/30 bg-primary/10 text-primary animate-pulse-glow"
                  >
                    <Shield className="w-3 h-3" />
                    {isAdmin ? "Administrateur" : "Modérateur"}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 bg-green-500/20 text-green-400 border border-green-500/30"
                  >
                    <Activity className="w-3 h-3" />
                    En ligne
                  </Badge>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <GlowCard
                  className="border-l-4 border-l-blue-500 backdrop-blur-lg bg-card/40"
                  glowColor="rgba(59, 130, 246, 0.5)"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Utilisateurs Actifs</CardTitle>
                    <Users className="h-4 w-4 text-blue-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stats.users.value.toLocaleString()}</div>
                    <p className="text-xs text-blue-400/80">
                      <TrendingUp className="inline w-3 h-3 mr-1" />
                      +12% ce mois
                    </p>
                  </CardContent>
                </GlowCard>

                <GlowCard
                  className="border-l-4 border-l-purple-500 backdrop-blur-lg bg-card/40"
                  glowColor="rgba(168, 85, 247, 0.5)"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Posts Publiés</CardTitle>
                    <FileText className="h-4 w-4 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stats.posts.value.toLocaleString()}</div>
                    <p className="text-xs text-purple-400/80">
                      <TrendingUp className="inline w-3 h-3 mr-1" />
                      +8% cette semaine
                    </p>
                  </CardContent>
                </GlowCard>

                <GlowCard
                  className="border-l-4 border-l-green-500 backdrop-blur-lg bg-card/40"
                  glowColor="rgba(34, 197, 94, 0.5)"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Tickets Support</CardTitle>
                    <MessageSquare className="h-4 w-4 text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stats.tickets.value}</div>
                    <p className="text-xs text-green-400/80">
                      <Clock className="inline w-3 h-3 mr-1" />5 en attente
                    </p>
                  </CardContent>
                </GlowCard>

                <GlowCard
                  className="border-l-4 border-l-orange-500 backdrop-blur-lg bg-card/40"
                  glowColor="rgba(249, 115, 22, 0.5)"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Temps de Réponse</CardTitle>
                    <BarChart3 className="h-4 w-4 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stats.response.value}s</div>
                    <p className="text-xs text-orange-400/80">
                      <TrendingUp className="inline w-3 h-3 mr-1" />
                      Performance optimale
                    </p>
                  </CardContent>
                </GlowCard>
              </div>
            </div>

            {/* Main Actions Grid */}
            <BentoGrid className="max-w-full">
              {Data.map((item, index) => (
                <BentoCard
                  key={item.name}
                  name={item.name}
                  className={`${item.className} backdrop-blur-lg bg-card/40 hover:shadow-[0_0_25px_rgba(132,90,223,0.3)] transition-all duration-500 hover:-translate-y-1 text-white`}
                  background={item.background}
                  Icon={item.Icon}
                  description={item.description}
                  href={item.href}
                  cta={item.cta}
                  style={{ animationDelay: `${index * 100}ms` }}
                />
              ))}
            </BentoGrid>
          </div>
        </div>
      </AnimatedGradient>
    </div>
  )
}
