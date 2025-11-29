import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const ServiceCard = ({ item, index }) => {
  const { name, desc, bgColor, textColor, image } = item;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundColor: bgColor }}
        ></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between h-[260px]">
        <div>
          <h2 className="text-[22px] lg:text-[24px] font-extrabold text-gray-800 dark:text-white mb-3">
            {name}
          </h2>
          <p className="text-[15px] leading-7 text-gray-600 dark:text-gray-300">
            {desc}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <Link
            to="/mentors"
            className="w-11 h-11 rounded-full border border-gray-300 text-gray-600 
            dark:border-gray-600 dark:text-gray-300 flex items-center justify-center 
            hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all duration-200"
          >
            <BsArrowRight className="w-6 h-6" />
          </Link>

          <span
            className="w-11 h-11 flex items-center justify-center text-[18px] font-bold rounded-full shadow-inner"
            style={{
              background: bgColor,
              color: textColor,
            }}
          >
            {index + 1}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
