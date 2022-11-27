export default function BackButton(){
 function handleGoBack(){
     if(localStorage.getItem("area")){
         localStorage.removeItem("area")
     }
 }
    return(
        <button onClick={handleGoBack}>Tilbage</button>
    )
}