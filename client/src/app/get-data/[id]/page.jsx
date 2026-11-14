"use client";

import { getTokenFromClient } from "@/app/lib/getTokenFromClient";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, X, Save, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const ProductDetailsContent = () => {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    image: "",
    description: "",
  });

  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";

  // Get Single Product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const token = await getTokenFromClient();

        const res = await fetch(`${serverUrl}/products/${id}`, {
          headers: token
            ? {
                authorization: `Bearer ${token}`,
              }
            : {},
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();

        if (!data) {
          setProduct(null);
          return;
        }

        setProduct(data);

        setFormData({
          productName: data.productName || "",
          image: data.image || "",
          description: data.description || "",
        });
      } catch (error) {
        toast.error(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id, serverUrl]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setIsUpdating(true);

      const token = await getTokenFromClient();

      const res = await fetch(`${serverUrl}/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      setProduct({
        ...product,
        ...formData,
      });

      setIsEditing(false);

      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update product!");
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Product
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const token = await getTokenFromClient();

      const res = await fetch(`${serverUrl}/products/${id}`, {
        method: "DELETE",
        headers: token
          ? {
              authorization: `Bearer ${token}`,
            }
          : {},
      });

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      toast.success("Product deleted successfully!");

      router.push("/get-data");
    } catch (error) {
      toast.error(error.message || "Failed to delete product!");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg text-slate-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">
          Product not found!
        </h2>
        <Link
          href="/get-data"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          ← Back to All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        href="/get-data"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 mb-6 transition"
      >
        <ArrowLeft size={16} /> Back to Products
      </Link>

      {/* Product Card */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-md bg-white">
        {/* Product Image */}
        {product.image && (
          <img
            src={product.image}
            alt={product.productName || "Product"}
            className="w-full h-96 object-cover"
          />
        )}

        <div className="p-6">
          {/* Header & Action Buttons */}
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold text-slate-800">
              Product Details
            </h1>

            <div className="flex gap-3">
              {/* Edit Icon */}
              <button
                onClick={() => {
                  setFormData({
                    productName: product.productName,
                    image: product.image,
                    description: product.description,
                  });

                  setIsEditing(!isEditing);
                }}
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                title="Edit Product"
              >
                {isEditing ? <X size={20} /> : <Pencil size={20} />}
              </button>

              {/* Delete Icon */}
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition disabled:opacity-50"
                title="Delete Product"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>

          {/* Product Information */}
          {!isEditing ? (
            <div>
              <h2 className="text-3xl font-bold mb-3 text-slate-900">
                {product.productName}
              </h2>

              <p className="text-gray-600 text-lg mb-5 leading-relaxed">
                {product.description}
              </p>

              <p className="text-xs text-gray-400">
                Product ID: {product._id}
              </p>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleUpdate} className="space-y-4">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Edit Product
              </h2>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Product Name
                </label>

                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
                  placeholder="Product Name"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
                  placeholder="Image URL"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:border-blue-500"
                  placeholder="Description"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isUpdating}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
              >
                <Save size={18} />
                {isUpdating ? "Updating..." : "Update Product"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-lg text-slate-600">Loading product...</p>
        </div>
      }
    >
      <ProductDetailsContent />
    </Suspense>
  );
};

export default ProductDetails;
