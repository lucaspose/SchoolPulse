import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { stackServerApp } from "@/stack"

export default async function DeletePost({params}: {params: Promise<{id: string}>}) {
    await stackServerApp.getUser({ or: 'redirect'});
    const { id } = await params

    const postsResult = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number.parseInt(id)))
    .then((res) => res[0]);

    if (!postsResult) return <div>Post not found</div>;

    const deletePost = async () => {
        "use server";
        await db.delete(posts).where(eq(posts.id, Number.parseInt(id)));
        revalidatePath("/");
        redirect("/");
    }

    return (
        <div>
            <Link href={`/posts/${postsResult.id}`} className="text-blue-500 mb-4 inline-block">
                &larr; Back to post
            </Link>
            <h1 className="text-2xl font-bold mb-4">Delete Post</h1>
            <p>
                Are you sure you want to delete the post titled <strong>{postsResult.title}</strong>?
            </p>
        <form action={deletePost}>
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                Delete Post
            </button>
        </form>
        </div>
    )
}