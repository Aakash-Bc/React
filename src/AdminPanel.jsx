import { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("manage"); // 'manage' or 'add'
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: true,
    });

    // GET BLOGS
    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("http://localhost:8000/api/blogs");
            setBlogs(res.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "status" ? value === "true" : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (editingId) {
                await axios.put(`http://localhost:8000/api/update/${editingId}`, formData);
                alert("✏️ Blog updated successfully!");
                setEditingId(null);
                setActiveTab("manage");
            } else {
                await axios.post("http://localhost:8000/api/create", formData);
                alert("✨ Blog added successfully!");
            }

            setFormData({ title: "", description: "", status: true });
            fetchBlogs();
        } catch (error) {
            console.error(error);
            alert("❌ Operation failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            await axios.delete(`http://localhost:8000/api/delete/${id}`);
            fetchBlogs();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    const editBlog = (blog) => {
        setEditingId(blog._id);
        setFormData({
            title: blog.title,
            description: blog.description,
            status: blog.status,
        });
        setActiveTab("add"); // Switch to form tab for editing
    };

    const cancelEdit = () => {
        setEditingId(null);
        setFormData({ title: "", description: "", status: true });
        setActiveTab("manage");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-8">
                    <h2 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        ADMIN HUB
                    </h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab("manage")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "manage" ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
                            }`}
                    >
                        <span>📋</span> Manage Blogs
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("add");
                            setEditingId(null);
                            setFormData({ title: "", description: "", status: true });
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "add" && !editingId ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-slate-800"
                            }`}
                    >
                        <span>➕</span> Add New Blog
                    </button>
                </nav>
                <div className="p-4 border-t border-slate-800 text-center">
                    <p className="text-xs text-slate-500">v1.0.4 Premium Admin</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-auto">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800">
                            {activeTab === "manage" ? "Manage Content" : editingId ? "Edit Post" : "Create Post"}
                        </h1>
                        <p className="text-slate-500 mt-2">
                            Welcome back, Admin. Here's what's happening today.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-sm font-semibold text-slate-700">{blogs.length} Active Posts</span>
                        </div>
                    </div>
                </header>

                {activeTab === "manage" ? (
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                        {isLoading && blogs.length === 0 ? (
                            <div className="p-20 text-center">
                                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-slate-500 font-medium">Loading blogs...</p>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Blog Info</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {blogs.map((blog) => (
                                        <tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={blog.img || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=200&auto=format&fit=crop"}
                                                        className="w-16 h-16 rounded-xl object-cover shadow-sm bg-slate-100"
                                                        alt=""
                                                    />
                                                    <div>
                                                        <h3 className="font-bold text-slate-800 line-clamp-1">{blog.title}</h3>
                                                        <p className="text-sm text-slate-500 line-clamp-1">{blog.description}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${blog.status ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"
                                                    }`}>
                                                    {blog.status ? "Active" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => editBlog(blog)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <span>✏️</span>
                                                    </button>
                                                    <button
                                                        onClick={() => deleteBlog(blog._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <span>🗑️</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {blogs.length === 0 && !isLoading && (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-20 text-center text-slate-400 italic">
                                                No blogs found. Start by adding one!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-2xl">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-slate-800">
                                    {editingId ? "Update Content Details" : "New Post Details"}
                                </h2>
                                {editingId && (
                                    <button
                                        onClick={cancelEdit}
                                        className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
                                    >
                                        Cancel Editing
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Enter catchy headline"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="Tell your story..."
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none min-h-[150px]"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Publication Status</label>
                                    <select
                                        name="status"
                                        value={formData.status.toString()}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="true">Published & Active</option>
                                        <option value="false">Save as Draft</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        editingId ? "Update This Post" : "Publish Now"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPanel;
