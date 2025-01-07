import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Aryan from "../../assets/Aryan1.png";
import ProjectCard from "./ProjectCard";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await axios(
          "http://localhost:5000/api/v1/project/getall",
          {
            withCredentials: true,
          }
        );
        //console.log(data);
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="pl-[14%] pr-[14%] pt-[6.25rem] flex">
      {/* Left column */}
      <div className="w-[34%] bg-[#0F0F0F]">
        {projects.slice(0, 2).map((project, index) => (
          <div key={project._id} className={index === 0 ? "mb-4" : ""}>
            <ProjectCard
              image={project.projectBanner?.url || Aryan}
              height={index === 0 ? "360px" : "500px"}
              width="360px"
              title={project.title}
              description={`Know more about ${project.title}`}
              onClick={() => handleProjectClick(project._id)}
            />
          </div>
        ))}
      </div>
      {/* Right column */}
      <div className="w-[66%] bg-[#0F0F0F]">
        <h1 className="w-full flex text-7xl items-center justify-center mb-4 uppercase text-white font-semibold">
          <span className="mr-2 mt-0">✧</span>
          All Projects
          <span className="ml-2">✧</span>
        </h1>
        <div className="flex">
          <div className="w-[40%] ml-[10px] mr-24">
            {projects.slice(2, 4).map((project, index) => (
              <div key={project._id} className={index === 0 ? "mb-6" : ""}>
                <ProjectCard
                  image={project.projectBanner?.url || Aryan}
                  height="380px"
                  width="360px"
                  title={project.title}
                  description={`Know more about ${project.title}`}
                  onClick={() => handleProjectClick(project._id)}
                />
              </div>
            ))}
          </div>
          <div className="w-[40%]">
            {projects.slice(4, 6).map((project, index) => (
              <div key={project._id} className={index === 0 ? "mb-6" : ""}>
                <ProjectCard
                  image={project.projectBanner?.url || Aryan}
                  height="380px"
                  width="360px"
                  title={project.title}
                  description={`Know more about ${project.title}`}
                  onClick={() => handleProjectClick(project._id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
