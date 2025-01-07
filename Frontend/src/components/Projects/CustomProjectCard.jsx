import React from "react";
import Button from "../Button";
import { Dribbble, Twitter, Github } from "lucide-react";
//import { useNavigate } from "react-router-dom";

const CustomProjectCard = ({ project }) => {
  const icons = [
    { name: "Dribbble", component: Dribbble },
    { name: "Github", component: Github },
  ];

  const handleRedirect = (iconName) => {
    switch (iconName) {
      case "Twitter":
        window.open(`https://${gitRepoLink}`, "_blank");
        break;
      case "Dribbble":
        window.open(`https://${projectLink}`, "_blank");
        break;
      case "Github":
        window.open(`https://${gitRepoLink}`, "_blank");
        break;
      default:
        break;
    }
  };

  const {
    projectBanner: { url: imageUrl } = {}, 
    gitRepoLink,
    projectLink,
  } = project || {};

  //console.log(project)

  return (
    <div
      className="fixed bg-[#1F1F1F] rounded-3xl overflow-hidden"
      style={{ height: "400px", width: "340px" }}
      //
    >
      <div className="absolute inset-0 p-5">
        <img
          src={imageUrl}
          //alt={title}
          className="w-full h-[82%] object-cover rounded-2xl"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-custom-gradient shadow-lg p-4 rounded-3xl">
        <div className="flex justify-between items-center  mt-3  ">
          {icons.map(({ name, component: Icon }, index) => (
            <button
              key={index}
              onClick={() => handleRedirect(name)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 ease-in-out"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomProjectCard;
