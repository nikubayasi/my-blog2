import { connect } from "../../../../lib/mongodb/mongoose";
import Product from "../../../../lib/models/Product"; // ✅ 修正


export async function GET(req, { params }) {
  await connect();

  try {
    const id = params?.id;
    if (!id) {
      return Response.json({ message: "Missing product ID" }, { status: 400 });
    }

    const product = await Product.findById(id);

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error("❌ 取得エラー:", error);
    return Response.json({ message: "Error fetching product", error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connect();

  try {
    const id = params?.id;
    if (!id) {
      return Response.json({ message: "Missing product ID" }, { status: 400 });
    }

    const body = await req.json();
    console.log("🔍 更新データ:", body);
    console.log("📌 更新する ID:", id);

    delete body.id;

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product updated", product: updatedProduct }, { status: 200 });
  } catch (error) {
    console.error("❌ 更新エラー:", error);
    return Response.json({ message: "Error updating product", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connect();

  try {
    const id = params?.id;
    if (!id) {
      return Response.json({ message: "Missing product ID" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ 削除エラー:", error);
    return Response.json({ message: "Error deleting product", error: error.message }, { status: 500 });
  }
}
