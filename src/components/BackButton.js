export default function BackButton() {
  function handleGoBack() {
    if (localStorage.getItem("area")) {
      localStorage.removeItem("area");
      window.location.reload(false);
    }
  }
  return <button onClick={handleGoBack}>Tilbage</button>;
}
