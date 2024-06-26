import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const getauth = auth;
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  function signIn(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailAndPassword(getauth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/forside");
      })
      .catch((error) => {
        let code = error.code; // saving error code in variable
        console.log(code);
        code = code.replaceAll("-", " "); // some JS string magic to display error message. See the log above in the console
        code = code.replaceAll("auth/", "");
        setErrorMessage(code);
      });
  }
  function handleNavigate() {
    navigate("/glemt-kode");
  }
  return (
    <div>
      <form onSubmit={signIn} className="login-form">
        <div className="form-content">
          <div>
            <label>E-mail:</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Indtast din e-mail"
            ></input>
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Indtast dit password"
            ></input>
          </div>
          <p className="text-error">{errorMessage}</p>
          <button>Log ind</button>
          <p onClick={handleNavigate}>Glemt kode?</p>
        </div>
      </form>
    </div>
  );
}
