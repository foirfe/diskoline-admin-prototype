import { doc, getDoc, onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { routesRef, timeTablesRef } from "../../firebaseConfig";


export default function TimetableRoute(){
const [timetables, setTimetables] = useState([]);
const [selectedRoute, setSelectedRoute] = useState("");
const params = useParams(); // url parameter
const routeId = params.routeId; // get route id from url parameter
const navigate = useNavigate();
useEffect(() => {
    async function getRoute() {
      const docRef = doc(routesRef, routeId); // create post ref based on routeId from url parameter
      const docData = await getDoc(docRef); // get post data (one specific post)
      setSelectedRoute(docData.data().name); // setting post state with data from firestore
    }
    async function getTimeTables() {
        const q = query(
          timeTablesRef,
          where("route", "==", routeId)
        );
        const unsubscribe = onSnapshot(q, (data) => {
          const timetableData = data.docs.map((doc) => {
            // map through all docs (object) from post collection
            return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
          });
          setTimetables(timetableData);
        });
        return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
      }
    getRoute();
    getTimeTables();
  }, [routeId]); // called every time routeId changes

  function handleGoBack(){
        navigate("/fartplaner")
  };
function handleNewTimeTable(){
    navigate(`/fartplaner/${routeId}/nyfartplan`)
}
    return(
        <div className="timetableselect">
            <button onClick={handleGoBack}>Tilbage</button>
            <h1>Fartplaner</h1>
            <h3>Fartplaner for {selectedRoute}</h3>
            {timetables.map((timetable) => (
            <div
          key={timetable.id}
          className="timetable"
          onClick={function () {
            navigate(`/fartplaner/${timetable.id}`);
          }}
        >
          <h3> {timetable.name} </h3>
        </div>
      ))}
            <button onClick={handleNewTimeTable}>Ny fartplan</button>
        </div>
    )
}