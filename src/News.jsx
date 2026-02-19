import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "./components/common/Button"

const News = () => {
    const { category } = useParams()
    const navigate = useNavigate()

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState(category || "technology")
    const [selectedCategory, setSelectedCategory] = useState(category || "technology")
    const categories = ["technology", "sports", "business", "entertainment"]

    const fetchNews = async (searchQuery = query) => {
        setLoading(true)
        try {
            const apiKey = "68bdb3d4642e467db3702c03e1a1a53b"
            const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=40&sortBy=publishedAt&apiKey=${apiKey}`)
            const data = await response.json()
            if (data.articles) {
                const validArticles = data.articles.filter(a => a.title !== "[Removed]" && a.urlToImage)
                setArticles(validArticles)
            }
        } catch (error) {
            console.error("Error fetching news:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleCategoryClick = (cat) => {
        navigate(`/news/${cat}`)
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    // Effect to refetch news when the URL category changes
    useEffect(() => {
        const currentCategory = category || "technology"
        setSelectedCategory(currentCategory)
        setQuery(currentCategory)
        fetchNews(currentCategory)
    }, [category])

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
            {/* Header and Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Latest <span className="text-indigo-600">News</span></h1>
                    <p className="text-slate-500 font-medium capitalize">Discover what's happening in {selectedCategory}</p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        navigate(`/news/${query}`);
                    }}
                    className="flex gap-3"
                >
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border rounded-xl px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64 transition-all"
                    />
                    <Button type="submit" variant="primary" size="md" className="rounded-xl">
                        Search
                    </Button>
                </form>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold capitalize transition-all duration-300 border ${selectedCategory === cat
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100 scale-105"
                            : "bg-white text-slate-500 border-slate-200 hover:border-indigo-400 hover:text-indigo-500"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
                    <p className="text-slate-400 font-medium tracking-wide">Fetching latest headlines...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <div key={index} className="flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                                {article.urlToImage && (
                                    <div className="h-48 overflow-hidden bg-slate-100">
                                        <img
                                            src={article.urlToImage}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col space-y-3">
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <div className="flex items-center gap-2 text-indigo-600">
                                            <span>{article.source.name}</span>
                                            {article.author && (
                                                <>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <span className="text-slate-400 truncate max-w-[100px]">{article.author}</span>
                                                </>
                                            )}
                                        </div>
                                        <span className="text-slate-400 font-medium">{formatDate(article.publishedAt)}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 line-clamp-3 flex-1">
                                        {article.description}
                                    </p>
                                    <div className="pt-4 mt-auto">
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold text-slate-900 hover:text-indigo-600 flex items-center gap-1 group/link transition-colors"
                                        >
                                            READ FULL ARTICLE
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-slate-500 font-medium">No results found for your search.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default News
