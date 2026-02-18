import { Link } from "react-router-dom"
import Button from "./components/common/Button"

export const ProductCard = ({ item }) => {
    if (!item) return null;

    const id = item._id || item.id;
    const title = item.title || item.name;
    const price = item.price;
    const description = item.description;
    const image = item.image || "https://placehold.co/600x600?text=No+Image";
    const category = item.category;

    return (
        <Link to={`${id}`} className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 block cursor-pointer">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain p-6 transition-transform duration-500"
                />

                {category && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-slate-900 rounded-full shadow-sm">
                        {category}
                    </span>
                )}
            </div>

            {/* Content Container */}
            <div className="p-5 space-y-3">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 min-h-[40px]">
                        {description}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium">Price</span>
                        <span className="text-xl font-bold text-slate-900">${price}</span>
                    </div>

                    <Button variant="primary" size="sm" className="rounded-full shadow-blue-200" onClick={(e) => {
                        e.preventDefault(); // Prevent navigation when clicking 'Add to Cart'
                        // Add cart logic here if needed
                    }}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Link>
    )
}