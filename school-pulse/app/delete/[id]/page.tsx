import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { stackServerApp } from "@/stack"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default async function DeletePost({ params }: { params: Promise<{ id: string }> }) {
  await stackServerApp.getUser({ or: "redirect" })
  const { id } = await params

  const postsResult = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number.parseInt(id)))
    .then((res) => res[0])

  if (!postsResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="py-16">
                <h1 className="text-2xl font-bold mb-4">Post introuvable</h1>
                <p className="text-muted-foreground mb-6">Le post que vous souhaitez supprimer n'existe pas.</p>
                <Button asChild>
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour à l'accueil
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const deletePost = async () => {
    "use server"
    await db.delete(posts).where(eq(posts.id, Number.parseInt(id)))
    revalidatePath("/")
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href={`/posts/${postsResult.id}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au post
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2 text-destructive">Supprimer le post</h1>
            <p className="text-muted-foreground">Cette action est irréversible</p>
          </div>

          {/* Warning Alert */}
          <Alert className="mb-6 border-destructive/50 bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              <strong>Attention :</strong> Cette action supprimera définitivement le post et ne peut pas être annulée.
            </AlertDescription>
          </Alert>

          {/* Confirmation Card */}
          <Card className="shadow-lg border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Trash2 className="w-5 h-5" />
                Confirmation de suppression
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Post Preview */}
              <div className="p-4 bg-muted/50 rounded-lg border">
                <h3 className="font-semibold mb-2">Post à supprimer :</h3>
                <h4 className="text-lg font-medium mb-2">{postsResult.title}</h4>
                <p className="text-muted-foreground text-sm line-clamp-3">{postsResult.content}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Publié le {new Date(postsResult.createdAt).toLocaleDateString("fr-FR")}
                </p>
              </div>

              <p className="text-center text-muted-foreground">Êtes-vous sûr de vouloir supprimer ce post ?</p>

              <form action={deletePost} className="flex gap-3">
                <Button type="submit" variant="destructive" className="flex-1">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Oui, supprimer définitivement
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={`/posts/${postsResult.id}`}>Annuler</Link>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
