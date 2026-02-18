import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Button from "./components/common/Button"

export const DetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchJson = async () => {
    try {
      const res = await fetch('/ProductJson.json');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data && data.data) {
        const foundProduct = data.data.find((item) => item._id === parseInt(id));
        setProduct(foundProduct);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJson();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Product not found</h2>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Navigation / Back Button */}
      <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Products</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto object-contain aspect-square transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-600">${product.price}</span>
              {product.oldPrice && (
                <span className="text-xl text-slate-400 line-through">${product.oldPrice}</span>
              )}
            </div>
          </div>

          <div className="border-t border-b border-slate-100 py-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed text-lg italic">
              "{product.description}"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="gradient" size="lg" className="flex-1 py-4">
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="flex-1 py-4">
              Add to Wishlist
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}