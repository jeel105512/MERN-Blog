import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import VarifyJWTToken from "./pages/VarifyJWTToken.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signInFailure, signInSuccess } from "./redux/user/userSlice.js";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch("/api/auth/varify-JWT-Token", {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

          const data = await response.json();

          if (data.success) {
            dispatch(signInSuccess(data.user));
          } else {
            dispatch(signInFailure(data.message));
          }
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }
    init();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/VarifyJWTToken" element={<VarifyJWTToken />} />
      </Routes>
      <Footer />
    </Router>
  )
}