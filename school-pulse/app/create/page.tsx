'use client';

import createPost from "./createPost";
import { useState } from "react";

export default function CreateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  return (
    <form action={createPost} onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required className="w-full border rounded p-2" />
      </div>
      <div className="mb-4">
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required className="w-full border rounded p-2"></textarea>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 rounded text-white ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'}`}
      >
        {isSubmitting ? "Submitting..." : "Create Post"}
      </button>
    </form>
  );
}
