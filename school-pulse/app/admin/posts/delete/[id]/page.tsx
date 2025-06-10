import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { stackServerApp } from "@/stack"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ParticleBackground } from "@/components/ui/particle-background"
import { AnimatedGradient } from "@/components/ui/animated-gradient"
import { GlowCard } from "@/components/ui/glow-card"
import { NeonText } from "@/components/ui/neon-text"

export default async function DeletePostAdmin({ params }: { params: Promise<{ id: string }> }) {
  const user = await stackServerApp.getUser({ or: "redirect" })
  const isAdmin = await user?.getTeam("bbc7a225-bff8-46e6-b779-77cc06fadb2c")
  const isModo = await user?.getTeam("3086b24e-6828-4b66-b097-58cedaa1ac9c")

  if (!isAdmin && !isModo) {
    throw new Error("401: Unauthorized")
  }

  const { id } = await params

  const postsResult = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number.parseInt(id)))
    .then((res) => res[0])

  if (!postsResult) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-background">
        <ParticleBackground particleCount={50} color="rgba(132, 90, 223, 0.3)" speed={0.5} />
        <AnimatedGradient intensity="medium" speed="slow" className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto text-center">
              <GlowCard className="backdrop-blur-lg bg-card/40" glowColor="rgba(132, 90, 223, 0.3)">
                <CardContent className="py-16">
                  <h1 className="text-2xl font-bold mb-4 text-white">Post introuvable</h1>
                  <p className="text-muted-foreground mb-6">Le post que vous souhaitez supprimer n'existe pas.</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 border-none transition-all duration-300 hover:shadow-[0_0_15px_rgba(132,90,223,0.5)]"
                  >
                    <Link href="/admin/posts">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour à la modération
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

  const deletePost = async () => {
    "use server"
    await db.delete(posts).where(eq(posts.id, Number.parseInt(id)))
    revalidatePath("/admin/posts")
    redirect("/admin/posts")
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <ParticleBackground particleCount={50} color="rgba(132, 90, 223, 0.3)" speed={0.5} />
      <AnimatedGradient intensity="medium" speed="slow" className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button variant="ghost" asChild className="mb-4 text-white hover:text-white hover:bg-white/10">
                <Link href="/admin/posts">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la modération
                </Link>
              </Button>
              <NeonText
                as="h1"
                color="text-red-400"
                glowColor="rgba(239, 68, 68, 0.7)"
                intensity="medium"
                className="text-3xl font-bold mb-2"
              >
                Supprimer le post
              </NeonText>
              <p className="text-muted-foreground">Cette action est irréversible</p>
            </div>

            {/* Warning Alert */}
            <Alert className="mb-6 border-destructive/50 bg-destructive/5 backdrop-blur-lg">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive">
                <strong>Attention :</strong> Cette action supprimera définitivement le post et ne peut pas être annulée.
              </AlertDescription>
            </Alert>

            {/* Confirmation Card */}
            <GlowCard
              className="shadow-lg border-destructive/20 backdrop-blur-lg bg-card/40"
              glowColor="rgba(239, 68, 68, 0.3)"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="w-5 h-5" />
                  Confirmation de suppression
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Post Preview */}
                <div className="p-4 bg-muted/50 rounded-lg border border-white/10 backdrop-blur-sm">
                  <h3 className="font-semibold mb-2 text-white">Post à supprimer :</h3>
                  <h4 className="text-lg font-medium mb-2 text-white">{postsResult.title}</h4>
                  <p className="text-muted-foreground text-sm line-clamp-3">{postsResult.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span>Auteur: #{postsResult.author_id.slice(0, 8)}...</span>
                    <span>Publié le {new Date(postsResult.createdAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>

                <p className="text-center text-muted-foreground">Êtes-vous sûr de vouloir supprimer ce post ?</p>

                <form action={deletePost} className="flex gap-3">
                  <Button type="submit" variant="destructive" className="flex-1">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Oui, supprimer définitivement
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Link href="/admin/posts">Annuler</Link>
                  </Button>
                </form>
              </CardContent>
            </GlowCard>
          </div>
        </div>
      </AnimatedGradient>
    </div>
  )
}
