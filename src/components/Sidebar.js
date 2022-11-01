import styles from "./sidebar.module.css"
import { navData } from "../lib/navData"
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar(){
    const [open, setopen] = useState(true)
    const toggleOpen = () => {
        setopen(!open)
    }
    return (
        <div className={open?styles.sidenav:styles.sidenavClosed}>
            <button className={styles.menuBtn} onClick={toggleOpen}>
                {open? <KeyboardDoubleArrowLeftIcon />: <KeyboardDoubleArrowRightIcon />}
            </button>
            {navData.map(item =>{
                return <NavLink key={item.id} className={styles.sideitem} to={item.link}>
                {item.icon}
                <span className={styles.linkText}>{item.text}</span>
            </NavLink>
            })}
        </div>
      )
}