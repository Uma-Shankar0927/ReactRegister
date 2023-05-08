import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ formdata, setFormData }) => {
  const navigate = useNavigate();
  const navigaTion = () => {
    setFormData({
      name: "",
      gender: "",
      avatar: "",
      course: "",
      email: "",
      language: "",
      resume: "",
      terms: false,
    });
    navigate('/');
  };
  return (
    <div className="navbar">
      <h2 onClick={navigaTion}>CourseHero</h2>
    </div>
  );
};

export default Navbar;
