import { getDocs, onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import { areasRef, SailingTimesRef, stopsRef } from "../../firebaseConfig";

export default function SailingTimesArea() {
  const [area, setArea] = useState("");
  const [stops, setStops] = useState([]);
  const [sailingTimes, setSailingTimes] = useState([]);

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
    };
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
    };
    async function getSailingTimes(){
      const q = query(
        SailingTimesRef,
        where("area", "==", localStorage.getItem("area"))
      );
      const unsubscribe = onSnapshot(q, (data) => {
        const sailingTimesData = data.docs.map((doc) => {
          // map through all docs (object) from post collection
          return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
        });
        setSailingTimes(sailingTimesData);
      });
      return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
    };
    getArea();
    getStops();
    getSailingTimes();
  }, []);

  return (
    <div className="areselectedpage stopspage">
      <BackButton />
      <h1>Sejltider</h1>
      <h2>{area.danish_name}</h2>
      Udviklingen af denne funktion er blevet sat på pause.
    </div>
  );
}
