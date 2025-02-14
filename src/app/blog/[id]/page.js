"use client";
import { use } from "react";
import { useState } from "react";
import { useParams,useRouter } from "next/navigation";
import { getPostById } from "@/app/lib/posts";

export default function PostPage({ params }) {
  const { id } = use(params); // ✅ `use()` で unwrap する

  const post = getPostById(id);
  const router = useRouter();

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || "");

  if (!post) return <p>記事が見つかりません。</p>;

  const handleUpdate = async () => {
    await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, imageUrl }),
    });
    alert("記事を更新しました！");
  };

  const handleDelete = async () => {
    if (confirm("本当に削除しますか？")) {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      router.push("/blog");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>記事の編集</h1>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <img src={imageUrl} alt="Post Image" width="200" />

      <button onClick={handleUpdate}>更新</button>
      <button onClick={handleDelete} style={{ marginLeft: "10px", backgroundColor: "red" }}>削除</button>
      <button
          onClick={() => router.push("/blog")}
          className="mt-4 bg-gray-300 text-gray-800 py-2 w-full rounded-lg hover:bg-gray-400 transition"
        >
          🔙 戻る
        </button>
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full mt-4 rounded-lg" />}
    </div>
    </div>
  );
}
