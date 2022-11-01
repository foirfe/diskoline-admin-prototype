export default function DropdownItem(props){
    //Dropdown Item - Used in Topbar
    return(
        <li className="dropdownItem">
            <p>{props.text}</p>
        </li>
    )
}