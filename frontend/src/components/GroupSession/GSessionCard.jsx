import React from "react";
import { Link } from "react-router-dom";

const GSessionCard = ({ session }) => {
  const {
    imageURL,
    topic,
    startDatetime,
    durationMinutes,
    ticketPrice,
    _id,
    status,
  } = session;

  const statusColors = {
    upcoming: "bg-green-100 text-green-700",
    live: "bg-red-100 text-red-700",
    finished: "bg-gray-200 text-gray-700",
  };

  return (
    <Link
      to={`/Group_Session/${_id}`}
      className="block p-4 border rounded-2xl shadow-md hover:shadow-xl transition-all bg-white hover:-translate-y-1"
    >
      {/* Image */}
      <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden mb-4">
        <img
          src={imageURL}
          alt={topic}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Status Badge */}
      <span
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${
          statusColors[status] || "bg-gray-200 text-gray-700"
        }`}
      >
        {status?.toUpperCase()}
      </span>

      {/* Topic */}
      <h2 className="text-xl font-bold mb-1 line-clamp-1">{topic}</h2>

      {/* Date */}
      <p className="text-sm text-gray-600">
        {new Date(startDatetime).toLocaleString()}
      </p>

      {/* Duration */}
      <p className="text-sm text-gray-700 mt-1">
        Duration: {durationMinutes} min
      </p>

    </Link>
  );
};

export default GSessionCard;
