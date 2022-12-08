import { addDoc } from "@firebase/firestore";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import TimeTableForm from "../../components/TimeTableForm";
import { timeTablesRef } from "../../firebaseConfig";

export default function TimetableNew() {
  const params = useParams(); // url parameter
  const currentRoute = params.currentRoute; // get post id from url parameter
  const navigate = useNavigate();

  async function createTimeTable(newTimeTable) {
    newTimeTable.route = currentRoute;

    await addDoc(timeTablesRef, newTimeTable);
    navigate("/fartplaner");
  }
  function handleGoBack() {
    navigate("/fartplaner");
  }
  return (
    <div className="page timetablepage">
      <Helmet>
        <title>Ny fartplan | Disko Line Admin</title>
      </Helmet>
      <button onClick={handleGoBack}>Tilbage</button>
      <h1>Fartplaner</h1>
      <h2>Opret ny fartplan</h2>
      <TimeTableForm saveTimetable={createTimeTable} />
    </div>
  );
}
