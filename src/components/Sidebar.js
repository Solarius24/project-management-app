//styles & images
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import ProjectComplitedIcon from "../assets/project-completed-icon.svg";
//components
import Avatar from "./Avatar";
//libraries
import { NavLink } from "react-router-dom";
//context
import { useAuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { currentUser } = useAuthContext();
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={currentUser.photoURL} />
          <p>{currentUser.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/completed_projects">
                <img src={ProjectComplitedIcon} alt="add project icon" />
                <span>Completed Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add project icon" />
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
