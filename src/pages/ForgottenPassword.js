import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function ForgottenPassword() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }
  return (
    <div className="public_page">
      <Helmet>
        <title>Glemt Kode? Disko Line Admin</title>
      </Helmet>
      <h1>Glemt Kode?</h1>
      <div className="forgotten-password">
        <p>
          Denne funktion virker ikke, men er blot for at vise at her ville man
          bede om at få nulstillet sin kode
        </p>
        <button onClick={handleNavigate} className="back-btn">
          Tilbage til Login
        </button>
      </div>
    </div>
  );
}
