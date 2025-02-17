"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams(); // ✅ `id` を直接取得
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ tags: [] });
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setFormData({ ...data, tags: Array.isArray(data.tags) ? data.tags : [] });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    let imageUrl = formData.thumbnail;

    if (imageFile) {
      const imageData = new FormData(); // ✅ `FormData` を `imageData` に変更
      imageData.append("file", imageFile);
      imageData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: imageData,
        });

        if (!res.ok) throw new Error("Failed to upload image");

        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (err) {
        return setMessage("画像のアップロードに失敗しました: " + err.message);
      }
    }

    // 🔥 デバッグ用ログ
    console.log("📤 送信データ:", { ...formData, thumbnail: imageUrl });
    console.log("📌 送信する ID:", id);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, thumbnail: imageUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("❌ 更新エラー:", errorData);
        throw new Error(errorData.message || "Failed to update product");
      }

      setMessage("商品が更新されました！");
      router.push("/products");
    } catch (err) {
      console.error("更新に失敗しました:", err);
      setMessage("更新に失敗しました: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">商品詳細 & 編集</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" name="title" value={formData.title || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" value={formData.description || ""} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
        <input type="number" name="price" value={formData.price || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="file_url" value={formData.file_url || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
        {formData.thumbnail && <img src={formData.thumbnail} alt="Thumbnail" className="w-32 h-32 object-cover mt-2" />}
        <input type="text" name="category" value={formData.category || ""} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="tags" value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">更新する</button>
      </form>
    </div>
  );
}
