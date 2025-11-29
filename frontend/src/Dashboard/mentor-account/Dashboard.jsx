import { useState } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";
import starIcon from "../../assets/images/Star.png";
import MentorAbout from "../../pages/Mentors/MentorAbout";
import Profile from "./Profile";
import DefaultMentor from "../../assets/images/feature-img.png";
import Appointment from "./Appointments";
import MyGroupSession from "./MentorGroupSessions";
import CreateGroupSession from "./CreateGroupSession";
const Dashboard = () => {
  const {
    data: mentorData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/mentors/profile/me`);
  const [tab, setTab] = useState("overview");

  const normalizeLink = (item) => {
    if (!item) return null;
    let raw = "",
      name = "";

    if (typeof item === "string") {
      raw = item.trim();
      name = raw;
    } else if (typeof item === "object") {
      raw = (item.link || item.url || "").toString().trim();
      name = (item.name || raw).toString();
    }

    if (!raw) return null;

    const href =
      raw.startsWith("http://") || raw.startsWith("https://")
        ? raw
        : `https://${raw}`;

    const label =
      (name && name.replace(/^https?:\/\//, "")) ||
      href.replace(/^https?:\/\//, "").replace(/\/$/, "");

    return { href, label };
  };

  return (
    <section className="mt-20 py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 min-h-screen transition-colors duration-700">
      <div className="max-w-[1300px] mx-auto px-5">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-14">
            {/* Sidebar Tabs */}
            <aside className="w-full bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-lg rounded-3xl p-4 sm:p-6 lg:sticky lg:top-24 h-fit transition-all duration-500 hover:shadow-2xl">
              <Tabs tab={tab} setTab={setTab} />
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Approval Alert */}
              {mentorData?.isApproved === "pending" && (
                <div className="flex items-start p-4 mb-6 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-md text-yellow-800 dark:bg-yellow-900/40 dark:border-yellow-800 dark:text-yellow-300">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 mt-1 text-yellow-500 dark:text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm0 9a1 1 0 100-2v-3a1 1 0 00-1-1H9a1 1 0 100 2v3a1 1 0 001 1h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-3 text-sm font-medium leading-relaxed">
                    Your profile is under review. You’ll be notified once
                    approved.
                  </span>
                </div>
              )}

              {/* Overview Tab */}
              {tab === "overview" && (
                <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-2 sm:p-4 md:p-6 transition-all duration-500 hover:shadow-2xl py-6">
                  {/* Mentor Header */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                    <figure className="w-36 h-36 sm:w-[160px] sm:h-[160px] rounded-3xl overflow-hidden shadow-lg ring-2 ring-indigo-400/50">
                      <img
                        src={mentorData?.photo || DefaultMentor}
                        alt={mentorData?.name || "Mentor photo"}
                        className="w-full h-full object-cover"
                      />
                    </figure>

                    <div className="text-center sm:text-left flex-1">
                      <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-300 py-1 px-4 rounded-full text-sm font-semibold mb-2 shadow-sm">
                        {mentorData?.areaOfExpertise || "Not Specified"}
                      </span>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {mentorData?.name}{" "}
                        <span className="font-mono text-sm text-gray-400">
                          /{mentorData?.location}
                        </span>
                      </h3>

                      {mentorData?.jobTitle && (
                        <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                          {mentorData.jobTitle}
                        </p>
                      )}

                      <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                        <span className="flex items-center gap-1 text-gray-700 dark:text-gray-200 font-semibold">
                          <img
                            src={starIcon}
                            alt="rating star"
                            className="w-5 h-5"
                          />
                          {mentorData?.averageRating?.toFixed(2) ?? "0.00"}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          ({mentorData?.totalRating || 0})
                        </span>
                      </div>

                      {mentorData?.areaOfExpertise && (
                        <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm md:text-base">
                          <strong>Area of Expertise:</strong>{" "}
                          {mentorData.areaOfExpertise}
                        </p>
                      )}

                      <p className="text-gray-600 dark:text-gray-300 mt-3 leading-relaxed text-sm md:text-base max-w-full sm:max-w-md">
                        {mentorData?.bio || "Mentor bio not provided."}
                      </p>
                    </div>
                  </div>
                  {/* Links Section */}
                  {Array.isArray(mentorData?.links) &&
                    mentorData.links.filter(Boolean).length > 0 && (
                      <div className="mt-10 bg-gray-50 dark:bg-gray-800/60 p-6 rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                          Links
                        </h4>
                        <ul className="space-y-3">
                          {mentorData.links
                            .filter(Boolean)
                            .map((rawItem, index) => {
                              const normalized = normalizeLink(rawItem);
                              if (!normalized) return null;
                              return (
                                <li key={index}>
                                  <a
                                    href={normalized.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium underline-offset-2 hover:underline transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm "
                                  >
                                    {normalized.label}
                                  </a>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    )}

                  {/* About Section */}
                  <MentorAbout
                    name={mentorData?.name}
                    about={mentorData?.about}
                    qualifications={mentorData?.qualifications}
                    experiences={mentorData?.experiences}
                  />
                </div>
              )}

              {/* Appointments Tab */}
              {tab === "appointments" && (
                <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-2 sm:p-4 md:p-6 transition-all duration-500 hover:shadow-2xl">
                  <Appointment appointments={mentorData?.appointments || []} />
                </div>
              )}

              {/* Settings Tab */}
              {tab === "settings" && (
                <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-2 sm:p-4 md:p-6 transition-all duration-500 hover:shadow-2xl">
                  <Profile mentorData={mentorData} />
                </div>
              )}

              {/* mentorGroupSessions Tab */}
              {tab === "mentorGroupSessions" && (
                <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-2 sm:p-4 md:p-6 transition-all duration-500 hover:shadow-2xl">
                  <MyGroupSession />
                </div>
              )}

              {/* CreateGroupSession Tab */}
              {tab === "CreateGroupSession" && (
                <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-2 sm:p-4 md:p-6 transition-all duration-500 hover:shadow-2xl">
                  <CreateGroupSession mentorId={mentorData?._id} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
