import { getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import { areasRef } from "../../firebaseConfig";

export default function TimetableArea() {
  const [area, setArea] = useState("");

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
    getArea();
  }, []);

  return (
    <div className="areselectedpage timetable_page">
      <BackButton />
      <h1>Fartplaner</h1>
      <h2>{area.danish_name}</h2>
    </div>
  );
}
