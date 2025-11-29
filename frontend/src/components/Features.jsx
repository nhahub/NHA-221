import { Link } from "react-router-dom";
import featureImg from "../assets/images/feature-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";

const LiveMentorship = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="xl:w-[670px]">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white leading-snug mb-6">
            Learn Anytime, Anywhere <br /> with Live Mentorship
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-5 text-[16px] leading-7">
            Gain real-world knowledge through one-on-one live mentorship
            sessions. Whether you’re upskilling, changing careers, or improving
            your confidence — your mentor is just one click away.
          </p>

          <ul className="pl-5 space-y-2 mb-8">
            <li className="text-gray-700 dark:text-gray-300 text-[16px] leading-7">
              ✅ Connect instantly with verified mentors.
            </li>
            <li className="text-gray-700 dark:text-gray-300 text-[16px] leading-7">
              ✅ Book personalized sessions that fit your schedule.
            </li>
            <li className="text-gray-700 dark:text-gray-300 text-[16px] leading-7">
              ✅ Receive feedback and accelerate your growth with expert
              insights.
            </li>
          </ul>

          <Link to="/mentors">
            <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-200 shadow-md">
              Explore Mentors
            </button>
          </Link>
        </div>

        {/* Right Image & Overlay Card */}
        <div className="relative xl:w-[770px] flex justify-end mt-10 lg:mt-0">
          <img
            src={featureImg}
            alt="Live mentorship feature"
            className="w-3/4 rounded-2xl shadow-xl"
          />

          {/* Floating Live Card */}
          <div className="absolute bottom-[60px] left-0 md:bottom-[100px] md:left-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl shadow-lg w-[180px] md:w-[250px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-[14px] font-[600] text-gray-800 dark:text-gray-200">
                  Tue, 24
                </p>
                <p className="text-[14px] font-[400] text-gray-500 dark:text-gray-400">
                  10:00 AM
                </p>
              </div>
              <span className="w-[34px] h-[34px] flex items-center justify-center bg-yellow-400 rounded-full">
                <img src={videoIcon} alt="Video Icon" className="w-4" />
              </span>
            </div>

            <div className="w-[96px] bg-blue-100 dark:bg-blue-900 py-1 px-2 text-[12px] text-blue-700 dark:text-blue-300 font-[500] mt-4 rounded-full text-center">
              Live Session
            </div>

            <div className="flex items-center gap-3 mt-4">
              <img
                src={avatarIcon}
                alt="Mentor avatar"
                className="w-8 h-8 rounded-full border"
              />
              <h4 className="text-[15px] font-[700] text-gray-800 dark:text-white">
                Sarah Johnson
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveMentorship;
