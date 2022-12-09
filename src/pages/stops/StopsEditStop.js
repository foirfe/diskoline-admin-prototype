import { doc, getDoc, updateDoc, deleteDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import StopForm from "../../components/StopForm";
import { stopsRef } from "../../firebaseConfig";

export default function StopsEditStop() {
  const params = useParams(); // url parameter
  const stopId = params.stopId; // get post id from url parameter
  const [stop, setStop] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      console.log(stopId);
      const docRef = doc(stopsRef, stopId); // create post ref based on stopId from url parameter
      const docData = await getDoc(docRef); // get post data (one specific post)
      setStop(docData.data()); // setting post state with data from firestore
    }

    getPost();
  }, [stopId]); // called every time stopId changes

  /**
   * handleSubmit updates and existing post based on a stopId
   * handleSubmit is called by the PostForm component
   */
  async function handleSubmit(postToUpdate) {
    const docRef = doc(stopsRef, stopId); // create post ref based on stopId
    await updateDoc(docRef, postToUpdate); // update post using the docRef and postToUpdate object (coming from PostForm)
    navigate("/stoppesteder");
  }

  async function deletePost() {
    const confirmDelete = window.confirm(
      `Vil du gerne slette stoppestedet ${stop.danish_name} ${stop.code}?`
    ); // show confirm delete dialog
    if (confirmDelete) {
      // if user click "OK" then delete post
      const docRef = doc(stopsRef, stopId); // create post ref based on stopId
      await deleteDoc(docRef); // delete doc
      navigate("/stoppesteder");
    }
  }
  function handleGoBack() {
    navigate("/stoppesteder");
  }
  return (
    <section className="stopformpage stopspage">
      <Helmet>
        <title>Redigér Stoppested | Disko Line Admin</title>
      </Helmet>
      <h1>Stoppesteder</h1>
      <h2 className="text-center">Redigér Stoppested</h2>
      <button onClick={handleGoBack}>Tilbage</button>
      <StopForm saveStop={handleSubmit} stop={stop} />
      <DeleteIcon className="btn-outline" onClick={deletePost} />
    </section>
  );
}
