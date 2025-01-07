import React from "react";
import Button from "../Button";
//import { useNavigate } from "react-router-dom";

const ProjectCard = ({ image, height, width, title, description,onClick }) => {
  // const navigate = useNavigate();

  // function HandelProjectDetails(){
  //   navigate('/projects');
  // }

  return (
    <div
      className="relative bg-[#1F1F1F] rounded-3xl overflow-hidden"
      style={{ height: height, width: width }}
      //
    >
      <div className="absolute inset-0 p-5">
        <img
          src={image}
          alt={title}
          className="w-full h-[82%] object-cover rounded-2xl"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-custom-gradient shadow-lg p-4 rounded-3xl">
        <h3 className="text-white  text-sm uppercase mb-1">{title}</h3>
        <div className="flex justify-between items-center">
          <p className=" text-gray-400 text-lg font-semibold">{description}</p>
          <Button onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
