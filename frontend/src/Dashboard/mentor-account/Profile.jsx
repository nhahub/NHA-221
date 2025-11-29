import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import ConnectGoogleButton from "../../components/ConnectGoogleCalendar";

const Profile = ({ mentorData }) => {
  const areaOfExpertiseOptions = [
    "Not Specified",
    "Software Engineering",
    "Marketing",
    "Design",
    "Finance",
    "Product Management",
    "Human Resources",
  ];
  const locationOptions = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Brazzaville)",
    "Congo (Kinshasa)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    gender: "",
    areaOfExpertise: "",
    jobTitle: "",
    hourlyFee: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    links: [],
    about: "",
    photo: null,
    location: "",
  });

  const [previewURL, setPreviewURL] = useState("");

  useEffect(() => {
    if (!mentorData) return;
    setFormData({
      name: mentorData.name || "",
      email: mentorData.email || "",
      bio: mentorData.bio || "",
      gender: mentorData.gender || "",
      areaOfExpertise: mentorData.areaOfExpertise || "",
      jobTitle: mentorData.jobTitle || "",
      hourlyFee: mentorData.hourlyFee || 0,
      qualifications: mentorData.qualifications || [],
      experiences: mentorData.experiences || [],
      timeSlots: mentorData.timeSlots || [],
      links: mentorData.links || [],
      about: mentorData.about || "",
      photo: mentorData.photo || null,
      location: mentorData.location || "",
    });
    setPreviewURL(mentorData.photo || "");
  }, [mentorData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
      setFormData((prev) => ({ ...prev, photo: data.url }));
    } catch (err) {
      toast.error("Failed to upload image");
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/mentors/${mentorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success(result.message);
    } catch (err) {
      toast.error("Update failed — please try again.");
    }
  };

  const addItem = (key, newItem) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], newItem] }));
  };

  const updateItem = (key, index, fieldName, value) => {
    setFormData((prev) => {
      const updated = [...prev[key]];
      updated[index][fieldName] = value;
      return { ...prev, [key]: updated };
    });
  };

  const updateTimeSlots = (key, index, field, value) => {
    const updated = [...formData[key]];
    updated[index][field] = value;

    const { startingTime, endingTime } = updated[index];

    if (startingTime && endingTime) {
      updated[index].hourSlots = generateHourlySlots(startingTime, endingTime);
    }

    setFormData((prev) => ({ ...prev, [key]: updated }));
  };

  const deleteItem = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };
  const generateHourlySlots = (startTime, endTime) => {
    const parseHour = (t) => parseInt(t.split(":")[0], 10);

    const start = parseHour(startTime);
    const end = parseHour(endTime);

    const fmt = (h) => {
      if (h === 0) return "12 AM";
      if (h < 12) return `${h} AM`;
      if (h === 12) return "12 PM";
      return `${h - 12} PM`;
    };

    const slots = [];

    for (let h = start; h < end; h++) {
      slots.push({
        time: `${fmt(h)} - ${fmt(h + 1)}`,
        status: "available",
      });
    }

    return slots;
  };

  return (
  <div className="bg-white dark:bg-[#11112b] rounded-2xl shadow-md p-2 sm:p-4 md:p-6 w-full max-w-full transition-all duration-500">

    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-3">
      Profile Information
    </h2>

    {/* Google Calendar */}
    <div className="mb-6">
      <h1 className="md:text-lg text-base font-semibold text-red-300 dark:text-gray-200 mb-4">
        Please connect your Google Calendar to receive appointment bookings.
      </h1>
      <ConnectGoogleButton mentorId={mentorData?._id} />
    </div>

    <form onSubmit={updateProfileHandler} className="space-y-6">

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {[
          { label: "Name*", name: "name", type: "text", placeholder: "Full Name" },
          { label: "Email*", name: "email", type: "email", placeholder: "Email", disabled: true },
          { label: "Bio", name: "bio", type: "text", placeholder: "Short bio" },
          { label: "Gender", name: "gender", type: "select", options: ["", "male", "female"] },
          { label: "Specialization", name: "areaOfExpertise", type: "select", options: areaOfExpertiseOptions },
          { label: "Job Title", name: "jobTitle", type: "text", placeholder: "Job Title" },
          { label: "Hourly Fee", name: "hourlyFee", type: "number", placeholder: "Hourly Rate" },
          { label: "Location", name: "location", type: "select", options: locationOptions },
        ].map((field) => (
          <div key={field.name} className="w-full">
            <label className="form_label font-medium text-gray-700 dark:text-gray-200 mb-1 block">
              {field.label}
            </label>

            {field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                disabled={field.disabled}
                className="form_input rounded-xl border border-gray-300 dark:border-gray-700 p-2.5 w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
              >
                {field.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt || "Select"}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                disabled={field.disabled}
                className="form_input rounded-xl border border-gray-300 dark:border-gray-700 p-2.5 w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
              />
            )}
          </div>
        ))}
      </div>

      {/* Array Sections: Qualifications, Experiences, Links */}
      {[
        {
          key: "qualifications",
          label: "Qualifications",
          fields: [
            { name: "startingDate", type: "date", label: "Start Date" },
            { name: "endingDate", type: "date", label: "End Date" },
            { name: "degree", type: "text", label: "Degree" },
            { name: "university", type: "text", label: "University" },
          ],
          addItemFunc: () =>
            addItem("qualifications", {
              startingDate: "",
              endingDate: "",
              degree: "",
              university: "",
            }),
        },
        {
          key: "experiences",
          label: "Experiences",
          fields: [
            { name: "startingDate", type: "date", label: "Start Date" },
            { name: "endingDate", type: "date", label: "End Date" },
            { name: "position", type: "text", label: "Position" },
            { name: "company", type: "text", label: "Company" },
          ],
          addItemFunc: () =>
            addItem("experiences", {
              startingDate: "",
              endingDate: "",
              position: "",
              company: "",
            }),
        },
        {
          key: "links",
          label: "Links",
          fields: [
            { name: "name", type: "text", label: "Name" },
            { name: "link", type: "text", label: "Link" },
          ],
          addItemFunc: () => addItem("links", { name: "", link: "" }),
        },
      ].map(({ key, label, fields, addItemFunc }) => (
        <div key={key} className="w-full mb-6">

          <p className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
            {label}
          </p>

          {formData[key]?.map((item, index) => (
            <div
              key={index}
              className="mb-4 w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2 shadow-sm"
            >
              <div className={`grid grid-cols-1 sm:grid-cols-${fields.length} gap-3 w-full`}>
                {fields.map((field) => (
                  <div key={field.name} className="w-full">
                    <label className="form_label text-gray-700 dark:text-gray-200 mb-1 block">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={item[field.name]}
                      onChange={(e) => updateItem(key, index, field.name, e.target.value)}
                      className="form_input rounded-lg border border-gray-300 dark:border-gray-600 p-1 w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem(key, index);
                }}
                className="flex items-center justify-center mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all shadow-sm"
              >
                <AiOutlineDelete size={20} />
              </button>
            </div>
          ))}

          <button
            onClick={(e) => {
              e.preventDefault();
              addItemFunc();
            }}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg shadow-sm transition-all font-medium"
          >
            + Add {label}
          </button>
        </div>
      ))}

      {/* About */}
      <div>
        <label className="form_label font-medium text-gray-700 dark:text-gray-200 mb-1 block">
          About
        </label>
        <textarea
          name="about"
          rows={4}
          value={formData.about}
          onChange={handleInputChange}
          placeholder="Write about yourself..."
          className="form_input rounded-xl border border-gray-300 dark:border-gray-700 p-2.5 w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Photo Upload */}
      <div className="flex items-center gap-4">
        {formData.photo && (
          <figure className="w-[70px] h-[70px] rounded-full border-2 border-indigo-500 overflow-hidden shadow-sm">
            <img src={previewURL} alt="Mentor" className="w-full h-full object-cover" />
          </figure>
        )}

        <div className="relative">
          <input
            type="file"
            id="customFile"
            name="photo"
            onChange={handleFileInputChange}
            accept=".jpg,.png"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <label
            htmlFor="customFile"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-5 rounded-xl cursor-pointer shadow-sm transition-all"
          >
            Upload Photo
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-3">
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2.5 px-8 rounded-xl shadow-md transition-all"
        >
          Update Profile
        </button>
      </div>

    </form>
  </div>
);

};

export default Profile;
