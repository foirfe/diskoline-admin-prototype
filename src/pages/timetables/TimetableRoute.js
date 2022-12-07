import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { routesRef } from "../../firebaseConfig";


export default function TimetableRoute(){
const [selectedRoute, setSelectedRoute] = useState("");
const params = useParams(); // url parameter
const routeId = params.routeId; // get route id from url parameter
const navigate = useNavigate();
useEffect(() => {
    async function getRoute() {
      console.log(routeId);
      const docRef = doc(routesRef, routeId); // create post ref based on routeId from url parameter
      const docData = await getDoc(docRef); // get post data (one specific post)
      setSelectedRoute(docData.data().name); // setting post state with data from firestore
    }

    getRoute();
  }, [routeId]); // called every time routeId changes

  function handleGoBack(){
        navigate("/fartplaner")
  };
function handleNewTimeTable(){
    navigate("/fartplaner/nyfartplan")
}
    return(
        <div className="timetableselect">
            <button onClick={handleGoBack}>Tilbage</button>
            <h1>Fartplaner</h1>
            <h3>Fartplaner for {selectedRoute}</h3>
            <button onClick={handleNewTimeTable}>Ny fartplan</button>
        </div>
    )
}