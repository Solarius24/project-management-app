//styles
import "./ProjectList.css";
//components
import Avatar from "../components/Avatar";
//libraries
import { Link } from "react-router-dom";

export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>NO PROJECTS YET!</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <p>
              <strong>Assigned to:</strong>
            </p>
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <p>{user.displayName}</p>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
