import { useState, useEffect } from "react";
import axios from "axios";

function Backend() {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: true
  });

  // GET BLOGS
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/category/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "status" ? value === "true" : value
    });
  };

  // CREATE OR UPDATE BLOG
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingId) {
        // Update existing blog
        await axios.put(
          `http://localhost:8000/api/category/update/${editingId}`,
          formData
        );
        alert("✏️ Blog updated successfully!");
        setEditingId(null);
      } else {
        // Create new blog
        await axios.post(
          "http://localhost:8000/api/category/create",
          formData
        );
        alert("✨ Blog added successfully!");
      }

      setFormData({ title: "", description: "", status: true });
      fetchBlogs(); // refresh list
    } catch (error) {
      console.error(error);
      alert("❌ Operation failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE BLOG
  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/category/delete/${id}`);
      fetchBlogs();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT BLOG
  const editBlog = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title,
      description: blog.description,
      status: blog.status
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top when editing
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", description: "", status: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-12 flex flex-col items-center min-h-[80vh]">

      {/* Header */}
      <div className="space-y-4 text-center w-full max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Backend <span className="text-black">Management</span>
        </h1>
        <p className="text-slate-500 text-lg">
          Manage your content directly with the internal API.
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-lg bg-white p-10 rounded-3xl border border-slate-200 shadow-2xl">
        <h2 className="text-2xl font-black text-center mb-6">
          {editingId ? "Update Post" : "Create Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            name="title"
            placeholder="Enter title"
            className="w-full px-5 py-3 border rounded-xl"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Enter description"
            className="w-full px-5 py-3 border rounded-xl"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={formData.status.toString()}
            onChange={handleChange}
            className="w-full px-5 py-3 border rounded-xl"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl"
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : editingId
              ? "Update Blog"
              : "Submit Blog"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="w-full py-2 mt-2 bg-gray-400 text-white rounded-xl"
            >
              Cancel Edit
            </button>
          )}

        </form>
      </div>

      {/* Blog List */}
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-8">Published Blogs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-2xl border shadow-lg"
            >
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-gray-600 mt-2">{blog.description}</p>

              <div className="flex justify-between items-center mt-4">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full ${
                    blog.status
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {blog.status ? "Active" : "Inactive"}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => editBlog(blog)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Backend;