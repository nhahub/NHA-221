import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";

const GSessionDetails = () => {
  const { id } = useParams();

  const {
    data: session,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/group_sessions/${id}`);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!session) return <Error message="Session not found" />;

  const {
    description,
    durationMinutes,
    imageURL,
    meetingLink,
    mentor,
    startDatetime,
    status,
    topic,
    user,
  } = session;

  const statusColors = {
    upcoming: "bg-green-100 text-green-700",
    live: "bg-red-100 text-red-700",
    finished: "bg-gray-200 text-gray-700",
  };

  const formattedDate = new Date(startDatetime).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20 min-h-screen">
      {/* --- USER NAME AT TOP --- */}
      {user?.name && (
        <p className="text-lg font-semibold text-gray-700 mb-4">
          👤 Booked by: <span className="text-primaryColor">{user.name}</span>
        </p>
      )}

      {/* --- HEADER CARD --- */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row mb-8">
        {/* Image left */}
        <div className="md:w-1/3 w-full h-56 md:h-auto overflow-hidden">
          <img
            src={imageURL}
            alt={topic}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text right */}
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          {/* Top row: status + join button */}
          <div className="flex justify-between items-center">
            <span
              className={`px-4 py-1 text-sm rounded-full font-semibold ${
                statusColors[status] || "bg-gray-200 text-gray-700"
              }`}
            >
              {status?.toUpperCase()}
            </span>

            {meetingLink && (
              <a
                href={meetingLink}
                target="_blank"
                rel="noreferrer"
                className="bg-primaryColor text-white font-semibold px-4 py-2 rounded-lg shadow hover:shadow-md transition"
              >
                Join
              </a>
            )}
          </div>

          <h1 className="text-3xl font-bold mt-3">{topic}</h1>

          {/* Enhanced Date */}
          <p className="text-gray-600 mt-3">📅 {formattedDate}</p>

          <p className="text-gray-600 mt-1">
            ⏳ Duration: {durationMinutes} minutes
          </p>
        </div>
      </div>

      {/* Description */}
      <h2 className="text-xl font-semibold mb-2">About this Session</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

      {/* Mentor Card */}
      {mentor && (
        <div className="p-5 bg-gray-50 rounded-xl shadow-sm flex items-start gap-4 border mb-8">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
            <img
              src={mentor.photo || "/placeholder-avatar.png"}
              alt={mentor.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold">👨‍🏫 Mentor</h3>
            <p className="text-gray-900 font-medium text-lg">{mentor.name}</p>
            <p className="text-gray-600 text-sm">{mentor.jobTitle}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GSessionDetails;
