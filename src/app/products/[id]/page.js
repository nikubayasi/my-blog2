"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams } from "next/navigation";
export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [id, setId] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({  });
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (params?.id) {
      console.log("Product ID:", params.id); // Debugging用ログ
      setId(params.id);
    } else {
      console.error("Error: params.id is undefined", params);
    }
  }, [params]);
  
  
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
  useEffect(() => {
    async function searchProducts() {
      if (!searchTerm) {
        setFilteredProducts([]);
        return;
      }
      try {
        const res = await fetch(`/api/products?search=${searchTerm}`);
        if (!res.ok) throw new Error("Failed to search products");
        const data = await res.json();
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
      }
    }
    searchProducts();
  }, [searchTerm]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async (file) => {
    if (!file) return null; // 画像がない場合は何もしない
  
    const imageRef = ref(storage, `products/${id}-${file.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL; // 画像URLを返す
    } catch (err) {
      console.error("画像アップロードエラー:", err);
      setMessage("画像のアップロードに失敗しました: " + err.message);
      return null;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    let imageUrl = formData.thumbnail || "";
  
    // 🔥 画像アップロード処理
    if (imageFile) {
      const uploadedImageUrl = await handleImageUpload(imageFile);
      if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl; // 画像アップロード成功時のみ URL を更新
      }
    }
  
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, thumbnail: imageUrl }),
      });
  
      if (!res.ok) throw new Error("Failed to update product");
  
      setMessage("商品が更新されました！");
      router.push("/products");
    } catch (err) {
      console.error("更新エラー:", err);
      setMessage("更新に失敗しました: " + err.message);
    }
  };
  console.log("Firebase Storage:", storage);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">商品詳細 & 編集</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <input type="text" placeholder="検索" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 border rounded mb-4" />

      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" name="title" value={formData.title || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" value={formData.description || ""} onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
        <input type="number" name="price" value={formData.price || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="file_url" value={formData.file_url || ""} onChange={handleChange} className="w-full p-2 border rounded" required />

        {/* 画像アップロードフィールド */}
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
        {formData.thumbnail && <img src={formData.thumbnail} alt="Thumbnail" className="w-32 h-32 object-cover mt-2" />}

        <input type="text" name="category" value={formData.category || ""} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="text" name="tags" value={formData.tags?.join(", ") || ""} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">更新する</button>
      </form>
    </div>
  );
}
