"use client"
import { Button } from "@/components/ui/button"
import { Trash, Edit, Plus, Minus, MoreHorizontal } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "@/components/ui/glow-card"
import { useState, useEffect } from "react"

export function UserList({ users }: { users: any[] }) {
  const router = useRouter()
  const user = useUser()
  const isAdmin = user?.usePermission("team_admin")
  const [visibleUsers, setVisibleUsers] = useState<any[]>([])

  useEffect(() => {
    // Animate users appearing one by one
    if (users && users.length > 0) {
      const timer = setTimeout(() => {
        setVisibleUsers(users.slice(0, visibleUsers.length + 4))
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [users, visibleUsers])

  useEffect(() => {
    // Initialize with empty array
    setVisibleUsers([])
  }, [])

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Trash className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Aucun utilisateur trouvé</h3>
            <p className="text-muted-foreground">La liste des utilisateurs est vide.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleUsers.map((u, index) => (
          <GlowCard
            key={u.id}
            className="group backdrop-blur-lg bg-black/40 border border-white/10 hover:border-primary/30 transition-all duration-500"
            glowColor="rgba(132, 90, 223, 0.4)"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300">
                    <AvatarImage src={u.profileImageUrl || ""} alt={u.displayName || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
                      {u.displayName?.charAt(0)?.toUpperCase() || u.primaryEmail?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                      {u.displayName || "Nom non défini"}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">{u.primaryEmail || "Email non défini"}</p>
                  </div>
                </div>

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
                      onClick={() => router.push(`/admin/users/edit/${u.id}`)}
                      className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      onClick={() => router.push(`/admin/users/perm/add/${u.id}`)}
                      className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Ajouter permission
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push(`/admin/users/perm/delete/${u.id}`)}
                      className="hover:bg-primary/20 hover:text-primary focus:bg-primary/20 focus:text-primary"
                    >
                      <Minus className="mr-2 h-4 w-4" />
                      Retirer permission
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
                          <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Attention : Supprimer cet utilisateur supprimera définitivement son compte et toutes les
                            données associées du système. Cette action ne peut pas être annulée.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-transparent border border-white/20 hover:bg-white/10">
                            Annuler
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600/80 hover:bg-red-700"
                            onClick={() => router.push(`/admin/users/delete/${u.id}`)}
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <Badge
                    variant="outline"
                    className="text-xs font-mono border-primary/20 bg-primary/10 text-primary-foreground"
                  >
                    {u.id.slice(0, 8)}...
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Inscrit le:</span>
                  <span className="text-xs">
                    {u.signedUpAt ? new Date(u.signedUpAt).toLocaleDateString("fr-FR") : "Inconnu"}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30"
                  >
                    Utilisateur
                  </Badge>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/admin/users/edit/${u.id}`)}
                      className="h-7 w-7 p-0 border-white/10 hover:border-primary/50 hover:bg-primary/20 transition-colors"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
