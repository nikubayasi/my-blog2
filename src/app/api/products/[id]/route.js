import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const client = await clientPromise;
  const db = client.db("next-blog");
  const collection = db.collection("products");

  try {
    const id = params?.id;  // 修正
    if (!id) {
      return Response.json({ message: "Missing product ID" }, { status: 400 });
    }

    const product = await collection.findOne({ _id: new ObjectId(id) });
    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }
    return Response.json(product, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error fetching product", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const client = await clientPromise;
  const db = client.db("next-blog");
  const collection = db.collection("products");

  try {
    const id = params?.id;  // 修正
    if (!id) {
      return Response.json({ message: "Missing product ID" }, { status: 400 });
    }

    const body = await req.json();
    const updatedProduct = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: body },
      { returnDocument: "after" }
    );

    if (!updatedProduct.value) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product updated", product: updatedProduct.value }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error updating product", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const client = await clientPromise;
  const db = client.db("next-blog");
  const collection = db.collection("products");

  try {
    const id = params?.id;  // 修正
    if (!id) {
      return Response.json({ message: "Missing product ID" }, { status: 400 });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Error deleting product", error }, { status: 500 });
  }
}