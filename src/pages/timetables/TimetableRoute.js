import { onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { timeTablesRef } from "../../firebaseConfig";
import { Helmet } from "react-helmet";
import EditIcon from "@mui/icons-material/Edit";

export default function TimetableRoute() {
  const [timetables, setTimetables] = useState([]);

  const params = useParams(); // url parameter
  const routeId = params.routeId; // get route id from url parameter
  const navigate = useNavigate();
  useEffect(() => {
    async function getTimeTables() {
      const q = query(timeTablesRef, where("route", "==", routeId));
      const unsubscribe = onSnapshot(q, (data) => {
        const timetableData = data.docs.map((doc) => {
          // map through all docs (object) from post collection
          return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
        });
        setTimetables(timetableData);
      });
      return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
    }

    getTimeTables();
  }, [routeId]); // called every time routeId changes

  function handleGoBack() {
    navigate("/fartplaner");
  }
  function formatDate(date) {
    const formattedDate = format(new Date(date), "dd MMMM yyyy");
    return formattedDate;
  }
  function handleNewTimeTable() {
    navigate(`/fartplaner/${routeId}/nyfartplan`);
  }
  return (
    <div className="timetablewithroute">
      <Helmet>
        <title>Fartplaner | Disko Line Admin</title>
      </Helmet>
      <button className="back-btn" onClick={handleGoBack}>Tilbage</button>
      <h1>Fartplaner</h1>
      <div className="timetables">
      {timetables.map((timetable) => (
        <div
        key={timetable.id}
        className="timetable"
        onClick={function () {
          navigate(`/fartplaner/redigere/${timetable.id}`);
        }}
        >
          <div className="timetable-panel">
          <h3>
            {formatDate(timetable.startDate)} - {formatDate(timetable.endDate)}
          </h3>
          <div className="pencil-icon">
                <EditIcon />
              </div>
          </div>
        </div>
      ))}
      </div>
      <div className="newtimetable-btn">
      <button  onClick={handleNewTimeTable}>Ny fartplan</button>
      </div>
    </div>
  );
}
