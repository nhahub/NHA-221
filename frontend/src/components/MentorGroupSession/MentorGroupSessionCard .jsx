import { Link } from "react-router-dom";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import UpdateGroupSession from "../../Dashboard/mentor-account/updateGroupSession";

const MentorGroupSessionCard = ({ groupSession, onDeleted, onUpdated }) => {
  const [open, setOpen] = useState(false);

  const formattedDate = new Date(groupSession.startDatetime).toLocaleString(
    "en-US",
    {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }
  );

  const onDelete = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/group_sessions/${groupSession._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      if (typeof onDeleted === "function") onDeleted(groupSession._id);

      toast.success("Group session deleted successfully");
    } catch (error) {
      toast.error("Failed to delete group session");
    }
  };

  // Status colors
  const statusColors = {
    upcoming: "bg-green-100 text-green-700",
    live: "bg-red-100 text-red-700",
    finished: "bg-gray-200 text-gray-700",
  };

  return (
    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Edit/Delete Buttons */}
      <div className="absolute top-3 left-3 flex gap-2 z-20">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 bg-primaryColor text-white px-3 py-1 rounded-xl font-semibold shadow hover:bg-primaryColor/90 transition"
        >
          <FiEdit3 /> Edit
        </button>
        <UpdateGroupSession
          groupSession={groupSession}
          open={open}
          setOpen={setOpen}
          onUpdated={onUpdated}
        />
        <button
          onClick={onDelete}
          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-xl font-semibold shadow hover:bg-red-600 transition"
        >
          <RiDeleteBin6Line /> Delete
        </button>
      </div>

      {/* Image */}
      <div className="h-48 rounded-t-2xl overflow-hidden relative">
        <img
          src={groupSession.imageURL}
          alt={groupSession.topic}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Status Badge */}
        <div
          className={`absolute bottom-3 right-3 px-3 py-1 rounded-full font-semibold text-sm 
            shadow-md z-20
            ${statusColors[groupSession.status] || "bg-gray-100 text-gray-800"}
          `}
        >
          {groupSession.status.toUpperCase()}
        </div>
      </div>
      <Link
        to={`/Group_Session/${groupSession._id}`}
        className=""
      >
        {/* Content */}
        <div className="p-5 flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-gray-900">
            {groupSession.topic}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {groupSession.description}
          </p>

          <div className="text-gray-500 text-sm flex flex-col gap-1 mt-2">
            <p>🗓️ {formattedDate}</p>
            <p>⏱️ Duration: {groupSession.durationMinutes} mins</p>
            <p>☄️ Status: {groupSession.status}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MentorGroupSessionCard;
