// styles
import "./Dashboard.css";
//hooks
import { useCollection } from "../../hooks/useCollection";
import { useState } from "react";
//context
import { useAuthContext } from "../../context/AuthContext";
// components
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import Sidebar from "../../components/Sidebar";
import OnlineUsers from "../../components/OnlineUsers";

export default function Dashboard() {
  const { currentUser } = useAuthContext();
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const project1 = documents
    ? documents.filter((document) => {
        return document.projectStatus === "live";
      })
    : null;

  const projects = project1
    ? project1.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (u.id === currentUser.uid) {
                assignedToMe = true;
              }
            });
            return assignedToMe;
          case "development":
          case "design":
          case "sales":
          case "marketing":
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="dashboard-container">
      {currentUser && <Sidebar />}
      <div className="dashboard-project-list">
        {error && <p className="error">{error}</p>}

        {documents && (
          <ProjectFilter
            changeFilter={changeFilter}
            currentFilter={currentFilter}
          />
        )}
        {projects && <ProjectList projects={projects} />}
      </div>
      {currentUser && <OnlineUsers />}
    </div>
  );
}
