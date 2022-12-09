import { onSnapshot, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { priceTablesRef } from "../firebaseConfig";

export default function TimeTableForm({ saveTimetable, timeTable }) {
  const [pricetables, setPricetables] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [pricetable, setPricetable] = useState("");
  const [pax, setPax] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (timeTable) {
      setStartDate(timeTable.startDate);
      setEndDate(timeTable.endDate);
      setPricetable(timeTable.pricetable);
      setPax(timeTable.pax);
    }
    async function getPriceTables() {
      const q = query(
        priceTablesRef,
        where("area", "==", localStorage.getItem("area"))
      );
      const unsubscribe = onSnapshot(q, (data) => {
        const priceTablesData = data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setPricetables(priceTablesData);
      });
      return () => unsubscribe(); // tell the post component to unsubscribe from listen on changes from firestore
    }

    getPriceTables();
  }, [timeTable]); // useEffect is called every time post changes.
  function handleSubmit(event) {
    event.preventDefault();
    const formData = {
      // create a new objebt to hold the value from states / input fields
      startDate: startDate,
      endDate: endDate,
      pricetable: pricetable,
      pax: pax,
    };

    const validForm = formData.startDate && formData.endDate;
    if (validForm) {
      saveTimetable(formData);
    } else {
      setErrorMessage(
        "Alle felter markeret med rød stjerne skal være udfyldte"
      );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>
        Periode
      </h3>
      <div className="dates">
      <div className="startdate dateinput">
        <p>Start dato:</p>
        <input
          type="date"
          required
          onChange={(e) => setStartDate(e.target.value)}
          />
      </div>
      <div className="enddate dateinput">
        <p>Slut dato:</p>
        <input
          type="date"
          required
          onChange={(e) => setEndDate(e.target.value)}
          />
          </div>
      </div>
      <h3>Pristabel</h3>
      <div className="pricetable-label">
      <label htmlFor="pricetable">Pristabel:</label>
      <select
        id="pricetable"
        name="pricetable"
        onChange={(e) => setPricetable(e.target.value)}
        >
        {pricetables.map((pricetable) => (
          <option key={pricetable.id} value={pricetable.name}>
            {pricetable.name}
          </option>
        ))}
      </select>
        </div>
      <h3>Pax</h3>
      <div className="pax-label">
      <label>Antal Pax:</label>
      <input
        type="number"
        min="1"
        max="100"
        onChange={(e) => setPax(e.target.value)}
        />
        </div>
      <h3>Tilkøb</h3>
      <div className="extra-items-label">
      <label>Mulighed for tilkøb til turen?</label>
      <input type="checkbox" value="tilkoeb" />
      </div>
      <h3>Special</h3>
      <div className="special-label">
      <label>Er denne tur en special tur?</label>
      <input type="checkbox" value="special" />
      </div>
      <p>{errorMessage}</p>
      <div className="submit-btn">
      <button type="submit">Gem fartplan</button>
      </div>
    </form>
  );
}
