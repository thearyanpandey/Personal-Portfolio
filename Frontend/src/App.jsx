import Header from "./components/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Contacts from "./components/Contacts/Contacts";
import Technologies from "./components/Technolgies/Technologies";
import Me from './components/Me/Me'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectDetails from "./components/Projects/ProjectDetails";
function App() {
  return (
    <Router >
      <div className="bg-[#0F0F0F] text-white min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stack" element={<Technologies />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/works" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/me" element={<Me/>} />
          </Routes>
        </main>
        <div className="pl-[15%] pr-[15%] pt-[6.25rem]">
        <Footer />
      </div>
      </div>
    </Router>
  );
}

export default App;
