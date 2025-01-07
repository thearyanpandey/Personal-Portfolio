import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomProjectCard from "./CustomProjectCard";

function ProjectInfo() {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios(
          `http://localhost:5000/api/v1/project/get/${id}`,
          {
            withCredentials: true,
          }
        );
        setProject(data.project);
        //console.log("projects", data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    getProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  //console.log(project)

  return (
    <>
      <div className="w-[34%] bg-[#0F0F0F] ">
        <div className="mb-4">
          <CustomProjectCard project={project} />
        </div>
      </div>

      {/* ----------------------- */}
      <div className="w-[66%] bg-[#0F0F0F] ">
        <div className="bg-custom-gradient text-gray-300 p-6 rounded-lg shadow-lg mb-4 mx-auto">
          <h2 className="text-white text-2xl font-bold mb-4">
            {project.title}
          </h2>
          <p className="text-sm leading-relaxed">{project.description}</p>

          <h2 className="text-white text-2xl font-bold mb-2">Stack</h2>
          <p className="text-sm leading-relaxed">{project.stack}</p>
          <h2 className="text-white text-2xl font-bold mb-4">Technologies</h2>
          <p className="text-sm leading-relaxed">{project.technologies}</p>
          <h2 className="text-white text-2xl font-bold mb-4">Deployed</h2>
          <p className="text-sm leading-relaxed">{project.deployed}</p>
          <h2 className="text-white text-2xl font-bold mb-4">
            GitHub Repo Link
          </h2>
          <p className="text-sm leading-relaxed">{project.gitRepoLink}</p>
          <h2 className="text-white text-2xl font-bold mb-4">Project Link</h2>
          <p className="text-sm leading-relaxed">{project.projectLink}</p>
        </div>
      </div>
    </>
  );
}

export default ProjectInfo;
