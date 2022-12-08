import { useNavigate } from "react-router-dom";

export default function ForgottenPassword() {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/");
  }
  return (
    <div className="public_page">
      <h1>Glemt Kode?</h1>
      <p>
        Denne funktion virker ikke, men er blot for at vise at her ville man
        bede om at få nulstillet sin kode
      </p>
      <button onClick={handleNavigate}>Tilbage til Login</button>
    </div>
  );
}
