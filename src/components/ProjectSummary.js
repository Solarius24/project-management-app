import Avatar from "./Avatar";
import useFirestore from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from ".././context/AuthContext";
import { timestamp } from "../firebase/config";
import "./ProjectSummary.css"

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore("projects");
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const { updateDocument } = useFirestore("projects");

  const handleDelete = () => {
    deleteDocument(project.id);
    navigate("/");
  };

  const handleComplete = () => {
    updateDocument(project.id, {
      projectStatus: "completed",
      complitionDate: timestamp.fromDate(new Date()),
    });
  };

  return (
    <div>
      <div className="project-summary">
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        {project.projectStatus === "completed" && (
          <p>Complition Date: {project.complitionDate.toDate().toDateString()}</p>
        )}
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <p>{user.displayName}</p>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      </div>
      {currentUser.uid === project.createdBy.id &&
        (project.projectStatus === "live" ? (
          <button className="btn" onClick={handleComplete}>
            Mark as Complete
          </button>
        ) : (
          <button className="btn" onClick={handleDelete}>
            Delete Project
          </button>
        ))}
    </div>
  );
}
