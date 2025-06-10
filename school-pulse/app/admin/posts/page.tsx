import { db } from "@/db"
import { posts } from "@/db/schema"
import { stackServerApp } from "@/stack"
import { PostModerationList } from "./PostModerationList"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, MessageSquare, AlertTriangle, CheckCircle } from "lucide-react"
import { ParticleBackground } from "@/components/ui/particle-background"
import { AnimatedGradient } from "@/components/ui/animated-gradient"
import { GlowCard } from "@/components/ui/glow-card"
import { NeonText } from "@/components/ui/neon-text"
import { redirect } from "next/navigation"

export default async function PostModerationPage() {
  console.log("ok")

  const allPosts = await db.select().from(posts).orderBy(posts.createdAt)

  const totalPosts = allPosts.length
  const recentPosts = allPosts.filter((post) => {
    const postDate = new Date(post.createdAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return postDate > weekAgo
  }).length

  const todayPosts = allPosts.filter((post) => {
    const postDate = new Date(post.createdAt)
    const today = new Date()
    return postDate.toDateString() === today.toDateString()
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
                Modération des Posts
              </NeonText>
              <p className="text-muted-foreground animate-pulse-glow">
                Gérez et modérez le contenu publié par les utilisateurs
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <GlowCard
                className="border-l-4 border-l-blue-500 backdrop-blur-lg bg-card/40"
                glowColor="rgba(59, 130, 246, 0.5)"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Total Posts</CardTitle>
                  <FileText className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{totalPosts}</div>
                  <p className="text-xs text-blue-400/80">Publications totales</p>
                </CardContent>
              </GlowCard>

              <GlowCard
                className="border-l-4 border-l-green-500 backdrop-blur-lg bg-card/40"
                glowColor="rgba(34, 197, 94, 0.5)"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Cette semaine</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{recentPosts}</div>
                  <p className="text-xs text-green-400/80">Nouveaux posts</p>
                </CardContent>
              </GlowCard>

              <GlowCard
                className="border-l-4 border-l-purple-500 backdrop-blur-lg bg-card/40"
                glowColor="rgba(168, 85, 247, 0.5)"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">Aujourd'hui</CardTitle>
                  <MessageSquare className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{todayPosts}</div>
                  <p className="text-xs text-purple-400/80">Posts du jour</p>
                </CardContent>
              </GlowCard>

              <GlowCard
                className="border-l-4 border-l-orange-500 backdrop-blur-lg bg-card/40"
                glowColor="rgba(249, 115, 22, 0.5)"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-white">À modérer</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">0</div>
                  <p className="text-xs text-orange-400/80">Signalements</p>
                </CardContent>
              </GlowCard>
            </div>

            {/* Posts List */}
            <GlowCard
              className="shadow-lg backdrop-blur-lg bg-card/40"
              glowColor="rgba(132, 90, 223, 0.3)"
              glowIntensity="subtle"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <NeonText color="text-white" glowColor="rgba(132, 90, 223, 0.5)" intensity="subtle">
                      Liste des Publications
                    </NeonText>
                  </CardTitle>
                  <Badge variant="secondary" className="bg-primary/20 border border-primary/30 text-primary">
                    {totalPosts} post{totalPosts > 1 ? "s" : ""}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PostModerationList posts={allPosts} />
              </CardContent>
            </GlowCard>
          </div>
        </div>
      </AnimatedGradient>
    </div>
  )
}
