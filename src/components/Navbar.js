// styles & images
import "./Navbar.css";
import Temple from "../assets/temple.svg";
//hooks
import { useLogout } from "../hooks/useLogout";
//libraries
import { Link } from "react-router-dom";
//context
import {useAuthContext} from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useLogout();
  const { currentUser } = useAuthContext();
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>PROJECT MANAGEMENT SYSTEM</span>
        </li>

        {!currentUser && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {currentUser && (
          <li>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
