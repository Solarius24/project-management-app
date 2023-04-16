//styles
import "./CompletedProjects.css";
//components
import Sidebar from "../../components/Sidebar";
import ProjectList from "../../components/ProjectList";
//hooks
import { useCollection } from "../../hooks/useCollection";

export default function CompletedProjects() {
  const { documents } = useCollection("projects");
  const completedProjects = documents
    ? documents.filter((document) => {
        return document.projectStatus === "completed";
      })
    : null;

  return (
    <div className="completed-projects-container">
      {/* <Sidebar /> */}
      <div className="completed-projects-list">
        {completedProjects && <ProjectList projects={completedProjects} />}
      </div>
    </div>
  );
}
