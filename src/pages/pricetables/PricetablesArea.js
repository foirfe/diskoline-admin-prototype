import { getDocs, onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import { areasRef, priceTablesRef } from "../../firebaseConfig";

export default function PricetablesArea() {
  const [pricetables, setPricetables] = useState([]);
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
    async function getPriceTables(){
      const q = query(
          priceTablesRef,
          where("area", "==", localStorage.getItem("area"))
        );
        const unsubscribe = onSnapshot(q, (data) => {
          const priceTablesData = data.docs.map((doc) => {
        
            return { ...doc.data(), id: doc.id }; 
          });
          setPricetables(priceTablesData);
        });
        return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
  }
  getPriceTables();
    getArea();
  }, []);

  return (
    <div className="areselectedpage pricetablespage">
      <BackButton />
      <h1>Pristabeller</h1>
      <h2>{area.danish_name}</h2>
      {pricetables.map((pricetable) => (
          <div
            key={pricetable.name}
            className="pricetable"
          >
            <h3>{pricetable.name}</h3>
          </div>
        ))}
        <p>I øjeblikket kan man ikke lave nye pristabeller</p>
    </div>
  );
}
