import { getDocs, onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { areasRef, routesRef } from "../../firebaseConfig";
import EditIcon from "@mui/icons-material/Edit";

export default function RoutesArea() {
  const [area, setArea] = useState("");
  const [routes, setRoutes] = useState([]);
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
    async function getRoutes() {
      const q = query(
        routesRef,
        where("area", "==", localStorage.getItem("area"))
      );
      const unsubscribe = onSnapshot(q, (data) => {
        const routesData = data.docs.map((doc) => {
          // map through all docs (object) from post collection
          return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
        });
        setRoutes(routesData);
      });
      return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
    }
    getArea();
    getRoutes();
  }, []);
  function handleNavigateToNewRoute() {
    navigate("/ruter/nyrute");
  }

  return (
    <div className="areselectedpage routespage">
      <Helmet>
        <title>{`Ruter for ${area.danish_name} | Disko Line Admin`}</title>
      </Helmet>
      <BackButton />
      <h1>Ruter</h1>
      <h2>{area.danish_name}</h2>
      <div className="routes">
        {routes.map((route) => (
          <div
            key={route.name}
            className="route"
            onClick={function () {
              navigate(`/ruter/${route.id}`);
            }}
          >
            <div className="route-panel">
              <h3> {route.name} </h3>
              <div className="pencil-icon">
                <EditIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="newroute-btn">
      <button  onClick={handleNavigateToNewRoute}>
        Opret ny rute
      </button>
      </div>
    </div>
  );
}
