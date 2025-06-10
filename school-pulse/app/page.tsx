import { db } from "@/db"
import { posts } from "@/db/schema"
import { Header } from "@/app/components/Header"
import { PostList } from "@/app/components/PostList"
import { MouseLight } from "@/components/ui/mouse-light"

export default async function Home() {
  const postList = await db.select().from(posts)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <MouseLight color="rgba(132, 90, 223, 0.3)" size={600} blur={120} opacity={0.4} />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-muted-foreground bg-clip-text text-transparent mb-4">
              School Pulse
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partagez vos expériences, découvrez les histoires de votre communauté scolaire
            </p>
          </div>
          <PostList postList={postList} />
        </div>
      </main>
    </div>
  )
}
