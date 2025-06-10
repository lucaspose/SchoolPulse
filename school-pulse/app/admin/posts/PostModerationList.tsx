"use client"
import { Button } from "@/components/ui/button"
import { Trash, Eye, MoreHorizontal, Calendar, User } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@stackframe/stack"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "@/components/ui/glow-card"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Post {
  id: number
  title: string
  content: string
  author_id: string
  createdAt: Date
  updatedAt: Date
}

export function PostModerationList({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([])
  const user = useUser({ or: "redirect" })
  const isAdmin = user?.useTeam('bbc7a225-bff8-46e6-b779-77cc06fadb2c')
  const isModo = user?.useTeam('3086b24e-6828-4b66-b097-58cedaa1ac9c')
  
  if (!isAdmin && !isModo) {
    throw new Error("401: Unauthorized")
  }

  useEffect(() => {
    // Animate posts appearing one by one
    if (posts && posts.length > 0) {
      const timer = setTimeout(() => {
        setVisiblePosts(posts.slice(0, visiblePosts.length + 6))
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [posts, visiblePosts])

  useEffect(() => {
    // Initialize with empty array
    setVisiblePosts([])
  }, [])

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Trash className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Aucun post trouvé</h3>
            <p className="text-muted-foreground">La liste des posts est vide.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid gap-4">
        {visiblePosts.map((post, index) => (
          <GlowCard
            key={post.id}
            className="group backdrop-blur-lg bg-black/40 border border-white/10 hover:border-primary/30 transition-all duration-500"
            glowColor="rgba(132, 90, 223, 0.4)"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors text-white mb-2 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{post.content}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>Auteur #{post.author_id.slice(0, 8)}...</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Badge variant="outline" className="text-xs border-primary/20 bg-primary/10 text-primary">
                    Post #{post.id}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary transition-colors"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ouvrir le menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-black/90 backdrop-blur-xl border border-white/10 animate-in fade-in-80 zoom-in-95"
                    >
                      <DropdownMenuItem
                        asChild
                        className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary"
                      >
                        <Link href={`/posts/${post.id}`} className="flex items-center">
                          <Eye className="mr-2 h-4 w-4" />
                          Voir le post
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                            className="text-red-400 hover:bg-red-950/30 hover:text-red-400 focus:bg-red-950/30 focus:text-red-400"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-black/90 backdrop-blur-xl border border-white/10">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Êtes-vous absolument sûr ?</AlertDialogTitle>
                            <AlertDialogDescription className="text-muted-foreground">
                              Attention : Supprimer ce post supprimera définitivement la publication et son contenu du
                              système. Cette action ne peut pas être annulée.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-transparent border border-white/20 hover:bg-white/10 text-white">
                              Annuler
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600/80 hover:bg-red-700 text-white"
                              onClick={() => router.push(`/admin/posts/delete/${post.id}`)}
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 text-green-400"
                  >
                    Publié
                  </Badge>
                  {post.updatedAt > post.createdAt && (
                    <Badge variant="outline" className="text-xs border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                      Modifié
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="h-7 px-3 border-white/10 hover:border-primary/50 hover:bg-primary/20 transition-colors text-white hover:text-white"
                  >
                    <Link href={`/posts/${post.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      Voir
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
