import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import MentorGroupSessionCard from "../../components/MentorGroupSession/MentorGroupSessionCard ";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MentorGroupSessions = () => {
  const {
    data: GroupSessions,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/group_sessions/mentor/my-sessions`);

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (Array.isArray(GroupSessions)) setSessions(GroupSessions);
  }, [GroupSessions]);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 py-5">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && sessions?.length > 0 && (
          <>
            {sessions.map((groupSession, index) => (
              <MentorGroupSessionCard
                key={groupSession._id || index}
                groupSession={groupSession}
                onDeleted={(id) =>
                  setSessions((prev) => prev.filter((s) => s._id !== id))
                }
                onUpdated={(updated) =>
                  setSessions((prev) =>
                    prev.map((s) => (s._id === updated._id ? updated : s))
                  )
                }
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default MentorGroupSessions;
