import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "./../config";
import { authContext } from "../context/AuthContext";
import HashLoader from "react-spinners/HashLoader";
import BG from "../assets/images/background_1(2).jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.data.token,
          role: result.data.role,
        },
      });

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (e) {
      toast.error(
        "Login failed — please check your credentials and try again."
      );
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-5 lg:px-0"
      style={{
        backgroundImage: `url("${BG}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* Login Form */}
      <div className="relative w-full max-w-[570px] mx-auto rounded-xl shadow-2xl p-6 md:p-10 bg-white backdrop-blur-sm">
        <h3 className="text-headingColor text-[22px] md:text-3xl font-bold mb-8 text-center">
          Hello! <span className="text-primaryColor">Welcome</span> Back
        </h3>

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Your Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-primaryColor text-headingColor placeholder:text-gray-400 transition-all duration-300"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter Your Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryColor focus:border-primaryColor text-headingColor placeholder:text-gray-400 transition-all duration-300"
          />

          <button
            type="submit"
            className="w-full bg-primaryColor text-white py-3 rounded-lg font-semibold hover:bg-primaryColor/90 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-headingColor">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primaryColor font-medium">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
