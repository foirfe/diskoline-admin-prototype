import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./style/style.css";
import { auth } from "./firebaseConfig";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
//Pages
import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import StopsIndex from "./pages/stops/StopsIndex";
import RoutesIndex from "./pages/routes/RoutesIndex";
import PricetableIndex from "./pages/pricetables/PricetablesIndex";
import TimetablesIndex from "./pages/timetables/TimetablesIndex";
import SailingTimesIndex from "./pages/sailingtimes/SailingTimesIndex";
import ForgottenPassword from "./pages/ForgottenPassword";
import StopsArea from "./pages/stops/StopsArea";
import TimetableArea from "./pages/timetables/TimetableArea";
import RoutesArea from "./pages/routes/RoutesArea";
import PricetablesArea from "./pages/pricetables/PricetablesArea";
import SailingTimesArea from "./pages/sailingtimes/SailingTimesArea";
import StopsEditStop from "./pages/stops/StopsEditStop";
import StopsNewStop from "./pages/stops/StopsNewStop";
import RoutesNewRoute from "./pages/routes/RoutesNewRoute";
import RoutesEditRoute from "./pages/routes/RoutesEditRoute";
import TimetableRoute from "./pages/timetables/TimetableRoute";
import TimetableNew from "./pages/timetables/TimetableNew";
import TimetableEdit from "./pages/timetables/TimetableEdit";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [areaSelected, setAreaSelected] = useState(false);
  const getauth = auth;

  useEffect(() => {
    function handleareaSelected() {
      if (localStorage.getItem("area")) {
        setAreaSelected(true);
      }
    }
    handleareaSelected();
  });
  console.log(areaSelected);
  onAuthStateChanged(getauth, (user) => {
    if (user) {
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
    } else {
      setIsAuth(false);
      localStorage.removeItem("isAuth");
    }
  });

  const privateRoutes = (
    <div>
      <Topbar />
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/forside" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/forside" />} />
          {/* STOPPESTEDER */}
          <Route
            path="/stoppesteder"
            element={areaSelected ? <StopsArea /> : <StopsIndex />}
          />
          <Route
            path="/stoppesteder/nytstoppested"
            element={<StopsNewStop />}
          />
          <Route path="/stoppesteder/:stopId" element={<StopsEditStop />} />
          {/*RUTER */}
          <Route
            path="/ruter"
            element={areaSelected ? <RoutesArea /> : <RoutesIndex />}
          />
          <Route path="/ruter/nyrute" element={<RoutesNewRoute />} />
          <Route path="/ruter/:routeId" element={<RoutesEditRoute />} />
          {/* PRISTABELLER */}
          <Route
            path="/pristabeller"
            element={areaSelected ? <PricetablesArea /> : <PricetableIndex />}
          />
          {/* FARTPLANER */}
          <Route
            path="/fartplaner"
            element={areaSelected ? <TimetableArea /> : <TimetablesIndex />}
          />
          <Route path="/fartplaner/:routeId" element={<TimetableRoute />} />
          <Route
            path="fartplaner/:currentRoute/nyfartplan"
            element={<TimetableNew />}
          />
          <Route
            path="/fartplaner/redigere/:timetableId"
            element={<TimetableEdit />}
          />
          {/* SEJLTIDER */}
          <Route
            path="/sejltider"
            element={
              areaSelected ? <SailingTimesArea /> : <SailingTimesIndex />
            }
          />
        </Routes>
      </div>
    </div>
  );

  const publicRoutes = (
    <div>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/glemt-kode" element={<ForgottenPassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );

  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}

export default App;
