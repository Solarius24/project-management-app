// styles
import "./Project.css";
//hooks
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
//context
import { useAuthContext } from "../../context/AuthContext";
// components
import ProjectComments from "../../components/ProjectComments";
import ProjectSummary from "../../components/ProjectSummary";
import Sidebar from "../../components/Sidebar";

export default function Project() {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id);
  const currentUser = useAuthContext();

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-container">
      <div className="project-details">
        <ProjectSummary project={document} />
        <ProjectComments project={document} />
      </div>
    </div>
  );
}
