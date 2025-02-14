// app/api/upload/route.js
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response(JSON.stringify({ error: "ファイルがありません" }), { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);

  await writeFile(filePath, buffer);

  return new Response(JSON.stringify({ imageUrl: `/uploads/${fileName}` }), { status: 200 });
}
