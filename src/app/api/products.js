import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("next-blog"); // ← MongoDBのデータベース名を指定
  const collection = db.collection("products");

  switch (req.method) {
    // 🔹 すべての商品を取得 (GET /api/products)
    case "GET":
      try {
        const products = await collection.find({}).toArray();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
      }
      break;

    // 🔹 特定の商品を取得 (GET /api/products/:id)
    case "POST":
      try {
        const { title, description, price, file_url, thumbnail, category, tags } = req.body;

        if (!title || !price || !file_url) {
          return res.status(400).json({ message: "Missing required fields" });
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

        const result = await collection.insertOne(newProduct);
        res.status(201).json({ message: "Product added", product: result.ops[0] });
      } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
