import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section className="bg-gray-50 min-h-screen py-10 mt-16">
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMassage={error} />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left Panel */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center">
              <figure className="w-[120px] h-[120px] rounded-full border-2 border-primaryColor overflow-hidden shadow-sm">
                <img
                  src={userData.photo || "/default-user.png"}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {userData.name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{userData.email}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Specialization:{" "}
                  <span className="text-gray-800 font-semibold">
                    {userData.areaOfExpertise}
                  </span>
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Job Title:{" "}
                  <span className="text-gray-800 font-semibold">
                    {userData.jobTitle}
                  </span>
                </p>
              </div>

              <div className="mt-8 w-full flex flex-col gap-3">
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 py-3 px-4 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-all shadow-sm"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Right Panel */}
            <div className="md:col-span-2">
              <div className="relative flex border-b border-gray-200 select-none">
                {/* Sliding gradient underline */}
                <span
                  className={`absolute bottom-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded transition-all duration-500 ease-in-out`}
                  style={{
                    left: tab === "bookings" ? "0%" : "50%",
                    width: "50%",
                  }}
                />

                <button
                  onClick={() => setTab("bookings")}
                  className={`flex-1 text-center py-3 font-semibold transition transform duration-300 ease-out ${
                    tab === "bookings"
                      ? "text-primaryColor scale-105"
                      : "text-gray-600 hover:text-primaryColor hover:scale-105"
                  }`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`flex-1 text-center py-3 font-semibold transition transform duration-300 ease-out ${
                    tab === "settings"
                      ? "text-primaryColor scale-105"
                      : "text-gray-600 hover:text-primaryColor hover:scale-105"
                  }`}
                >
                  Profile Settings
                </button>
              </div>

              <div className="mt-6 bg-white rounded-2xl py-6 px-2 shadow-md">
                {tab === "bookings" && <MyBookings />}
                {tab === "settings" && <Profile user={userData} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
