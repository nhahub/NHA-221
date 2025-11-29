import { useState } from "react";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const UpdateGroupSession = ({ groupSession, open, setOpen, onUpdated }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [updatedItem, setupdatedItem] = useState({
    imageURL: groupSession.imageURL,
    topic: groupSession.topic,
    description: groupSession.description,
    startDatetime: groupSession.startDatetime,
    durationMinutes: groupSession.durationMinutes,
    maxParticipants: groupSession.maxParticipants,
    ticketPrice: groupSession.ticketPrice,
    meetingLink: groupSession.meetingLink,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setupdatedItem({ ...updatedItem, [name]: value });
  };

  // File upload
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));

    try {
      const data = await uploadImageToCloudinary(file);
      setupdatedItem({ ...updatedItem, imageURL: data.url });
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
    }
  };

  // Submit update
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL}/group_sessions/${groupSession._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedItem),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Update failed");

      const updated = result.data || result;
      // notify parent to update its list
      if (typeof onUpdated === "function") onUpdated(updated);

      toast.success("Session updated successfully!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30">
      {/* BACKDROP */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity 
        data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center sm:p-0">
          {/* PANEL */}
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left 
            shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl 
            data-closed:opacity-0 data-closed:translate-y-4 data-closed:sm:scale-95"
          >
            <div className="px-8 py-6">
              <DialogTitle className="text-2xl font-bold text-center mb-6">
                Update <span className="text-primaryColor">Group Session</span>
              </DialogTitle>

              <form onSubmit={submitHandler} className="space-y-8">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Topic */}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Session Topic</label>
                    <input
                      type="text"
                      name="topic"
                      value={updatedItem.topic}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Description</label>
                    <input
                      type="text"
                      name="description"
                      value={updatedItem.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none"
                      required
                    />
                  </div>

                  {/* Ticket Price
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      Ticket Price (in USD)
                    </label>
                    <input
                      type="number"
                      name="ticketPrice"
                      value={updatedItem.ticketPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none"
                      required
                    />
                  </div> */}

                  {/* Start Date */}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Start Date / Time</label>
                    <input
                      type="datetime-local"
                      name="startDatetime"
                      value={updatedItem.startDatetime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none"
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Duration (minutes)</label>
                    <input
                      type="number"
                      name="durationMinutes"
                      value={updatedItem.durationMinutes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none"
                    />
                  </div>

                  {/* Max Participants
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Max Participants</label>
                    <input
                      type="number"
                      name="maxParticipants"
                      value={updatedItem.maxParticipants}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none"
                    />
                  </div> */}

                  {/* Meeting Link */}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Meeting Link</label>
                    <input
                      type="text"
                      name="meetingLink"
                      value={updatedItem.meetingLink}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primaryColor focus:outline-none"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="flex flex-col gap-3">
                    <label className="font-semibold">Session Image</label>

                    <div className="flex items-center gap-5">
                      <label className="cursor-pointer px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-200">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                      </label>

                      {previewUrl && (
                        <img
                          src={previewUrl}
                          className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-5 py-2 rounded-lg bg-white border text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2 rounded-lg bg-primaryColor text-white text-sm font-semibold hover:opacity-90 flex items-center justify-center"
                  >
                    {loading ? (
                      <HashLoader size={22} color="#fff" />
                    ) : (
                      "Update Session"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateGroupSession;
