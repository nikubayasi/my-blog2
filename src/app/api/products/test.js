import clientPromise from "../../../lib/mongodb/mongoose";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const collections = await db.listCollections().toArray();
    
    return Response.json({ message: "MongoDB connected successfully!", collections }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "MongoDB connection failed", error: error.message }, { status: 500 });
  }
}
