import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/posts/createPost", formData);
      const data = res.data;
      if (data.success === false) {
        setError(data.message);
      }
      setMessage("Post Created!");
      setTimeout(() => {
        navigate("/posts");
    }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="flex flex-col mt-20 items-center">
      <p className="text-3xl">Now create your posts!</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border rounded max-w-96 m-10 p-10 items-center gap-5 bg-slate-200"
      >
        <input
          className="border max-w-40 p-2 rounded"
          type="text"
          placeholder="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <textarea
          className="border max-w-40 p-2 rounded"
          type="textarea"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <button className="bg-slate-500 text-white p-2 rounded">CREATE</button>
      </form>
      <span onClick={()=>navigate("/posts")} className="bg-sky-800 text-white p-2 rounded cursor-pointer">Don't want to create!</span>
      {error && !message && (
        <p className="text-white bg-red-700 rounded pt-2 m-10">{error}</p>
      )}
      {message && (
        <p className="text-white bg-green-700 rounded p-2 mt-10">{message}</p>
      )}
    </div>
  );
}
