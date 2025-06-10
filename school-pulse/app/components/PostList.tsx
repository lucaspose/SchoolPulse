"use client"

import Link from "next/link"
import { useUser } from "@stackframe/stack"
import PostActions from "./PostActions"
import { CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { InteractiveCard } from "@/components/ui/interactive-card"

interface Post {
  id: string | number
  title: string
  content: string
  createdAt: string | number | Date
  author_id: string | number
}

export function PostList({ postList }: { postList: Post[] }) {
  const user = useUser()

  return (
    <div className="space-y-8">
      {/* Create Post Section */}
      <InteractiveCard
        className="border-dashed border-2 hover:border-primary/50 transition-colors backdrop-blur-lg bg-card/40"
        glowColor="rgba(132, 90, 223, 0.4)"
        maxRotation={5}
      >
        <CardContent className="flex flex-col items-center justify-center py-12">
          {user ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <PlusCircle className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Créer un nouveau post</h3>
                <p className="text-muted-foreground mb-4">Partagez vos idées avec la communauté</p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="/create">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Nouveau Post
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Connectez-vous pour créer</h3>
                <p className="text-muted-foreground">Vous devez être connecté pour créer un post</p>
              </div>
            </div>
          )}
        </CardContent>
      </InteractiveCard>

      {/* Posts List */}
      {postList.length === 0 ? (
        <InteractiveCard className="backdrop-blur-lg bg-card/40">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Aucun post pour le moment</h3>
                <p className="text-muted-foreground">Soyez le premier à partager quelque chose !</p>
              </div>
            </div>
          </CardContent>
        </InteractiveCard>
      ) : (
        <div className="grid gap-6">
          {postList.map((post) => (
            <InteractiveCard
              key={post.id}
              className="group backdrop-blur-lg bg-card/40 hover:shadow-lg transition-all duration-300"
              glowColor="rgba(132, 90, 223, 0.4)"
              maxRotation={5}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <Link href={`/posts/${post.id}`}>
                      <h2 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2 text-white">
                        {post.title}
                      </h2>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={new Date(post.createdAt).toISOString()}>
                        {new Date(post.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-4 bg-primary/20 border border-primary/30 text-primary">
                    Post #{post.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                </p>
                <PostActions post={{ id: post.id, author_id: post.author_id }} />
              </CardContent>
            </InteractiveCard>
          ))}
        </div>
      )}
    </div>
  )
}
