import { useState } from "react";
import { useParams } from "react-router-dom";
import starIcon from "../../assets/images/Star.png";
import MentorAbout from "./MentorAbout";
import Feedback from "./Feedback";
import SidePanel from "../../components/SidePanel.jsx";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";

const MentorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();

  const {
    data: mentor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/mentors/${id}`);

  const {
    name = "",
    qualifications = [],
    experiences = [],
    timeSlots = [],
    reviews = [],
    bio = "",
    about = "",
    averageRating = 0,
    totalRating = 0,
    areaOfExpertise = "",
    jobTitle = "",
    hourlyFee = 0,
    links = [],
    location = "",
    photo = "",
    _id,
  } = mentor || {};

  return (
    <section className="py-16 bg-gradient-to-b from-[#f9fafb] to-[#eef2f7] min-h-screen mt-20">
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left side */}
            <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <figure className="relative w-[180px] h-[180px] rounded-full overflow-hidden shadow-xl border">
                  <img
                    src={photo}
                    alt={name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </figure>

                <div className="flex flex-col text-center sm:text-left">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-2">
                    <span className="bg-[#E0F7FA] py-1 px-5 text-[14px] font-semibold rounded-full">
                      {areaOfExpertise}
                    </span>
                    <span className="bg-[#E0F7FA] py-1 px-5 text-[14px] font-semibold rounded-full">
                      {jobTitle}
                    </span>
                  </div>

                  <h3 className="text-headingColor text-[30px] font-extrabold">
                    {name}{" "}
                    {location && (
                      <span className="text-[15px] text-gray-500">
                        /{location}
                      </span>
                    )}
                  </h3>

                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                    <span className="flex items-center gap-1 text-[16px] font-semibold text-headingColor">
                      <img src={starIcon} alt="rating" className="w-5 h-5" />
                      {(averageRating ?? 0).toFixed(2)}
                    </span>
                    <span className="text-[14px] text-gray-500">
                      ({totalRating})
                    </span>
                  </div>

                  <p className="text-[15px] text-gray-600 mt-3">{bio}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="my-10 border-t border-gray-200" />

              <div className="flex gap-8 border-b border-gray-200">
                <button
                  onClick={() => setTab("about")}
                  className={`py-3 text-[17px] font-semibold ${
                    tab === "about" ? "text-primaryColor" : "text-headingColor"
                  }`}
                >
                  About
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={`py-3 text-[17px] font-semibold ${
                    tab === "feedback"
                      ? "text-primaryColor"
                      : "text-headingColor"
                  }`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-10">
                {tab === "about" && (
                  <MentorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                    links={links}
                  />
                )}

                {tab === "feedback" && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="self-start sticky top-10">
              <SidePanel
                mentorId={_id}
                hourlyFee={hourlyFee}
                timeSlots={timeSlots}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MentorDetails;
