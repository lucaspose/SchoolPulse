"use client"

import { useUser } from "@stackframe/stack"
import createPost from "./createPost"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CreateForm() {
  useUser({ or: "redirect" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2">Créer un nouveau post</h1>
            <p className="text-muted-foreground">Partagez vos idées avec la communauté School Pulse</p>
          </div>

          {/* Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Nouveau Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createPost} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Titre du post
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="Donnez un titre accrocheur à votre post..."
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">
                    Contenu
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    rows={8}
                    required
                    placeholder="Écrivez votre message ici. Partagez vos pensées, expériences ou idées..."
                    className="w-full resize-none"
                  />
                  <p className="text-xs text-muted-foreground">Exprimez-vous librement et respectueusement</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Publication en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Publier le post
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">Annuler</Link>
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
