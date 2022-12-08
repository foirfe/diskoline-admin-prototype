import { onSnapshot, orderBy, query } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { areasRef } from "../../firebaseConfig";

export default function StopsIndex() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const q = query(areasRef, orderBy("danish_name")); // order by: name
    const unsubscribe = onSnapshot(q, (data) => {
      const areasData = data.docs.map((doc) => {
        // map through all docs (object) from post collection
        return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
      });
      setAreas(areasData);
    });
    return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
  }, []);

  return (
    <div className="index_page">
      <Helmet>
        <title>Stoppesteder | Disko Line Admin</title>
      </Helmet>
      <h1>Stoppesteder</h1>
      <h2>Vælg Område</h2>
      <div className="areas">
        {areas.map((area) => (
          <div
            key={area.danish_name}
            className="area"
            onClick={function () {
              localStorage.setItem("area", area.param);
              window.location.reload(false);
            }}
          >
            <h1>{area.danish_name}</h1>
            <img src={area.image_path} alt={area.danish_name} />
          </div>
        ))}
      </div>
    </div>
  );
}
