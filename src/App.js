import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import './style/style.css';
import { auth } from './firebaseConfig';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
//Pages
import SignInPage from './pages/SignInPage';
import Dashboard from './pages/Dashboard';
import StopsIndex from './pages/stops/StopsIndex';
import RoutesIndex from './pages/routes/RoutesIndex';
import PricetableIndex from './pages/pricetables/PricetablesIndex';
import TimetablesIndex from './pages/timetables/TimetablesIndex';
import SailingTimesIndex from './pages/sailingtimes/SailingTimesIndex';
import ForgottenPassword from './pages/ForgottenPassword';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const getauth = auth;

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
      <Topbar/>
      <div className='app'>
      <Sidebar/>
    <Routes>
      <Route path="/forside" element={<Dashboard/>}/>
      <Route path="*" element={<Navigate to="/forside" />} />
      {/* STOPPESTEDER */}
      <Route path="/stoppesteder" element={<StopsIndex/>}/>
      {/*RUTER */}
      <Route path="/ruter" element={<RoutesIndex />}/>
      {/* PRISTABELLER */}
    <Route path="/pristabeller" element={<PricetableIndex/>}/>
      {/* FARTPLANER */}
      <Route path='/fartplaner' element={<TimetablesIndex/>}/>
        {/* SEJLTIDER */}
        <Route path='/sejltider' element={<SailingTimesIndex/>}/>
    </Routes>
    </div>
  </div>
 );

 const publicRoutes = (
  <div>
    <Routes>
      <Route path="/" element={<SignInPage/>}/>
      <Route path="/glemt-kode" element={<ForgottenPassword/>}/>
    </Routes>
  </div>
 )

  return (
  <main>{isAuth ? privateRoutes : publicRoutes}</main>
  );
}

export default App;
