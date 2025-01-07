import React from "react";
import MeCard from "../Me/MeCard";
import ProjectInfo from "./ProjectInfo";
import ProjectCard from "./ProjectCard";


function ProjectDetails() {
  
  return (
    <div className="pl-[14%] pr-[14%] pt-[2.25rem] flex">
      {/* ----------------------- */}
      <ProjectInfo/>
      {/* ----------------------- */}
    </div>
  );
}

export default ProjectDetails;
