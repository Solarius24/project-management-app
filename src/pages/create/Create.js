// styles
import "./Create.css";
//hooks
import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
//firebase functions
import { timestamp } from "../../firebase/config";
//libraries
import Select from "react-select";
import useFirestore from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
//components
import Sidebar from "../../components/Sidebar";
import OnlineUsers from "../../components/OnlineUsers";
//context
import { useAuthContext } from "../../context/AuthContext";


const categories = [
  { value: "constriction", label: "Construction" },
  { value: "design", label: "Design" },
  { value: "quality", label: "Quality" },
  { value: "logistics", label: "Logistics" },
  { value: "planning", label: "Planning" },
];

export default function Create() {
  const { addDocument } = useFirestore("projects");
  const currentUser = useAuthContext();
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  // form field values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      setUsers(
        documents.map((user) => {
          return { value: { ...user, id: user.id }, label: user.displayName };
        })
      );
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a project category.");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user");
      return;
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });
    const createdBy = {
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      id: currentUser.uid,
    };

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      assignedUsersList,
      createdBy,
      comments: [],
      projectStatus: "live",
      complitionDate: null,
    };
    await addDocument(project);
    navigate("/");
  };

  return (
    <div className="create-form-container">
      {/* {currentUser && <Sidebar />} */}
      <div className="create-form">
        <h2 className="page-title">Create a new Project</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Project name:</span>
            <input
              required
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            <span>Project Details:</span>
            <textarea
              required
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            ></textarea>
          </label>
          <label>
            <span>Set due date:</span>
            <input
              required
              type="date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
          </label>
          <label>
            <span>Project category:</span>
            <Select
              onChange={(option) => setCategory(option)}
              options={categories}
            />
          </label>
          <label>
            <span>Assign to:</span>
            <Select
              onChange={(option) => setAssignedUsers(option)}
              options={users}
              isMulti
            />
          </label>

          <button className="btn">Add Project</button>

          {formError && <p className="error">{formError}</p>}
        </form>
      </div>
      {currentUser && <OnlineUsers />}
    </div>
  );
}
