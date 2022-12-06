import { useNavigate } from "react-router-dom";
import { addDoc } from "@firebase/firestore";
import { routesRef } from "../../firebaseConfig";
import RouteForm from "../../components/RouteForm";

export default function RoutesNewRoute() {
  const navigate = useNavigate();

  async function createRoute(newRoute) {
    newRoute.area = localStorage.getItem("area");

    await addDoc(routesRef, newRoute);

    navigate("/ruter");
  }
  return (
    <section className="page">
      <h1 className="text-center">Opret nyt stoppested</h1>
      <RouteForm saveRoute={createRoute} />
    </section>
  );
}
