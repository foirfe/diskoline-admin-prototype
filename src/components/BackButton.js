export default function BackButton() {
  function handleGoBack() {
    if (localStorage.getItem("area")) {
      localStorage.removeItem("area");
      window.location.reload(false);
    }
  }
  return <button className="change-area-btn" onClick={handleGoBack}>Skift område</button>;
}
