import { Helmet } from "react-helmet";

export default function Dashboard() {
  return (
    <div className="dashboard_page">
      <Helmet>
        <title>Disko Line Admin</title>
      </Helmet>
      <h1>Dashboard</h1>
    </div>
  );
}
