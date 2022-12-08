import { useNavigate } from "react-router-dom";
import { addDoc } from "@firebase/firestore";
import { stopsRef } from "../../firebaseConfig";
import StopForm from "../../components/StopForm";
import { Helmet } from "react-helmet";

export default function StopsNewStop() {
  const navigate = useNavigate();

  async function createStop(newStop) {
    newStop.area = localStorage.getItem("area");

    await addDoc(stopsRef, newStop);

    navigate("/stoppesteder");
  }
  return (
    <section className="page stopspage">
      <Helmet>
        <title>Nyt Stoppested | Disko Line Admin</title>
      </Helmet>
      <h1>Stoppesteder</h1>
      <h2 className="text-center">Opret nyt stoppested</h2>
      <StopForm saveStop={createStop} />
    </section>
  );
}
