import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";

export default async function Home() {
  const postList = await db.select().from(posts);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">SchoolPulse</h1>
      <Link href="/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create New Post
      </Link>
      {postList.map((post) => (
        <div key={post.id} className="border p-4 rounded mb-4">
          <Link href={`/posts/${post.id}`}>
            <h2 className="text-xl font-semibold hover:text-blue-500">
              {post.title}
            </h2>
          </Link>
          <p className="text-gray-700">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-2">
            {post.content.substring(0, 150)}...
          </p>
          <div className="mt-2">
            <Link href={`/posts/${post.id}`} className="text-blue-500 mr-2">
                Read more
            </Link>
            <Link href={`/edit/${post.id}`} className="text-blue-500 mr-2">
                Edit
            </Link>
            <Link href={`/delete/${post.id}`} className="text-red-500 mr-2">
                Delete
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
