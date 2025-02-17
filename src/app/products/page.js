"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    if (!confirm("本当に削除しますか？")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      alert("削除に失敗しました: " + err.message);
    }
  };

    const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item._id === product._id);
      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const increaseQuantity = (id) => {
    setCart((prev) => prev.map((item) => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id) => {
    setCart((prev) => prev.map((item) => item._id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded-lg flex">
    <div className="w-3/4 pr-6">
      <h2 className="text-2xl font-bold mb-4">商品一覧</h2>
      <Link href="/products/new" className="mb-4 inline-block bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        新規商品追加
      </Link>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product._id} className="p-4 border rounded flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {product.thumbnail && (
                <img src={product.thumbnail} alt={product.title} className="w-16 h-16 object-cover rounded" />
              )}
              <div>
                <Link href={`/products/${product._id}`} className="text-lg font-bold text-blue-500 hover:underline">
                  {product.title}
                </Link>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-bold">${product.price}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => addToCart(product)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                カートに追加
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">カート</h3>
      {cart.length === 0 ? (
        <p className="text-gray-500">カートが空です</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-bold">{item.title}</p>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => decreaseQuantity(item._id)} className="px-2 bg-gray-300 rounded">-</button>
                <button onClick={() => increaseQuantity(item._id)} className="px-2 bg-gray-300 rounded">+</button>
                <button onClick={() => removeFromCart(item._id)} className="px-2 bg-red-500 text-white rounded">削除</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-4 font-bold">総額: ${totalAmount}</p>
    </div>
  </div>
  );
}
