import { Helmet } from "react-helmet";
import SignInForm from "../components/SignInForm";
import logo from "../images/disko-line-emblem.png";

export default function SignInPage() {
  return (
    <div className="public_page">
      <Helmet>
        <title>Log in til Disko Line Admin</title>
      </Helmet>
      <img src={logo} alt="Disko Line" className="signinlogo" />
      <div className="titleandform">
        <h1>Administration</h1>
        <SignInForm />
      </div>
    </div>
  );
}
