import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Backend() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // GET BLOGS
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/blogs");
      // Only show active blogs
      setBlogs(res.data.filter(blog => blog.status === true));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12 flex flex-col items-center min-h-[80vh]">

      {/* Header */}
      <div className="space-y-4 text-center w-full max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Backend <span className="text-blue-600">Blogs</span>
        </h1>
        <p className="text-slate-500 text-lg">
          Explore the latest stories and updates from our internal team.
        </p>
      </div>

      {/* Blog List - Grid View ONLY */}
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="bg-white p-6 rounded-2xl border shadow-lg cursor-pointer h-[450px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
            >
              <div className="overflow-hidden rounded-xl mb-4">
                <img
                  src="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
                  alt=""
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900 transition-all line-clamp-1 group-hover:text-blue-600">
                {blog.title}
              </h3>

              <p className="text-gray-600 mt-2 flex-1 line-clamp-4 leading-relaxed">
                {blog.description}
              </p>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-50">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Published Reader View
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:mr-2 transition-all">
                  Read Full Story →
                </span>
              </div>
            </div>
          ))}

          {blogs.length === 0 && (
            <div className="col-span-3 text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Awaiting first system initialization</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

export default Backend;