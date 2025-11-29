import { BASE_URL } from "../config";
const ConnectGoogleButton = ({mentorId}) => {

  const handleGoogleAuth = () => {
    if (mentorId === null) {
      alert("You must be logged in first");
      return;
    }
    window.location.href = `${BASE_URL}/auth/google?state=${mentorId}`;
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Connect Google Calendar
    </button>
  );
};

export default ConnectGoogleButton;
