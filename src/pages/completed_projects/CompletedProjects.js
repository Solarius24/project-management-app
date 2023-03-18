import "./CompletedProjects.css";
import Sidebar from "../../components/Sidebar";
import ProjectList from "../../components/ProjectList";
import { useCollection } from "../../hooks/useCollection";

export default function CompletedProjects() {
  const { documents} = useCollection("projects");
  const completedProjects = documents
    ? documents.filter((document) => {
        return document.projectStatus === "completed";
      })
    : null;

  return (
    <div className="completedProjects-container">
      <Sidebar />
      <div className="completedProjects-list">
        {completedProjects && <ProjectList projects={completedProjects} />}
      </div>
    </div>
  );
}
