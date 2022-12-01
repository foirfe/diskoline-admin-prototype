import { getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import { areasRef, stopsRef } from "../../firebaseConfig";

export default function StopsArea() {
  const [area, setArea] = useState("");
  const [stops, setStops] = useState("");

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
        areasRef,
        where("param", "==", localStorage.getItem("area"))
      );
      q.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc
            .collectionGroup("stoppesteder")
            .get()
            .then((querySnapshot) => {
              setStops(doc.data());
            });
        });
      });
    }
    console.log(stops);
    getArea();
    getStops();
  }, []);

  return (
    <div className="areselectedpage stopspage">
      <BackButton />
      <h1>Stoppesteder</h1>
      <h2>{area.danish_name}</h2>
      <div>{stops}</div>
      <button>Nyt stoppested</button>
    </div>
  );
}
