"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getTokenFromClient } from "../lib/getTokenFromClient";
import { useRouter } from "next/navigation";

const addProduct = async (productData, token) => {
  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
  const response = await fetch(`${serverUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.msg || "Failed to add product!");
  }

  return response.json();
};

const AddDataPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const productData = Object.fromEntries(formData.entries());

    try {
      setSubmitting(true);
      const token = await getTokenFromClient();

      if (!token) {
        toast.error("Please login first!");
        return;
      }

      await addProduct(productData, token);

      toast.success("Product added successfully!");
      form.reset();
      router.push("/get-data");
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <Toaster position="top-right" />

      <h1 className="text-2xl font-bold mb-6 text-slate-800">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium text-slate-700">Product Name</label>
          <input
            type="text"
            name="productName"
            placeholder="Enter product name"
            required
            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">Image URL</label>
          <input
            type="url"
            name="image"
            placeholder="Enter image URL"
            required
            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            rows={4}
            required
            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-60"
        >
          {submitting ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddDataPage;
