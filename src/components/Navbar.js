import { Link } from "react-router-dom";
// styles & images
import "./Navbar.css";
import Temple from "../assets/temple.svg";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";


export default function Navbar() {
  const { logout, isPendingLogout } = useLogout();
  const { user } = useAuthContext()
  console.log(isPendingLogout)
  console.log('logout', logout)
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>PROJECT MANAGEMENT SYSTEM</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {!isPendingLogout && (
              <button className="btn" onClick={logout}>
                Logout
              </button>
            )}
            {isPendingLogout && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
