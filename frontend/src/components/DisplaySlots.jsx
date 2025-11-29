import { useState } from "react";

const getDayName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const convertTime = (timeString) => {
  const [h, m] = timeString.split(":");
  const date = new Date();
  date.setHours(h);
  date.setMinutes(m);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const TimeSlotList = ({
  timeSlots,
  selectedSlot,
  setSelectedSlot,
  previewOnly,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleSelect = (slot, hour) => {
    if (previewOnly) return; 
    setSelectedSlot({
      date: slot.day,
      time: hour.time,
    });
  };

  return (
    <ul className="space-y-3">
      {timeSlots.map((slot, index) => {
        const isExpanded = expandedIndex === index;

        return (
          <li
            key={index}
            className="bg-white dark:bg-gray-800 border rounded-xl shadow p-4"
          >
            {/* ---- HEADER ---- */}
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              className="w-full flex justify-between items-center"
            >
              <div className="text-left">
                <p className="text-gray-900 dark:text-gray-100 font-semibold">
                  {getDayName(slot.day)} – {formatDate(slot.day)}
                </p>

                <p className="text-indigo-600 font-medium">
                  {convertTime(slot.startingTime)} →{" "}
                  {convertTime(slot.endingTime)}
                </p>
              </div>

              <span className="text-gray-600 dark:text-gray-300 text-xl">
                {isExpanded ? "−" : "+"}
              </span>
            </button>

            {/* ---- EXPANDED HOUR SLOTS ---- */}
            {isExpanded && (
              <div className="mt-4 space-y-2">
                {slot.hourSlots
                  .filter((h) => h.status === "available")
                  .map((hour, i) => {
                    const isSelected =
                      selectedSlot?.date === slot.day &&
                      selectedSlot?.time === hour.time;

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(slot, hour)}
                        className={`w-full text-left border rounded-lg px-3 py-2 flex justify-between transition
                          ${
                            isSelected
                              ? "bg-indigo-600 border-indigo-700 text-white"
                              : "bg-green-50 border-green-300 hover:bg-green-100"
                          }
                        `}
                      >
                        <span className="font-medium">{hour.time}</span>

                        <span
                          className={`capitalize font-medium ${
                            isSelected ? "text-white" : "text-green-700"
                          }`}
                        >
                          {isSelected ? "selected" : hour.status}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TimeSlotList;
