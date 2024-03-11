import SignUp from "./pages/signUp.jsx";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePost from "./pages/createPost.jsx";
import Posts from "./pages/posts.jsx";
import SignIn from "./pages/signIn.jsx";

axios.defaults.baseURL = "http://localhost:3000/api/";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
