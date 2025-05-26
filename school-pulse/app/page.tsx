import { db } from "@/db";
import { posts } from "@/db/schema";
import { Header } from "@/app/components/Header";
import { PostList } from "@/app/components/PostList";

export default async function Home() {
  const postList = await db.select().from(posts);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <PostList postList={postList} />
    </div>
  );
}
