import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Profile = ({ user }) => {
  const areaOfExpertiseOptions = [
    "Not Specified",
    "Software Engineering",
    "Marketing",
    "Design",
    "Finance",
    "Product Management",
    "Human Resources",
  ];
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: null,
    gender: "",
    jobTitle: "",
    areaOfExpertise: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        photo: user.photo || "",
        gender: user.gender || "",
        jobTitle: user.jobTitle || "",
        areaOfExpertise: user.areaOfExpertise || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    try {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(data.url);
      setFormData((prev) => ({ ...prev, photo: data.url }));
    } catch (err) {
      console.error("Upload failed:", err.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) throw new Error(message);

      toast.success(message);
      navigate("/users/profile/me");
    } catch (e) {
      toast.error("Update failed — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-100"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Edit Profile
      </h2>

      {/* Name */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-300 rounded-xl text-gray-800 text-[16px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-300 rounded-xl text-gray-600 text-[16px] bg-gray-100 cursor-not-allowed placeholder-gray-400"
          readOnly
          aria-readonly
        />
      </div>

      {/* Specialization */}
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2 text-[15px]">
          Specialization
        </label>
        <select
          name="areaOfExpertise"
          value={formData.areaOfExpertise}
          onChange={handleInputChange}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-300 rounded-xl text-gray-800 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
        >
          {areaOfExpertiseOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Job Title */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Job Title"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-300 rounded-xl text-gray-800 text-[16px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
          required
        />
      </div>

      {/* Gender */}
      <div className="mb-5">
        <label className="block text-gray-700 font-semibold mb-2 text-[15px]">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full px-4 sm:px-5 py-3 sm:py-4 border border-gray-300 rounded-xl text-gray-800 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Avatar Upload */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        {formData.photo && (
          <figure className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-primaryColor shadow-sm flex-shrink-0">
            <img
              src={formData.photo}
              alt="profilePic"
              className="w-full h-full object-cover"
            />
          </figure>
        )}

        <div className="relative w-full sm:w-[200px] h-[50px]">
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
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center border-2 border-primaryColor rounded-xl text-primaryColor font-semibold bg-white hover:bg-primaryColor hover:text-white transition-colors duration-300 cursor-pointer text-sm sm:text-base"
          >
            {selectedFile ? selectedFile.name : "Upload Photo"}
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className="w-full bg-primaryColor text-white text-[18px] sm:text-lg font-semibold rounded-xl py-3 sm:py-4 hover:bg-blue-700 transition-colors duration-300 disabled:opacity-70 flex justify-center items-center"
      >
        {loading ? <HashLoader size={25} color="#ffffff" /> : "Update Profile"}
      </button>
    </form>
  );

};

export default Profile;
