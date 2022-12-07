import { useEffect, useState } from "react";

export default function StopForm({saveStop, stop}){
    const [danishName, setDanishName] = useState("");
    const [englishName, setEnglishName] = useState("");
    const [greenlandicName, setGreenlandicName] = useState("");
    const [code, setCode] = useState("");
    const [info1, setInfo1] = useState(false);
    const[info2, setInfo2] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        if (stop) {
            // if post, set the states with values from the post object.
            // The post object is a prop, passed from UpdatePage
            setDanishName(stop.danish_name);
            setEnglishName(stop.english_name);
            setGreenlandicName(stop.greenlandic_name);
            setCode(stop.code);
            setInfo1(stop.info1);
            setInfo2(stop.info2);
        }
    }, [stop]); // useEffect is called every time post changes.

    
    function handleSubmit(event) {
        event.preventDefault();
        const formData = {
            // create a new objebt to hold the value from states / input fields
            danish_name: danishName,
            english_name: englishName,
            greenlandic_name: greenlandicName,
            code: code,
            info1: info1,
            info2: info2,
        };

        
        const validForm = formData.danish_name && formData.english_name && formData.greenlandic_name; // will return false if one of the properties doesn't have a value
        if (validForm) {
            saveStop(formData);
        } else {
            setErrorMessage("Alle felter skal være udfyldt");
        }
    }
    return(
    <form onSubmit={handleSubmit}>
    <label>
        Dansk:
        <input type="text" value={danishName} onChange={e => setDanishName(e.target.value)} />
    </label>
    <label>
        Engelsk:
        <input type="text" value={englishName}  onChange={e => setEnglishName(e.target.value)} />
    </label>
    <label>
        Grønlandsk:
        <input type="text" value={greenlandicName} onChange={e => setGreenlandicName(e.target.value)} />
    </label>
    <label>
        Kode:
        <input type="text" maxLength={3} value={code} onChange={e => setCode(e.target.value.toUpperCase())} />
    </label>
    <h3>Opsaml informationer</h3>
    <h4>Ønskes der at samles informationer om kundens rejse?</h4>
    <label>
    "Hvor overnatter du?"
    <input type="checkbox"  value={info1} defaultChecked={info1} onChange={e=> setInfo1(e.target.value)}/>
    </label>
    <label>
    "Hvilket flyselskab flyver du med til Grønland?"
    <input type="checkbox" value={info2} defaultChecked={info2} onChange={e=> setInfo2(e.target.value)}/>
    </label>
    <p className="text-error">{errorMessage}</p>
    <button type="submit">Gem</button>
</form>
    )
}