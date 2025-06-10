import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

export default async function DetailPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const postsResult = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number.parseInt(id)))
  const post = postsResult[0]

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card>
              <CardContent className="py-16">
                <h1 className="text-2xl font-bold mb-4">Post introuvable</h1>
                <p className="text-muted-foreground mb-6">
                  Le post que vous recherchez n'existe pas ou a été supprimé.
                </p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux posts
            </Link>
          </Button>

          {/* Article */}
          <article>
            <Card className="shadow-lg">
              <CardHeader className="pb-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">Post #{post.id}</Badge>
                  </div>

                  <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Publié le{" "}
                        {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {post.updatedAt > post.createdAt && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          Modifié le{" "}
                          {new Date(post.updatedAt).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>Auteur #{post.author_id}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</div>
                </div>
              </CardContent>
            </Card>
          </article>
        </div>
      </div>
    </div>
  )
}
