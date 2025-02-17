import { connect } from "../../../lib/mongodb/mongoose"; // ✅ 修正
import { ObjectId } from "mongodb";
import Product from "../../../lib/models/Product"; // ✅ 修正

export async function GET() {
  try {
    const db = await connect(); // ✅ `db` を取得
    console.log("📌 Fetched DB:", db); // 🔍 デバッグ用ログ

    const products = await db.collection("products").find({}).toArray(); // ✅ `collection()` が使える

    return Response.json(products, { status: 200 });
  } catch (error) {
    console.error("❌ 商品取得エラー:", error);
    return Response.json({ message: "Error fetching products", error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  const db = await connect(); // ✅ MongoDB に接続
  const collection = db.collection("products");

  try {
    const body = await req.json();
    const { title, description, price, file_url, thumbnail, category, tags } = body;

    if (!title || !price || !file_url) {
      return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newProduct = {
      title,
      description: description || "",
      price: parseFloat(price),
      file_url,
      thumbnail: thumbnail || "",
      category: category || "その他",
      tags: tags || [],
      created_at: new Date(),
    };

    await collection.insertOne(newProduct);
    return Response.json({ message: "Product added", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("❌ 商品追加エラー:", error);
    return Response.json({ message: "Error adding product", error }, { status: 500 });
  }
}
