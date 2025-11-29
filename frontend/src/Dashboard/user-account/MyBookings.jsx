import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import { formateDate } from "../../utils/formateDate.js";

const MyBookings = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

  const { data: appointments } = useFetchData(
    `${BASE_URL}/bookings/my_bookings?userId=${userId}`
  );
  return (
    <div className="w-full">
      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg bg-white dark:bg-gray-900">
        <table className="min-w-full text-left text-sm text-gray-500 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mentor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Session Date
              </th>
              <th scope="col" className="px-6 py-3">
                Session Time
              </th>
              <th scope="col" className="px-6 py-3">
                Meeting Link
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {appointments?.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {item.mentor.name}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {formateDate(item.sessionDate)}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {item.sessionTime}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  <a
                    href={item.meetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline bg-primaryColor px-3 py-2 rounded-md whitespace-nowrap"
                  >
                    Join Meeting <span className="font-bold text-2xl">→</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        {appointments?.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 space-y-2 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {item.mentor.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {item.sessionTime}
              </span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              {formateDate(item.sessionDate)}
            </div>
            <a
              href={item.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-white bg-primaryColor px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-center w-full"
            >
              Join Meeting <span className="font-bold">→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
