import Link from "next/link";
import { Suspense } from "react";
import { getTokenFromServer } from "../lib/getTokenFromServer";

async function ProductList() {
  const token = await getTokenFromServer();

  let products = [];
  let error = null;

  if (!token) {
    error = "You are not logged in. Please log in to view products.";
  } else {
    try {
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000";
      const res = await fetch(`${serverUrl}/products`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        error = errorData.msg || `Server error (${res.status})`;
      } else {
        const data = await res.json();
        if (Array.isArray(data)) {
          products = data;
        } else {
          error = data?.msg || "Failed to load products";
        }
      }
    } catch (err) {
      console.error("Failed to load products:", err);
      error =
        "Could not connect to the backend server. Make sure the server is running.";
    }
  }

  return (
    <>
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/20 bg-red-50 p-4 text-red-600">
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.productName || "Product"}
                className="w-full h-52 object-cover"
              />
            ) : (
              <div className="w-full h-52 bg-slate-100 flex items-center justify-center text-slate-400">
                No Image
              </div>
            )}

            <div className="p-5">
              <h2 className="text-xl font-bold mb-2">{product.productName}</h2>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {product.description}
              </p>

              <Link
                href={`/get-data/${product._id}`}
                className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {!error && products.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found!</p>
          <Link
            href="/add-data"
            className="mt-4 inline-block text-blue-600 hover:underline font-medium"
          >
            Add your first product →
          </Link>
        </div>
      )}
    </>
  );
}

const GettingData = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[40vh]">
            <p className="text-lg text-slate-600">Loading products...</p>
          </div>
        }
      >
        <ProductList />
      </Suspense>
    </div>
  );
};

export default GettingData;
