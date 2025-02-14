"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, imageUrl }),
    });

    const newPost = await res.json();
    router.push(`/blog/${newPost.id}`); // ✅ 投稿後に詳細ページへ移動
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">📝 新しい記事を投稿</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} required className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400" />
          <textarea placeholder="内容" value={content} onChange={(e) => setContent(e.target.value)} required className="border border-gray-300 rounded-lg p-2 w-full h-32 focus:ring-2 focus:ring-blue-400" />
          <input type="file" accept="image/*" onChange={(e) => setImageUrl(URL.createObjectURL(e.target.files[0]))} className="p-2" />
          {imageUrl && <img src={imageUrl} alt="Uploaded" className="rounded-lg w-full" />}
          <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">投稿</button>
        </form>
        <button onClick={() => router.push("/blog")} className="mt-4 bg-gray-300 text-gray-800 py-2 w-full rounded-lg hover:bg-gray-400 transition">🔙 戻る</button>
      </div>
    </div>
  );
}
