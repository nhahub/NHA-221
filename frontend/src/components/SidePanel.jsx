import { useState } from "react";
import { BASE_URL, token } from "../config";
import { toast } from "react-toastify";
import DisplaySlots from "./DisplaySlots";

const SidePanel = ({ mentorId, hourlyFee, timeSlots = [] }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const bookingHandler = async () => {
    if (!selectedSlot) {
      return toast.error("Please select a time slot first.");
    }
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout_session/${mentorId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: selectedSlot.date,
            time: selectedSlot.time,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (data.session?.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error("Booking failed — please log in and try again.");
      console.error(err);
    }
  };

  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);

  const nextSevenDays = timeSlots.filter((s) => {
    const d = new Date(s.day);
    return d >= today && d <= sevenDaysLater;
  });

  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl border border-gray-100 max-h-[600px] overflow-y-auto">
      {/* Fee */}
      <div className="flex items-center justify-between mb-5 border-b pb-3">
        <p className="text-[16px] font-semibold text-gray-700">Hourly Fee</p>
        <span className="text-[22px] font-bold text-indigo-600">
          {hourlyFee} <span className="text-sm text-gray-500">USD</span>
        </span>
      </div>

      {/* Preview slots */}
      <p className="text-[15px] font-semibold text-gray-800 mb-3">
        Available Time Slots
      </p>

      <DisplaySlots
        timeSlots={nextSevenDays}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        previewOnly={false}
      />
      {/* Button */}
      <button
        onClick={bookingHandler}
        className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow hover:bg-indigo-700"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
