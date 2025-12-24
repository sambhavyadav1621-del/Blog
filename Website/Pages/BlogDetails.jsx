import { useParams } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../Context/BlogContext";

function BlogDetails() {
  const { id } = useParams();
  const { blogs } = useContext(BlogContext);

  const blog = blogs.find(b => b.id === Number(id));

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="container">
      <h2>{blog.title}</h2>
      <p><b>Author:</b> {blog.author}</p>
      <p>{blog.content}</p>
    </div>
  );
}

export default BlogDetails;
