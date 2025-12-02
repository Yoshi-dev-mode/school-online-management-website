'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({ name: "", price: 0, category: "", image: "" });

  // Fetch products from backend
  const refreshProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  // Add or Update Product
  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category || !formData.image) {
      alert("Please fill all fields");
      return;
    }

    const url = editingProduct
      ? `http://127.0.0.1:8000/products/${editingProduct.id}`
      : "http://127.0.0.1:8000/products";

    const method = editingProduct ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({ name: "", price: 0, category: "", image: "" });
    setEditingProduct(null);
    refreshProducts();
  };

  // Edit product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  // Delete product
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    await fetch(`http://127.0.0.1:8000/products/${id}`, { method: "DELETE" });
    refreshProducts();
  };

  // Handle image upload
  const handleUpload = (fileInfo: Record<string, any>) => {
    const url =
      fileInfo?.successEntries?.[0]?.cdnUrl ||
      fileInfo?.allEntries?.[0]?.cdnUrl ||
      fileInfo?.cdnUrl;

    if (url) setFormData({ ...formData, image: url });
  };

  return (
    <main className="p-4">
      <div className="flex items-center mb-4">
        <Image src="/box.png" height={30} width={30} alt="shopping cart icon" />
        <h1 className="ml-3 text-xl md:text-2xl font-semibold">Products</h1>
      </div>

      {/* Form for Add/Edit */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="border p-2 rounded w-full"
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Category</option>
            <option value="Meals">Meals</option>
            <option value="Drinks">Drinks</option>
            <option value="Desserts">Desserts</option>
          </select>

          <div className="mb-4">
            <FileUploaderRegular
              pubkey="60b65262e57242452cae"
              sourceList="local"
              classNameUploader="uc-light"
              onChange={handleUpload}
         
            
              multiple={false}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="cursor-pointer border border-main-red text-main-red px-10 py-2 rounded-lg hover:bg-red-50 transition"
          >
            {editingProduct ? "Update" : "Add"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setFormData({ name: "", price: 0, category: "", image: "" });
              }}
              className="border border-gray-400 text-gray-400 px-5 py-1 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-2 w-20">
                  <img src={product.image} alt={product.name} />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">₱{product.price}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="border border-yellow-400 text-yellow-400 px-5 py-1 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="border border-red-500 text-red-500 px-5 py-1 rounded-full cursor-pointer hover:bg-red-600 hover:text-white transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
