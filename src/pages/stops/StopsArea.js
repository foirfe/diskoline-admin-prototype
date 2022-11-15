import { getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { areasRef } from "../../firebaseConfig";

export default function StopsArea() {
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

  function handleChangeArea() {}

  return (
    <div className="areselectedpage">
      <h1>Stoppesteder</h1>
      <h2>{area.danish_name}</h2>
    </div>
  );
}
