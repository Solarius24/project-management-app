import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import Sidebar from "../../components/Sidebar";
import useAuthContext from "../../hooks/useAuthContext";

// components
import ProjectComments from "../../components/ProjectComments"
import ProjectSummary from "../../components/ProjectSummary"

// styles
import "./Project.css";

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);
  const { user } = useAuthContext();

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-container">
      {user && <Sidebar />}
      <div className="project-details">
        <ProjectSummary project={document} />
        <ProjectComments project={document} />
      </div>
    </div>
  );
}
