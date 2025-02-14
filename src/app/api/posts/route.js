// app/api/posts/route.js
import { createPost, updatePost, deletePost, getAllPosts } from "@/app/lib/posts";

export async function GET() {
  return Response.json(getAllPosts());
}

export async function POST(req) {
  const { title, content, imageUrl } = await req.json();
  const newPost = createPost({ title, content, imageUrl });
  return Response.json(newPost);
}

export async function PUT(req) {
  const { id, title, content } = await req.json();
  return Response.json(updatePost(id, { title, content }));
}


export async function DELETE(req) {
  const { id } = await req.json();
  deletePost(id);
  return Response.json({ message: "Deleted" });
}
