import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";

// components
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import Sidebar from "../../components/Sidebar";
import OnlineUsers from "../../components/OnlineUsers";

// styles
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === user.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "development":
          case "design":
          case "sales":
          case "marketing":
            console.log(document.category, currentFilter);
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="dashboard-container">
      {user && <Sidebar />}
      <div className="dashboard-project-list">
        {/* <h2 className="page-title">Dashboard</h2> */}
        {error && <p className="error">{error}</p>}

        {documents && (
          <ProjectFilter
            changeFilter={changeFilter}
            currentFilter={currentFilter}
          />
        )}
        {projects && <ProjectList projects={projects} />}
      </div>
      {user && <OnlineUsers />}
    </div>
  );
}
