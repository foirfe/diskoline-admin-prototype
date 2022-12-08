import { Helmet } from "react-helmet";
import placeholder1 from "../images/Placeholder1.png";
import placeholder2 from "../images/Placeholder2.png";
import placeholder3 from "../images/Placeholder3.png";
import placeholder4 from "../images/Placeholder4.png";

export default function Dashboard() {
  return (
    <div className="dashboard_page">
      <Helmet>
        <title>Disko Line Admin</title>
      </Helmet>
      <h1>Dashboard</h1>
      <p>Her vises der eksempel på hvordan en Dashboard side kunne se ud</p>
      <div className="upper-dashboard">
        <div>
          <h2>Nyeste ændringer</h2>
          <img src={placeholder1} alt="Placeholder 1" />
        </div>
        <div>
          <h2>Seneste Logins</h2>
          <img src={placeholder2} alt="Placeholder 2" />
        </div>
        <div>
          <h2>Obs. Punkter</h2>
          <img src={placeholder3} alt="Placeholder 3" />
        </div>
      </div>
      <div className="lower-dashboard">
        <div>
          <h2>Salg af billetter for året</h2>
          <img src={placeholder4} alt="Placeholder 4" />
        </div>
      </div>
    </div>
  );
}
