import { useNavigate } from "react-router-dom";
import TimeTableForm from "../../components/TimeTableForm";

export default function TimetableNew(){
const navigate = useNavigate();

function handleGoBack(){
    navigate("/fartplaner");
}
    return(
        <div className="page timetablepage">
        <button onClick={handleGoBack}>Tilbage</button>
        <h1>Fartplaner</h1>
        <h2>Opret ny fartplan</h2>
        <TimeTableForm/>
        </div>
    )
}