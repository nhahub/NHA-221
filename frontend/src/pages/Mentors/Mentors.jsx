import MentorCard from "../../components/Mentors/MentorCard";
import Testimonial from "../../components/Testimonial/Testimonial";

import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";

const Mentors = () => {
  const areaOfExpertiseOptions = [
    "Not Specified",
    "Software Engineering",
    "Marketing",
    "Design",
    "Finance",
    "Product Management",
    "Human Resources",
  ];

  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const [areaOfExpertiseQuery, setAreaOfExpertiseQuery] =
    useState("Not Specified");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query.trim());
    }, 700);
    return () => clearTimeout(timeout);
  }, [query]);

  const params = new URLSearchParams();
  if (debounceQuery) params.append("query", debounceQuery);
  if (areaOfExpertiseQuery !== "Not Specified")
    params.append("areaOfExpertise", areaOfExpertiseQuery);


  const {
    data: mentors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/mentors?${params.toString()}`);

  return (
    <>
      <section className="bg-[#fff9ea] mt-20">
        <div className="container text-center">
          <h2 className="heading">Find a Mentor</h2>

          {/* Search Input */}
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none placeholder:text-textColor"
              placeholder="Search by name or job title"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-l-none rounded-r-md capitalize"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Expertise Filter Buttons */}
          <div className="flex flex-row flex-wrap gap-3 mt-5 w-full p-5 md:items-center items-start md:justify-center justify-start">
            {areaOfExpertiseOptions.map((item, index) => (
              <button
                key={index}
                onClick={() => setAreaOfExpertiseQuery(item)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 shadow-sm border 
                  ${
                    areaOfExpertiseQuery === item
                      ? "bg-primaryColor text-white border-primaryColor"
                      : "text-primaryColor border-primaryColor hover:bg-primaryColor hover:text-white"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {mentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our mentee say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Mentors;
