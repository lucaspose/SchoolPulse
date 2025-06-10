import { stackServerApp } from "@/stack"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ParticleBackground } from "@/components/ui/particle-background"
import { AnimatedGradient } from "@/components/ui/animated-gradient"
import { GlowCard } from "@/components/ui/glow-card"

export default async function EditUser({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const usersResult = await stackServerApp.listUsers()
  const user = usersResult.find((u) => u.id === id)

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        <ParticleBackground particleCount={50} color="rgba(132, 90, 223, 0.3)" speed={0.5} />
        <AnimatedGradient intensity="medium" speed="slow" className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <GlowCard className="backdrop-blur-lg bg-black/40" glowColor="rgba(132, 90, 223, 0.3)">
                <CardContent className="py-16">
                  <h1 className="text-2xl font-bold mb-4">Utilisateur introuvable</h1>
                  <p className="text-muted-foreground mb-6">L'utilisateur que vous souhaitez modifier n'existe pas.</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 border-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(132,90,223,0.5)]"
                  >
                    <Link href="/admin/users">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour à la liste
                    </Link>
                  </Button>
                </CardContent>
              </GlowCard>
            </div>
          </div>
        </AnimatedGradient>
      </div>
    )
  }
