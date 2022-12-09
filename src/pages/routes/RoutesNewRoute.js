import { useNavigate } from "react-router-dom";
import { addDoc } from "@firebase/firestore";
import { routesRef } from "../../firebaseConfig";
import RouteForm from "../../components/RouteForm";
import { Helmet } from "react-helmet";

export default function RoutesNewRoute() {
  const navigate = useNavigate();

  async function createRoute(newRoute) {
    newRoute.area = localStorage.getItem("area");

    await addDoc(routesRef, newRoute);

    navigate("/ruter");
  }
  function handleGoBack() {
    navigate("/ruter");
  }
  return (
    <section className="routesformpage">
      <Helmet>
        <title>Ny rute | Disko Line Admin</title>
      </Helmet>
      <h1 className="text-center">Opret ny rute</h1>
      <button className="back-btn" onClick={handleGoBack}>
        Tilbage
      </button>
      <RouteForm saveRoute={createRoute} />
    </section>
  );
}
