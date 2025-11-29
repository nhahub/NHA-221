import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BG from "../assets/images/background_2 (2).jpg";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "./../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "mentee",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const data = await uploadImageToCloudinary(file);
      setPreviewUrl(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (err) {
      console.error("Upload failed:", err.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (e) {
      toast.error(
        "Registration failed — please verify your details and try again."
      );
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: `url('${BG}')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-2xl mt-16 bg-white rounded-lg shadow-xl px-8 py-4 md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-3 text-center">
          Create an <span className="text-primaryColor">account</span>
        </h3>

        <form onSubmit={submitHandler}>
          {/* Name */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-headingColor font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-headingColor font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-headingColor font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Role & Gender */}
          <div className="mb-5 flex flex-col sm:flex-row gap-5 sm:gap-4">
            {/* Role Select */}
            <div className="flex-1">
              <label
                htmlFor="role"
                className="block text-headingColor font-semibold mb-2"
              >
                Role
              </label>
              <select
                name="role"
                id="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-textColor rounded-md appearance-none"
              >
                <option value="mentor">Mentor</option>
                <option value="mentee">Mentee</option>
              </select>
            </div>

            {/* Gender Select */}
            <div className="flex-1">
              <label
                htmlFor="gender"
                className="block text-headingColor font-semibold mb-2"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-textColor rounded-md appearance-none"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="mb-5 flex items-center gap-3">
            {selectedFile && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="profilePic"
                  className="w-full h-full rounded-full object-cover"
                />
              </figure>
            )}

            <div className="relative w-[160px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpg,.png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-[15px] leading-6 bg-[#0066ff46] text-headingColor font-semibold rounded-lg cursor-pointer"
              >
                Upload Profile Img
              </label>
            </div>
          </div>

          {/* Submit (Unchanged) */}
          <div className="mt-7">
            <button
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={25} color="#ffffff" /> : "Sign up"}
            </button>
          </div>

          {/* Login Link (Unchanged) */}
          <p className="mt-5 text-textColor text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primaryColor font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
