import React, { useState } from "react";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const blogs = [
    {
      id: 1,
      title: "Getting Started with React",
      author: "Aakash",
      category: "Programming",
      date: "2026-06-10",
      description:
        "Learn the fundamentals of React and build modern user interfaces."
    },
    {
      id: 2,
      title: "Top 10 JavaScript Tips",
      author: "John Doe",
      category: "JavaScript",
      date: "2026-06-12",
      description:
        "Useful JavaScript tricks and best practices for developers."
    },
    {
      id: 3,
      title: "Introduction to MERN Stack",
      author: "Admin",
      category: "Programming",
      date: "2026-06-15",
      description:
        "Understand how MongoDB, Express, React, and Node.js work together."
    },
    {
      id: 4,
      title: "CSS Flexbox Guide",
      author: "Jane Smith",
      category: "CSS",
      date: "2026-06-16",
      description:
        "Master Flexbox layout and create responsive designs easily."
    }
  ];

  const filteredBlogs = blogs.filter((blog) => {
    return (
      (category === "All" || blog.category === category) &&
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">My Blog</h1>

      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Programming</option>
            <option>JavaScript</option>
            <option>CSS</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div className="col-md-6 mb-4" key={blog.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h3>{blog.title}</h3>
                  <p className="text-muted">
                    By {blog.author} | {blog.date}
                  </p>
                  <span className="badge bg-primary mb-2">
                    {blog.category}
                  </span>
                  <p>{blog.description}</p>

                  <button className="btn btn-outline-primary">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center">No blogs found.</h4>
        )}
      </div>
    </div>
  );
};

export default Blog;