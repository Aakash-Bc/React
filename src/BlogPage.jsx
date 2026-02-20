import { useState, useEffect } from 'react'

const BlogPage = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuthor] = useState("")

    const [blogs, setBlogs] = useState([{
        id: 1,
        title: "First Blog",
        description: "This is the first blog post.",
        category: "tech",
        author: "Aakash",
        date: "2024-06-01",
        img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60"
    }])

    useEffect(() => {
        const storedBlogs = localStorage.getItem("blog")
        if (storedBlogs) {
            setBlogs(JSON.parse(storedBlogs))
        }
    }, [])

    const addBlog = () => {
        if (!title || !description) return;

        const newBlog = {
            id: Date.now(),
            title: title,
            description: description,
            category: category,
            author: author,
            date: new Date().toLocaleDateString(),
            img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60"
        }

        const updatedBlogs = [...blogs, newBlog];
        setBlogs(updatedBlogs)
        localStorage.setItem("blog", JSON.stringify(updatedBlogs))

        setTitle("")
        setDescription("")
        setCategory("")
        setAuthor("")
    }

    const deleteBlog = (id) => {
        const updatedBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(updatedBlogs);
        localStorage.setItem("blog", JSON.stringify(updatedBlogs));
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 flex flex-col items-center">
            {/* Header Section - Centered */}
            <div className="space-y-4 border-b border-slate-100 pb-8 text-center w-full">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    Our <span className="text-blue-600">Blog</span>
                </h1>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Share your thoughts and explore stories from our community. Simple, clean, and insightful.
                </p>
            </div>

            {/* Input Form Section - Centered and Fixed Size (400x400) */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-2xl w-[400px] h-[400px] flex flex-col shrink-0 justify-center">
                <h2 className="text-xl font-black text-blue-600 mb-6 text-center uppercase tracking-widest underline decoration-blue-200 underline-offset-8">Create Post</h2>
                <div className="flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
                    <input
                        type="text"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                        value={title}
                        placeholder='Blog Title'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all h-24 resize-none placeholder:text-slate-400"
                        value={description}
                        placeholder='Description'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                            value={category}
                            placeholder='Category'
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <input
                            type="text"
                            className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                            value={author}
                            placeholder='Author'
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className='mt-6 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 text-sm uppercase tracking-wider'
                    onClick={addBlog}
                >
                    PUBLISH
                </button>
            </div>

            {/* Blog Grid Section - Centered Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
                {blogs.map((items) => (
                    <div key={items.id} className="group bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-sm w-full relative">
                        {/* Delete Button */}
                        <button
                            onClick={() => deleteBlog(items.id)}
                            className="absolute top-4 right-4 bg-red-50 text-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all duration-300 z-10"
                            title="Delete Blog"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>

                        {items.img && (
                            <div className="aspect-video mb-6 overflow-hidden rounded-xl">
                                <img src={items.img} alt={items.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        )}
                        <div className="space-y-3">
                            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                                {items.category || 'General'}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                                {items.title}
                            </h3>
                            <p className="text-slate-600 text-sm line-clamp-3">
                                {items.description}
                            </p>
                            <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                                <span className="text-sm font-medium text-slate-500">By {items.author || 'Anonymous'}</span>
                                <span className="text-xs text-slate-400">{items.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BlogPage
