import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { storedToken } from "../AdminAuth";

const LoginLayout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/admin/login", {
        headers: {
          "Content-Type": "application/json",
        },
        formData,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setLoading(false);
        setError(null);
        navigate("/admin");
      } else {
        setLoading(false);
        setError(res.message);
        return;
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    // Redirect to the admin panel if the user is already authenticated
    if (storedToken()) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="admin-layout__div">
      <div className="max-w-lg p-3 mx-auto lg:w-[50%] w-[100%]">
        <h1 className="text-3xl font-semibold text-center my-7">Admin Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            className="p-3 border rounded-lg"
            id="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            className="p-3 border rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="p-3 border rounded-lg"
            id="password"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginLayout;
