import { formateDate } from "../../utils/formateDate";
import { Link } from "react-router-dom";

const MentorAbout = ({ name, about, qualifications, experiences, links }) => {
  return (
    <div className="space-y-12">
      {/* ---------- About Section ---------- */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
        <h3 className="text-[22px] font-semibold text-headingColor flex items-center gap-2">
          About <span className="text-irisBlueColor font-bold">{name}</span>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-gray-600">
          {about}
        </p>
      </div>

      {/* ---------- Links Section ---------- */}
      {links?.length > 0 && (
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-[20px] font-semibold text-headingColor mb-4">
            Professional Links
          </h3>
          <ul className="space-y-3">
            {links.map((item, index) => {
              return (
                <li key={index}>
                  <a
                    href={
                      item.link.startsWith("http://") ||
                      item.link.startsWith("https://")
                        ? item.link
                        : "https://" + item.link
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium underline-offset-2 hover:underline transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-sm "
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ---------- Education Section ---------- */}
      {qualifications?.length > 0 && (
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-[20px] font-semibold text-headingColor mb-4">
            Education
          </h3>
          <ul className="divide-y divide-gray-100">
            {qualifications.map((item, index) => (
              <li
                key={index}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div>
                  <p className="text-[16px] font-semibold text-headingColor">
                    {item.degree}
                  </p>
                  <p className="text-[14px] text-gray-500 mt-1">
                    {item.university}
                  </p>
                </div>
                <span className="text-irisBlueColor text-[14px] font-medium">
                  {formateDate(item.startingDate)} -{" "}
                  {formateDate(item.endingDate)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- Experience Section ---------- */}
      {experiences?.length > 0 && (
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
          <h3 className="text-[20px] font-semibold text-headingColor mb-4">
            Experience
          </h3>
          <ul className="grid sm:grid-cols-2 gap-5">
            {experiences.map((item, index) => (
              <li
                key={index}
                className="p-5 rounded-xl bg-gradient-to-br from-[#fff9ea] to-[#fff3c4] border border-yellow-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-[16px] font-semibold text-headingColor">
                      {item.position}
                    </p>
                    <p className="text-[14px] text-gray-600">{item.hospital}</p>
                  </div>
                  <span className="text-yellowColor text-[14px] font-medium mt-3">
                    {formateDate(item.startingDate)} -{" "}
                    {formateDate(item.endingDate)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MentorAbout;
