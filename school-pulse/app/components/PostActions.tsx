"use client";

import Link from "next/link";
import { useUser } from "@stackframe/stack";

type PostActionsProps = {
    post: { id: string | number; author_id: string | number }
};

export default function PostActions({ post }: PostActionsProps) {
    const user = useUser();

    if (!user) return null;

    return (
        <div className="mt-2">
            <Link href={`/posts/${post.id}`} className="text-blue-500 mr-2">
                Read more
            </Link>
            {user.id == post.author_id ? (
                <div>
                    <Link href={`/edit/${post.id}`} className="text-blue-500 mr-2">
                        Edit
                    </Link>
                    <Link href={`/delete/${post.id}`} className="text-red-500 mr-2">
                        Delete
                    </Link>
                </div>
            ) : (
                <p className="text-gray-500/40">
                    You must be the author to edit or delete this post.
                </p>
            )}

        </div>
    );
}
