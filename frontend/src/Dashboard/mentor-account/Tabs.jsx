import React, { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const tabClasses = (isActive) =>
    `w-full text-left py-3 px-4 rounded-lg mb-2 transition-all duration-200 font-medium ${
      isActive
        ? "bg-indigo-100 text-indigo-700 shadow-md"
        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
    }`;

  return (
    <div>
      {/* Mobile Menu Icon */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="lg:hidden"
      >
        <BiMenu className="w-7 h-7 text-gray-700 dark:text-gray-200 cursor-pointer" />
      </button>

      {/* Mobile Menu Panel */}
      {open && (
        <nav
          className="lg:hidden mt-3 space-y-2 p-4 bg-white dark:bg-gray-900 shadow-lg rounded-xl w-full"
          aria-label="Dashboard menu"
        >
          <button
            onClick={() => {
              setTab("overview");
              setOpen(false);
            }}
            className={tabClasses(tab === "overview")}
            aria-current={tab === "overview" ? "page" : undefined}
          >
            Overview
          </button>

          <button
            onClick={() => {
              setTab("appointments");
              setOpen(false);
            }}
            className={tabClasses(tab === "appointments")}
            aria-current={tab === "appointments" ? "page" : undefined}
          >
            Appointments
          </button>

          <button
            onClick={() => {
              setTab("settings");
              setOpen(false);
            }}
            className={tabClasses(tab === "settings")}
            aria-current={tab === "settings" ? "page" : undefined}
          >
            Profile
          </button>

          <button
            onClick={() => {
              setTab("mentorGroupSessions");
              setOpen(false);
            }}
            className={tabClasses(tab === "mentorGroupSessions")}
            aria-current={tab === "mentorGroupSessions" ? "page" : undefined}
          >
            Mentor Group Sessions
          </button>

          <button
            onClick={() => {
              setTab("CreateGroupSession");
              setOpen(false);
            }}
            className={tabClasses(tab === "CreateGroupSession")}
            aria-current={tab === "CreateGroupSession" ? "page" : undefined}
          >
            Create Group Session
          </button>

          <button
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            className="w-full mt-2 py-3 px-4 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-all shadow-sm"
          >
            Logout
          </button>
        </nav>
      )}

      {/* Desktop Tabs */}
      <div
        className="hidden lg:flex flex-col p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl w-full"
        role="navigation"
        aria-label="Dashboard tabs"
      >
        <button
          onClick={() => setTab("overview")}
          className={tabClasses(tab === "overview")}
        >
          Overview
        </button>

        <button
          onClick={() => setTab("appointments")}
          className={tabClasses(tab === "appointments")}
        >
          Appointments
        </button>

        <button
          onClick={() => setTab("settings")}
          className={tabClasses(tab === "settings")}
        >
          Profile
        </button>

        <button
          onClick={() => setTab("mentorGroupSessions")}
          className={tabClasses(tab === "mentorGroupSessions")}
        >
          Mentor Group Sessions
        </button>

        <button
          onClick={() => setTab("CreateGroupSession")}
          className={tabClasses(tab === "CreateGroupSession")}
        >
          Create Group Session
        </button>

        <button
          onClick={handleLogout}
          className="w-full mt-4 py-3 px-4 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-200 transition-all shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Tabs;
