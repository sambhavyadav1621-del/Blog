import { useContext, useState, useEffect } from "react";
import { BlogContext } from "../Context/BlogContext";
import { useNavigate, useParams } from "react-router-dom";

function CreateBlog({ editMode }) {
  const { blogs, setBlogs } = useContext(BlogContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (editMode) {
      const blog = blogs.find(b => b.id === Number(id));
      if (blog) {
        setTitle(blog.title);
        setContent(blog.content);
        setAuthor(blog.author);
      }
    }
  }, [editMode, id, blogs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      const updatedBlogs = blogs.map(blog =>
        blog.id === Number(id)
          ? { ...blog, title, content, author }
          : blog
      );
      setBlogs(updatedBlogs);
    } else {
      setBlogs([...blogs, {
        id: Date.now(),
        title,
        content,
        author,
      }]);
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editMode ? "Edit Blog" : "Create Blog"}</h2>

      <input
        required
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        required
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        required
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button type="submit">
        {editMode ? "Update Blog" : "Add Blog"}
      </button>
    </form>
  );
}

export default CreateBlog;
