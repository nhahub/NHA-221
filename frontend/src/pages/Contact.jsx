import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/send-email`, formData);
      if (response.status === 200) {
        toast.success("Email sent successfully.");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (err) {
      toast.error("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 mt-20">
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="text-3xl font-bold text-center text-headingColor mb-4">
          Contact Us
        </h2>
        <p className="mb-12 text-center text-gray-600 text-lg font-light">
          Have a technical question, feedback, or want to connect with a mentor?
          Fill out the form and we will get back to you promptly.
        </p>

        <div className="bg-white shadow-lg rounded-3xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-700"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder="example@gmail.com"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryColor focus:border-primaryColor transition-all duration-300"
              />
            </div>

            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 font-medium text-gray-700"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                placeholder="Let us know how we can help you"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryColor focus:border-primaryColor transition-all duration-300"
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block mb-2 font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                placeholder="Leave a comment..."
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryColor focus:border-primaryColor transition-all duration-300"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-primaryColor text-white px-8 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:bg-primaryColor/90 transform hover:scale-105 transition-all duration-300 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
