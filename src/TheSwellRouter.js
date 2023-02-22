import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import MemberPage from "./pages/MemberPage";
import Survey from "./components/Survey";
import EditUsers from "./components/EditUsers";
import SurveysHistory from "./components/SurveysHistory";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TheSwellRouter = () => {
  const location = useLocation();

  const token = localStorage.usertoken;

  useEffect(() => {
  }, [location]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* All this routes are accessible if the user is connected */}
        {token ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/spot/:id" element={<MemberPage />} />
            <Route path="/survey/spot/:id" element={<Survey />} />
            <Route path="/surveys/:id" element={<SurveysHistory />} />
            <Route path="/edit/:id" element={<EditUsers />} />
          </>
        ) : (
          <Route path='*' element={<Navigate to='/'/>} />
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default TheSwellRouter;
