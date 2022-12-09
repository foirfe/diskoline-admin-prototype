import { onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { stopsRef } from "../firebaseConfig";

export default function RouteForm({ saveRoute, route }) {
  const [stops, setStops] = useState([]);
  const [stopsToPick, setStopsToPick] = useState([]);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    async function getStops() {
      const q = query(
        stopsRef,
        where("area", "==", localStorage.getItem("area"))
      );
      const unsubscribe = onSnapshot(q, (data) => {
        const stopsData = data.docs.map((doc) => {
          // map through all docs (object) from post collection
          return { ...doc.data(), id: doc.id }; // changing the data structure so it's all gathered in one object
        });
        setStops(stopsData);
      });
      return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
    }
    getStops();

    if (route) {
      setName(route.name);

      // if route, set the states with values from the post object.
      // The route object is a prop.
    }
  }, [route]); // useEffect is called every time post changes.
  function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      // create a new objebt to hold the value from states / input fields
      name: name,
      stops: stopsToPick,
    };

    const validForm = formData.name; // will return false if one of the properties doesn't have a value
    if (validForm) {
      saveRoute(formData);
    } else {
      setErrorMessage("Navn på rute skal være angivet");
    }
  }
  function handleChange(e) {
    const { value, checked } = e.target;
    if (checked) {
      stopsToPick.push(value);
    } else {
      stopsToPick.pop(value);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Navn på rute:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <p className="checkboxes-headline"> Vælg stoppesteder til rute</p>
      <div className="stops-checkboxes">
        {stops.map((stop) => (
          <div className="label-box">
            <label key={stop.danish_name} className="label-stop">
              <input
                type="checkbox"
                value={stop.danish_name}
                onChange={handleChange}
              />
              <div className="checkbox-text">
                <p className="stop-code">{stop.code}</p>
                <p className="stop-name">{stop.danish_name}</p>
              </div>
            </label>
          </div>
        ))}
      </div>
      <p className="text-error">{errorMessage}</p>
      <button type="submit">Gem Rute</button>
    </form>
  );
}
