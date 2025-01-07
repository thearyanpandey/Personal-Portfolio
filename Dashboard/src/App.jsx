import Dashboard from "./components/Home/Dashbord";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Home/Signup";
import UserView from "./components/View/User/UserView";
import Project from "./components/View/Projects/Project";
import Skill from "./components/View/Skills/Skill";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./components/Home/ForgotPassword";
import ResetPassword from './components/Home/ResetPassword'
import ViewProject from "./components/View/Projects/ViewProject";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Store/slices/userSlice";
import { getAllSkills } from "./Store/slices/skillSlice";
import { getAllProjects } from "./Store/slices/projectSlice";
import EditProject from "./components/View/Projects/EditProject";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllSkills());
    dispatch(getAllProjects());
  }, []);

  return (
    <Router>
      <div className=" min-h-screen">
        <main className="container ">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Signup />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword/>}/>
            <Route path="/setting/profile" element={<UserView />} />
            <Route path="/setting/project" element={<Project />} />
            <Route path="/setting/project/view/:id" element={<ViewProject />} />
            <Route path="/setting/project/update/:id" element={<EditProject />} />
            <Route path="/setting/skills" element={<Skill />} />
          </Routes>
        </main>
      </div>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;

