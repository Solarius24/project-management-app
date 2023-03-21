// styles
import "./App.css";
//libraries
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// pages & components
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Navbar from "./components/Navbar";
import CompletedProjects from "./pages/completed_projects/CompletedProjects";
//context
import { useAuthContext } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";

function App() {
  const currentUser = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        {currentUser && <Sidebar/>}
        <div className="container">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/create"
              element={currentUser ? <Create /> : <Navigate to="/login" />}
            />
            <Route
              path="/projects/:id"
              element={currentUser ? <Project /> : <Navigate to="/login" />}
            />
            <Route
              path="/completed_projects"
              element={
                currentUser ? <CompletedProjects /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={!currentUser ? <Login /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!currentUser ? <Signup /> : <Navigate to="/" />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
