import { getDocs, onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { areasRef, stopsRef } from "../../firebaseConfig";

export default function StopsArea() {
  const [area, setArea] = useState("");
  const [stops, setStops] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getArea() {
      const q = query(
        areasRef,
        where("param", "==", localStorage.getItem("area"))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setArea(doc.data());
      });
    }
    async function getStops() {
      const q = query(
        stopsRef,
        where("area", "==", localStorage.getItem("area"))
      );
      const unsubscribe = onSnapshot(q, (data) => {
        const stopsData = data.docs.map((doc) => {
          // map through all docs (object) from post collection
          return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
        });
        setStops(stopsData);
      });
      return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
    }
    getArea();
    getStops();
  }, []);
  function handleNavigateToNewStop() {
    navigate("/stoppesteder/nytstoppested");
  }
  return (
    <div className="areselectedpage stopspage">
      <Helmet>
        <title>{`Stoppesteder for ${area.danish_name} | Disko Line Admin`}</title>
      </Helmet>
      <BackButton />
      <h1>Stoppesteder</h1>
      <h2>{area.danish_name}</h2>
      {stops.map((stop) => (
        <div
          key={stop.danish_name}
          className="stop"
          onClick={function () {
            navigate(`/stoppesteder/${stop.id}`);
          }}
        >
          <h1>
            {stop.danish_name} {stop.code}
          </h1>
        </div>
      ))}
      <button onClick={handleNavigateToNewStop}>Nyt stoppested</button>
    </div>
  );
}
