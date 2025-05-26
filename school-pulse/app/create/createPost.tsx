'use server';

import { redirect } from "next/navigation";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { stackServerApp } from "@/stack";

export default async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const user = await stackServerApp.getUser();

    if (!user?.id) throw new Error("Missing user ID");

    await db.insert(posts).values({ title, content, author_id: user.id });

    revalidatePath("/");
    redirect("/");
}
