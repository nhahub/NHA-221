import React from "react";
import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const MentorCard = ({ mentor }) => {
  const {
    _id,
    name,
    averageRating,
    totalRating,
    photo,
    experiences,
    areaOfExpertise,
    jobTitle,
    bio,
    location,
  } = mentor;

  return (
    <div className="p-4 lg:p-6 rounded-2xl bg-white shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
      {/* Mentor Image */}
      <div className="w-full h-[280px] md:h-[320px] overflow-hidden rounded-xl relative group bg-gray-50">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </div>

      {/* Mentor Name */}
      <h2 className="mt-4 lg:mt-5 text-[20px] lg:text-[24px] font-bold text-headingColor tracking-tight hover:text-primaryColor transition-colors duration-200 truncate">
        {name} <span className="font-mono text-sm text-gray-400">/{location}</span>
      </h2>

      <div className="flex justify-between items-center">
        {/* Area of Expertise */}
        {areaOfExpertise && (
          <p className="text-[14px] text-gray-500 italic mt-1">
            {areaOfExpertise}
          </p>
        )}

        {/* Job Title */}
        {jobTitle && (
          <p className="text-[15px] text-primaryColor font-medium mt-1">
            {jobTitle}
          </p>
        )}
      </div>

      {/* Bio */}
      {bio && (
        <p className="text-[14px] text-gray-600 mt-2 line-clamp-2 leading-relaxed">
          {bio}
        </p>
      )}

      {/* Rating */}
      <div className="mt-3 lg:mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[15px] font-semibold text-headingColor">
            <img src={starIcon} alt="star" className="w-4 h-4" />{" "}
            {(averageRating ?? 0).toFixed(2)}
          </span>
          <span className="text-[13px] text-gray-500 font-medium">
            ({totalRating || 0})
          </span>
        </div>
      </div>

      {/* Experience and Link */}
      <div className=" flex items-center justify-between border-t border-gray-100 pt-4">
        <p className="text-[14px] text-gray-600">
          Work at{" "}
          <span className="font-medium text-headingColor">
            {experiences && experiences[0]?.company}
          </span>
        </p>

        <Link
          to={`/mentors/${_id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-transparent transition-all duration-300"
        >
          <BsArrowRight className="w-5 h-5 text-[#181A1E] group-hover:text-white transition-colors duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default MentorCard;
