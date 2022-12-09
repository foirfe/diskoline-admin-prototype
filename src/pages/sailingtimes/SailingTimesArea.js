import { getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import BackButton from "../../components/BackButton";
import { areasRef } from "../../firebaseConfig";

export default function SailingTimesArea() {
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
    <div className="areaselectedpage sailingtimespage">
      <Helmet>
        <title>{`Sejltider for ${area.danish_name} | Disko Line Admin`}</title>
      </Helmet>
      <BackButton />
      <h1>Sejltider</h1>
      <h2>{area.danish_name}</h2>
      <p>Udviklingen af denne funktion er blevet sat på pause.</p>
    </div>
  );
}
