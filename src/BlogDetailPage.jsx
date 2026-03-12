import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/blogs`);
                // Finding the specific blog since standard local APIs often return arrays
                const foundBlog = res.data.find(b => b._id === id);
                setBlog(foundBlog);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching blog:", err);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-800">Blog not found</h2>
                <Link to="/backend" className="text-blue-600 underline mt-4 inline-block">Go Back</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-16">
            <Link to="/backend" className="mb-8 inline-flex items-center gap-2 text-slate-500 hover:text-black font-semibold transition-all">
                ← Back to Management
            </Link>

            <div className="space-y-8">
                <img
                    src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                    alt={blog.title}
                    className="w-full h-[400px] object-cover rounded-[3rem] shadow-2xl"
                />

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${blog.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                            {blog.status ? "Active" : "Inactive"}
                        </span>
                        <span className="text-slate-400 font-bold text-sm">Published Content</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                        {blog.title}
                    </h1>
                </div>

                <div className="prose prose-lg max-w-none">
                    <p className="text-xl text-slate-600 leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
                        {blog.description}
                    </p>
                </div>

                <div className="pt-12 border-t border-slate-100">
                    <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 italic text-slate-500">
                        "This content is managed through the internal backend system. All updates are synchronized with the live production database."
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
