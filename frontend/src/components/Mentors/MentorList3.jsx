import MentorCard from "./MentorCard";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../Loader/Loading";
import Error from "../Error/Error";

const MentorList = () => {
  const { data: mentors, loading, error } = useFetchData(`${BASE_URL}/mentors`);

  return (
    <>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && mentors?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {mentors.slice(0, 4).map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      )}
    </>
  );
};

export default MentorList;
