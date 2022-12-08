import SignInForm from "../components/SignInForm";
import logo from "../images/disko-line-emblem.png";

export default function SignInPage() {
  return (
    <div className="public_page">
      <img src={logo} alt="Disko Line" className="signinlogo" />
      <div className="titleandform">
        <h1>Administration</h1>
        <SignInForm />
      </div>
    </div>
  );
}
