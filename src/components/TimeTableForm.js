import { useState } from "react";

export default function TimeTableForm({saveTimetable, timeTable}){
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
      
          const formData = {
            // create a new objebt to hold the value from states / input fields
            startDate: startDate,
            endDate: endDate
          };
    
          const validForm = formData.startDate && formData.endDate;
          if (validForm) {
            saveTimetable(formData);
          } else {
            setErrorMessage("Alle felter markeret med rød stjerne skal være udfyldte");
          }
        }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Periode:<span></span>
            </label>
            <div className="startdate">
            <p>Start dato:</p><input type="date" required  onChange={(e) => setStartDate(e.target.value)}/>
            </div>
            <div className="enddate">
            <p>Slut dato:</p>
            <input type="date" required onChange={(e) => setEndDate(e.target.value)}/>
            </div>
            <label>
                Afgang-Ankomst
            </label>
            <label htmlFor="pricetable">
                Pristabel
            </label>
            <select id="pricetable" name="pricetable">
                <option value="pricetable1">Pristabel 1</option>
                <option value="pricetable2">Pristabel 2023</option>
            </select>
            <h3>Pax</h3>
            <label>Antal Pax</label>
            <input type="number" min="1" max="100"/>
            <h3>Tilkøb</h3>
            <label>
                Mulighed for tilkøb til turen?
            </label>
            <input type="checkbox" value="tilkoeb"/>
            <h3>Special</h3>
            <label>Er denne tur en special tur?</label>
            <input type="checkbox" value="special"/>
            <p>{errorMessage}</p>
            <button type="submit">Gem fartplan</button>
        </form>
    )
}