import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(10);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("/posts/getPosts", {
          withCredentials: true,
        });
        setPosts(res.data);
      } catch (error) {
        setError(error);
      }
    };

    getPosts();
  }, []);

  const handleShowMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 10);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-white text-xl border p-2 rounded bg-green-500">
        I'm happy, you visited my posts!
      </h1>
      {posts.length > 0 && (
        <div>
          <ul className="flex flex-wrap">
            {posts.slice(0, visiblePosts).map((post) => (
              <div key={post._id}>
                <li className="rounded-lg flex flex-col border p-2 m-8">
                  <span className="font-semibold">{post.title}</span>
                  <p>{post.description}</p>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}
      {visiblePosts < posts.length && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
      {error && (
        <p className="text-red-700 text-center mt-10">{error.message}</p>
      )}
    </div>
  );
};

export default Posts;
