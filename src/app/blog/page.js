import { getAllPosts } from "@/app/lib/posts";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">📜 ブログ一覧</h1>
        
        {/* 新規投稿ボタン */}
        <div className="text-center mb-6">
          <Link href="/blog/new" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
            📝 新しい記事を投稿
          </Link>
        </div>

        {/* 記事カード一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{post.content.slice(0, 80)}...</p>
                  <Link href={`/blog/${post.id}`} className="text-blue-500 hover:underline block mt-3">
                    詳細を見る →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">投稿がありません。</p>
          )}
        </div>
      </div>
    </div>
  );
}
