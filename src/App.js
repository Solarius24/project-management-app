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
import OnlineUsers from "./components/OnlineUsers";

function App() {
  const currentUser = useAuthContext();
  const onClickHandler = () =>{

  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        {currentUser && <Sidebar/>}
        {/* <button className="app-button" onClick={onClickHandler}>SHOW USER LIST</button> */}
        <div className="container">
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
        {currentUser && <OnlineUsers />}
      </BrowserRouter>
    </div>
  );
}

export default App;
