let posts = [
  { id: "1", title: "最初の投稿", content: "これは最初の記事です。" },
  { id: "2", title: "次の投稿", content: "これは次の記事です。" },
];

// 全ての記事を取得
export function getAllPosts() {
  return posts;
}

// 特定の記事を取得
export function getPostById(id) {
  return posts.find((post) => post.id === id);
}

// 記事を作成（データを配列に追加）
export function createPost({ title, content, imageUrl }) {
  const newPost = { id: String(Date.now()), title, content, imageUrl };
  posts.push(newPost);
  return newPost;
}
