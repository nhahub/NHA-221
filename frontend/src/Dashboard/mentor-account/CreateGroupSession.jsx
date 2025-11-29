import { useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const CreateGroupSession = ({ mentorId }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    mentor: mentorId,
    imageURL: "",
    topic: "",
    description: "",
    startDatetime: "",
    durationMinutes: 0,
    maxParticipants: 0,
    ticketPrice: 0,
    status: "upcoming",
    meetingLink: "",
  });

  // Handle text/number inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));

    try {
      const data = await uploadImageToCloudinary(file);
      setFormData({ ...formData, imageURL: data.url });
    } catch (err) {
      toast.error("Image upload failed. Please try again.");
    }
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/group_sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
    } catch (err) {
      toast.error(
        "creation failed — please verify your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-8 px-2 sm:px-4">
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-lg shadow-xl p-2 sm:p-4 mx-auto">
        <h3 className="text-headingColor md:text-[22px] text-lg leading-9 font-bold mb-4 text-center">
          Create a <span className="text-primaryColor">Group Session</span>
        </h3>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Topic */}
          <div className="mb-0 md:col-span-2">
            <label
              htmlFor="topic"
              className="block text-headingColor font-semibold mb-2"
            >
              Session Topic
            </label>
            <input
              type="text"
              placeholder="Enter Your Topic Name"
              name="topic"
              id="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-0 md:col-span-2">
            <label
              htmlFor="description"
              className="block text-headingColor font-semibold mb-2"
            >
              Session Description
            </label>
            <input
              type="text"
              placeholder="Enter Your Description"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Ticket Price */}
          <div className="mb-0">
            <label
              htmlFor="ticketPrice"
              className="block text-headingColor font-semibold mb-2"
            >
              Ticket Price (in USD)
            </label>
            <input
              type="number"
              placeholder="Enter Ticket Price"
              name="ticketPrice"
              id="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Start Date/Time */}
          <div className="mb-0">
            <label
              htmlFor="startDatetime"
              className="block text-headingColor font-semibold mb-2"
            >
              Session Time
            </label>
            <input
              type="datetime-local"
              name="startDatetime"
              id="startDatetime"
              value={formData.startDatetime}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-0">
            <label
              htmlFor="durationMinutes"
              className="block text-headingColor font-semibold mb-2"
            >
              Session Duration (minutes)
            </label>
            <input
              type="number"
              placeholder="Enter Duration"
              name="durationMinutes"
              id="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Max Participants */}
          <div className="mb-0">
            <label
              htmlFor="maxParticipants"
              className="block text-headingColor font-semibold mb-2"
            >
              Max Participants
            </label>
            <input
              type="number"
              placeholder="Enter Max Participants"
              name="maxParticipants"
              id="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Meeting Link */}
          <div className="mb-0">
            <label
              htmlFor="meetingLink"
              className="block text-headingColor font-semibold mb-2"
            >
              Meeting Link
            </label>
            <input
              type="text"
              placeholder="Enter Meeting Link"
              name="meetingLink"
              id="meetingLink"
              value={formData.meetingLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-solid border-gray-300 focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-0 md:col-span-2">
            <label className="block text-headingColor font-semibold mb-2">
              Session Image
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="relative w-full sm:w-[180px]">
                <input
                  type="file"
                  name="imageURL"
                  id="customFile"
                  onChange={handleFileInputChange}
                  accept=".jpg,.png"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="customFile"
                  className="w-full sm:w-auto block text-center px-4 py-2 bg-[#0066ff46] text-headingColor font-semibold rounded-lg cursor-pointer"
                >
                  Upload Image
                </label>
              </div>

              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-md border"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gray-50 rounded-md border flex items-center justify-center text-sm text-textColor"></div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-3 md:col-span-2">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={25} color="#ffffff" /> : "Create"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateGroupSession;
