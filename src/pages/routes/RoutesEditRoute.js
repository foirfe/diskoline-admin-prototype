import { doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RouteForm from "../../components/RouteForm";
import { routesRef } from "../../firebaseConfig";

export default function RoutesEditRoute() {
  const params = useParams(); // url parameter
  const routeId = params.routeId; // get post id from url parameter
  const [route, setRoute] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      console.log(routeId);
      const docRef = doc(routesRef, routeId); // create post ref based on routeId from url parameter
      const docData = await getDoc(docRef); // get post data (one specific post)
      setRoute(docData.data()); // setting post state with data from firestore
    }

    getPost();
  }, [routeId]); // called every time routeId changes

  /**
   * handleSubmit updates and existing post based on a routeId
   * handleSubmit is called by the PostForm component
   */
  async function handleSubmit(postToUpdate) {
    const docRef = doc(routesRef, routeId); // create post ref based on routeId
    await updateDoc(docRef, postToUpdate); // update post using the docRef and postToUpdate object (coming from PostForm)
    navigate("/ruter");
  }

  async function deleteRoute() {
    const confirmDelete = window.confirm(
      `Vil du gerne slette routepestedet ${route.name}?`
    ); // show confirm delete dialog
    if (confirmDelete) {
      // if user click "OK" then delete post
      const docRef = doc(routesRef, routeId); // create post ref based on routeId
      await deleteDoc(docRef); // delete doc
      navigate("/ruter");
    }
  }
  function handleGoBack() {
    navigate("/ruter");
  }
  return (
    <section className="page">
      <h1 className="text-center">Redigere routepested</h1>
      <button onClick={handleGoBack}>Tilbage</button>
      <RouteForm saveroute={handleSubmit} route={route} />
      <button className="btn-outline" onClick={deleteRoute}>
        Slet routepested
      </button>
    </section>
  );
}
