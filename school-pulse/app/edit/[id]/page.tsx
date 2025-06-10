import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { stackServerApp } from "@/stack"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Eye } from "lucide-react"

async function updatePost(formData: FormData) {
  "use server"
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  await db
    .update(posts)
    .set({ title, content, updatedAt: new Date() })
    .where(eq(posts.id, Number.parseInt(id)))
  revalidatePath("/")
  redirect("/")
}

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const user = await stackServerApp.getUser({ or: "redirect" })
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
                <p className="text-muted-foreground mb-6">Le post que vous souhaitez modifier n'existe pas.</p>
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

  if (user.id != postsResult.author_id) {
    throw new Error("401: Unauthorized")
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
            <h1 className="text-3xl font-bold mb-2">Modifier le post</h1>
            <p className="text-muted-foreground">Apportez les modifications nécessaires à votre publication</p>
          </div>

          {/* Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                Édition du Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updatePost} className="space-y-6">
                <input type="hidden" name="id" value={postsResult.id} />

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Titre du post
                  </Label>
                  <Input
                    type="text"
                    required
                    name="title"
                    id="title"
                    defaultValue={postsResult.title}
                    placeholder="Titre de votre post..."
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">
                    Contenu
                  </Label>
                  <Textarea
                    required
                    name="content"
                    id="content"
                    defaultValue={postsResult.content}
                    placeholder="Contenu de votre post..."
                    className="w-full resize-none"
                    rows={8}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Sauvegarder les modifications
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href={`/posts/${postsResult.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      Aperçu
                    </Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
