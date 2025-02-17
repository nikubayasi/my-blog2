import { useState } from "react";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      title,
      description,
      price: parseFloat(price),
      file_url: fileUrl,
      thumbnail,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("商品が登録されました！");
      setTitle("");
      setDescription("");
      setPrice("");
      setFileUrl("");
      setThumbnail("");
      setCategory("");
      setTags("");
    } else {
      setMessage("登録に失敗しました: " + data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">商品を登録</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="商品名" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <textarea placeholder="商品説明" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required></textarea>
        <input type="number" placeholder="価格" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="ダウンロードURL" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="サムネイルURL" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="カテゴリ" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="タグ (カンマ区切り)" value={tags} onChange={(e) => setTags(e.target.value)} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">商品を登録</button>
      </form>
    </div>
  );
}
