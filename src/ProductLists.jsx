import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "./components/common/Products";
import Button from "./components/common/Button";

export const ProductLists = () => {
  const [jsonArray, setJsonArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchJson = async () => {
    try {
      const response = await fetch('/ProductJson.json');
      if (!response.ok) throw new Error('Failed to fetch');
      const finalResult = await response.json();
      if (finalResult && finalResult.data) {
        setJsonArray(finalResult.data);
      }
    } catch (error) {
      console.error("Error fetching products, falling back to local data:", error);
      // Fallback to local products array if fetch fails
      setJsonArray(products);
    }
  }

  useEffect(() => {
    fetchJson();
  }, []);

  // Filter products based on selected category (safe check for jsonArray)
  const filteredProducts = (jsonArray || []).filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  // Get unique categories from the data safely
  const categories = ["all", ...new Set((jsonArray || []).map(item => item?.category).filter(Boolean))];
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-blue-600">Products</span>
          </h1>
          <p className="text-slate-500 max-w-md">
            Explore our curated collection of high-quality electronics and lifestyle products.
          </p>
        </div>

        {/* Categories Section */}
        <div className="flex flex-wrap gap-2 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-300 ${selectedCategory === cat
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((item, index) => (
          <ProductCard key={item._id || index} item={item} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-slate-400 font-medium text-lg">No products found</p>
          <Button variant="outline" onClick={fetchJson}>Refresh Products</Button>
        </div>
      )}
    </div>
  );
};
