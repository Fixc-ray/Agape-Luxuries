// Blogs.jsx

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../Components/firebase";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const navigate = useNavigate();

  // FETCH BLOGS
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // CATEGORIES
  const categories = [
    "All",
    ...new Set(
      blogs.map((blog) => blog.category || "General")
    ),
  ];

  // FILTERED BLOGS
  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.category === selectedCategory
        );

  // FEATURED BLOG
  const featuredBlog = filteredBlogs[0];

  // REMAINING BLOGS
  const remainingBlogs = filteredBlogs.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f2] min-h-screen pt-28 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#10252b]">
            Blog & Articles
          </h1>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex gap-3 flex-wrap mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                px-4 py-2 rounded-full
                text-sm transition-all
                ${
                  selectedCategory === category
                    ? "bg-[#0f2b33] text-white"
                    : "bg-white border border-gray-200 text-gray-500 hover:border-black"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FEATURED BLOG */}
        {featuredBlog && (
          <div
            onClick={() =>
              navigate(`/blog/${featuredBlog.id}`)
            }
            className="
              grid lg:grid-cols-2 gap-6
              bg-white rounded-[30px]
              overflow-hidden
              mb-16 cursor-pointer
              border border-gray-200
              hover:shadow-xl transition
            "
          >
            {/* IMAGE */}
            <div className="h-[300px] md:h-[420px] overflow-hidden">
              <img
                src={
                  featuredBlog.imageUrl ||
                  "/placeholder.png"
                }
                alt={featuredBlog.title}
                className="
                  w-full h-full object-cover
                  hover:scale-105 transition duration-700
                "
              />
            </div>

            {/* CONTENT */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {/* CATEGORY */}
              <span
                className="
                  w-fit text-xs
                  bg-[#f4f4f2]
                  text-gray-500
                  px-3 py-2 rounded-full
                  mb-5
                "
              >
                {featuredBlog.category ||
                  "Business"}
              </span>

              {/* TITLE */}
              <h2
                className="
                  text-3xl md:text-5xl
                  font-semibold text-[#10252b]
                  leading-tight mb-5
                "
              >
                {featuredBlog.title}
              </h2>

              {/* DESCRIPTION */}
              <p
                className="
                  text-gray-500 leading-relaxed
                  text-sm md:text-base
                  mb-8 line-clamp-4
                "
              >
                {featuredBlog.description}
              </p>

              {/* BUTTON */}
              <button
                className="
                  w-fit bg-[#0f2b33]
                  text-white
                  px-6 py-3 rounded-full
                  flex items-center gap-2
                  hover:opacity-90 transition
                "
              >
                Read More
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SECTION TITLE */}
        <div className="mb-10">
          <p className="text-sm text-gray-400 mb-2">
            Blog and articles
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-[#10252b]">
            Latest insights and trends
          </h2>
        </div>

        {/* BLOG GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {remainingBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() =>
                navigate(`/blog/${blog.id}`)
              }
              className="
                cursor-pointer
                group
              "
            >
              {/* IMAGE */}
              <div
                className="
                  rounded-[24px]
                  overflow-hidden
                  bg-white
                  mb-4
                  h-[250px]
                "
              >
                <img
                  src={
                    blog.imageUrl ||
                    "/placeholder.png"
                  }
                  alt={blog.title}
                  className="
                    w-full h-full object-cover
                    group-hover:scale-105
                    transition duration-700
                  "
                />
              </div>

              {/* CATEGORY */}
              <span className="text-xs text-gray-400">
                {blog.category || "Business"}
              </span>

              {/* TITLE */}
              <h3
                className="
                  text-lg font-semibold
                  text-[#10252b]
                  mt-2 mb-3
                  leading-snug
                  group-hover:underline
                "
              >
                {blog.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  text-sm text-gray-500
                  leading-relaxed line-clamp-3
                "
              >
                {blog.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}