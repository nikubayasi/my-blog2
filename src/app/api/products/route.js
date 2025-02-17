import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const client = await clientPromise;
  const db = client.db("next-blog");
  const collection = db.collection("products");

  try {
    const products = await collection.find({}).toArray();
    return Response.json(products, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error fetching products", error }, { status: 500 });
  }
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("next-blog");
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
    return Response.json({ message: "Error adding product", error }, { status: 500 });
  }
}
