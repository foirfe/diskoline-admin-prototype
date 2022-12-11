import { signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

import logo from "../images/disko-line-emblem.png";
import DropdownItem from "./DropdownItem";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const getauth = auth;
  const navigate = useNavigate();
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  function handleSignOut() {
    signOut(getauth);
    navigate("/");
  }
  function handleLogoNavigation() {
    navigate("/forside");
  }

  return (
    <div className="topbar">
      <img
        src={logo}
        alt="Site Logo"
        className="topbar-image"
        onClick={handleLogoNavigation}
      />

      <div className="menu-container" ref={menuRef}>
        <div
          className="menu-trigger"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <p>
            User
            {open ? `▲` : `▼`}
          </p>
        </div>

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <ul>
            <DropdownItem text={"Redigere bruger"} />
            <div onClick={handleSignOut}>
              <DropdownItem text={"Log Ud"} />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
