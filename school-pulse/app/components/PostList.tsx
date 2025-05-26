'use client';

import Link from "next/link";
import { useUser } from "@stackframe/stack";
import PostActions from "./PostActions";

interface Post {
  id: string | number;
  title: string;
  content: string;
  createdAt: string | number | Date;
  author_id: string | number;
}

export function PostList({ postList }: { postList: Post[] }) {
  const user = useUser();

  return (
    <>
      {user ? (
        <Link href="/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
          Create New Post
        </Link>
      ) : (
        <p className="text-gray-500/40 mb-4">
          You must be logged in to create a post.
        </p>
      )}
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
          <PostActions post={{ id: post.id, author_id: post.author_id }} />
        </div>
      ))}
    </>
  );
}
