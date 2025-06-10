"use client"

import Link from "next/link"
import { useUser } from "@stackframe/stack"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type PostActionsProps = {
  post: { id: string | number; author_id: string | number }
}

export default function PostActions({ post }: PostActionsProps) {
  const user = useUser()

  return (
    <div className="flex items-center justify-between pt-4 border-t">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/posts/${post.id}`}>
          <Eye className="w-4 h-4 mr-2" />
          Lire la suite
        </Link>
      </Button>

      {user ? (
        user.id == post.author_id ? (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Votre post
            </Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/edit/${post.id}`}>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" asChild>
              <Link href={`/delete/${post.id}`}>
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Seul l'auteur peut modifier ce post</span>
          </div>
        )
      ) : null}
    </div>
  )
}
