import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"


export default async function DetailPost({
    params,
}: {
    params: { id: string; }
}) {
    const postsResult = await db.select().from(posts).where(eq(posts.id, Number.parseInt(params.id)));
    const post = postsResult[0];

return (
    <div className="container mx-auto p-4">
        <Link href="/" className="text-blue-500 mb-4 inline-block">
            &larr; Back to all posts
        </Link>
        <article>
            <h1>
                {post?.title}
            </h1>
            <p className="text-gray-600">
                Published on {new Date(post?.createdAt).toLocaleDateString()}
                {post?.updatedAt > post?.createdAt && ` (Updated on ${new Date(post?.updatedAt).toLocaleDateString()})`}
            </p>
            <p>
                {post?.content}
            </p>
        </article>
    </div>
)}
