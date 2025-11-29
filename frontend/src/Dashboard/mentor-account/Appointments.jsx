import { formateDate } from "../../utils/formateDate.js";

const Appointments = ({ appointments }) => {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white dark:bg-gray-900 p-2 sm:p-0">
      {/* ========== Mobile Cards ========== */}
      <div className="space-y-4 sm:hidden">
        {appointments?.map((item) => (
          <div
            key={item.item_id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-3 border border-gray-100 dark:border-gray-700"
          >
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                src={item.user?.photo || "/default-avatar.png"}
                className="w-12 h-12 rounded-full object-cover"
                alt={item.user?.name}
              />
              <div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {item.user?.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.user?.email}
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {formateDate(item.sessionDate)}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {item.sessionTime}
              </p>
            </div>

            {/* Meeting Link */}
            <a
              href={item.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-white hover:opacity-90 bg-primaryColor px-3 py-2 rounded-md text-sm"
            >
              Join Meeting →
            </a>
          </div>
        ))}
      </div>

      {/* ========== Desktop Table ========== */}
      <table className="hidden sm:table min-w-full text-left text-sm text-gray-500 dark:text-gray-300">
        <thead className="bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-400 uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Session Date</th>
            <th className="px-6 py-3">Session Time</th>
            <th className="px-6 py-3">Meeting link</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {appointments?.map((item) => (
            <tr
              key={item.item_id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td className="flex items-center px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                <img
                  src={item.user?.photo || "/default-avatar.png"}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={item.user?.name}
                />
                <div className="pl-3">
                  <div className="font-semibold">{item.user?.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.user?.email}
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">{formateDate(item.sessionDate)}</td>

              <td className="px-6 py-4">{item.sessionTime}</td>

              <td className="px-6 py-4">
                <a
                  href={item.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline bg-primaryColor px-3 py-2 rounded-md text-sm whitespace-nowrap"
                >
                  Join Meeting →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
