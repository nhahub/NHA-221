import  { useEffect, useState } from "react";
import axios from "axios";
import GSessionCard from "./GSessionCard";
import { BASE_URL } from "../../config";
import Loader from "../Loader/Loading"

const GSessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/group_sessions`)
      .then((res) => {
        setSessions(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  if (sessions.length === 0)
    return <h2 className="text-center mt-10">No sessions found</h2>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session) => (
        <GSessionCard key={session._id} session={session} />
      ))}
    </div>
  );
};

export default GSessionList;
