import { doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import TimeTableForm from "../../components/TimeTableForm";
import { timeTablesRef } from "../../firebaseConfig";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TimetableEdit() {
  const params = useParams(); // url parameter
  const timetableId = params.timetableId; // get the id from url parameter

  const [timetable, setTimetable] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function getTimetable() {
      console.log(timetableId);
      const docRef = doc(timeTablesRef, timetableId);
      const docData = await getDoc(docRef);
      setTimetable(docData.data());
    }

    getTimetable();
  }, [timetableId]); // called every time routeId changes

  async function handleSubmit(postToUpdate) {
    const docRef = doc(timeTablesRef, timetableId); // create post ref based on routeId
    await updateDoc(docRef, postToUpdate); // update post using the docRef and postToUpdate object (coming from PostForm)
    navigate("/fartplaner");
  }

  async function deleteTimetable() {
    const confirmDelete = window.confirm(`Vil du gerne slette denne fartplan?`); // show confirm delete dialog
    if (confirmDelete) {
      const docRef = doc(timeTablesRef, timetableId); // create post ref based on params
      await deleteDoc(docRef); // delete doc
      navigate("/fartplaner");
    }
  }
  function handleGoBack() {
    navigate("/fartplaner");
  }
  return (
    <section className="timetableformpage">
      <Helmet>
        <title>Redigér Fartplan | Disko Line Admin</title>
      </Helmet>
      <h1>Fartplaner</h1>
      <h2 className="text-center">Redigér fartplan</h2>
      <button className="back-btn" onClick={handleGoBack}>Tilbage</button>
      <TimeTableForm saveTimetable={handleSubmit} timeTable={timetable} />
      <DeleteIcon className="delete-btn" onClick={deleteTimetable} />
    </section>
  );
}
