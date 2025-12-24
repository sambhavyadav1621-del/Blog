import { useContext, useState } from "react";
import { BlogContext } from "../Context/BlogContext";
import { Link } from "react-router-dom";

function Home() {
  const { blogs, setBlogs } = useContext(BlogContext);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Delete this blog?")) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase()) ||
    blog.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <input
        placeholder="Search by title or author"
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredBlogs.length === 0 && <p>No blogs found</p>}

      {filteredBlogs.map(blog => (
        <div key={blog.id} className="card">
          <h3>{blog.title}</h3>
          <p><b>Author:</b> {blog.author}</p>
          <p>{blog.content.substring(0, 100)}...</p>

          <Link to={`/blog/${blog.id}`}>Read</Link>{" | "}
          <Link to={`/edit/${blog.id}`}>Edit</Link>{" | "}
          <button onClick={() => handleDelete(blog.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
