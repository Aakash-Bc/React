import { useState } from "react";
import axios from "axios";

function Backend() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "status" ? value === "true" : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.post("http://localhost:8000/blog/create", formData);
            alert("✨ Blog added successfully!");
            setFormData({ title: "", description: "", status: true });
        } catch (error) {
            console.error(error);
            alert("❌ Failed to add blog. Please check your backend connection.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 space-y-12 flex flex-col items-center min-h-[80vh]">
            {/* Header Section */}
            <div className="space-y-4 text-center w-full max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Backend <span className="text-black">Management</span>
                </h1>
                <p className="text-slate-500 text-lg">
                    Manage your content directly with the internal API. Simple, powerful, and efficient.
                </p>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-lg bg-white p-10 rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden group">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -tr-y-1/2 tr-x-1/2 w-32 h-32 bg-slate-50 rounded-full blur-3xl group-hover:bg-slate-100 transition-colors"></div>
                
                <div className="relative z-10">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-black text-black uppercase tracking-widest flex items-center justify-center gap-2">
                            <span className="w-8 h-[2px] bg-black"></span>
                            Create Post
                            <span className="w-8 h-[2px] bg-black"></span>
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-black uppercase tracking-widest px-1">Post Title</label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter a catchy title..."
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-slate-400 text-black font-medium"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-black uppercase tracking-widest px-1">Description</label>
                            <textarea
                                name="description"
                                placeholder="What's on your mind?"
                                rows="4"
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-slate-400 text-black font-medium resize-none shadow-sm"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-black uppercase tracking-widest px-1">Publishing Status</label>
                            <div className="relative">
                                <select 
                                    name="status" 
                                    onChange={handleChange}
                                    value={formData.status.toString()}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all text-black font-medium appearance-none cursor-pointer"
                                >
                                    <option value="true">🟢 Active (true)</option>
                                    <option value="false">🔴 Inactive (false)</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 rounded-2xl font-black text-white text-sm uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-2 ${
                                isLoading 
                                ? 'bg-slate-400 cursor-not-allowed' 
                                : 'bg-black hover:bg-slate-800 shadow-slate-900/20 active:scale-[0.98]'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                "Submit Blog"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Hint Footer */}
            <div className="flex items-center gap-4 text-slate-400 text-sm">
                <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Endpoint
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>API v1.0.4</span>
            </div>
        </div>
    );
}

export default Backend;