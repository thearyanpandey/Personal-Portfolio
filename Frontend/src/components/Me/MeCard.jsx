import React, { useEffect, useState } from "react";
import Aryan from "../../assets/Aryan1.png";
import { Dribbble, Twitter, Instagram, Github, Linkedin } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MeCard = () => {
  const navigate = useNavigate();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios("http://localhost:5000/api/v1/user/me", {
        withCredentials: true,
      });
      //console.log(data);

      setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setTwitter(data.user.twitter);
      setGithub(data.user.gitHub);
      setLinkedin(data.user.linkedIn);
      setPortfolio(data.user.portfolio);
      setInstagram(data.user.instagram);
      setProfilePic(data.user.avatar.url);
    };
    getUser();
  }, []);

  const icons = [
    { name: "Dribbble", component: Dribbble },
    { name: "Twitter", component: Twitter },
    { name: "Instagram", component: Instagram },
    { name: "Github", component: Github },
    { name: "Linkedin", component: Linkedin },
  ];

  const handleContactMe = () => {
    navigate("/contact");
  };

  const handleRedirect = (iconName) => {
    switch (iconName) {
      case "Twitter":
        window.open(`https://${twitter}`, "_blank");
        break;
      case "Dribbble":
        window.open(`https://${portfolio}`, "_blank");
        break;
      case "Instagram":
        window.open(`https://${instagram}`, "_blank");
        break;
      case "Linkedin":
        window.open(`https://${linkedin}`, "_blank");
        break;
      case "Github":
        window.open(`https://${github}`, "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-custom-gradient text-white rounded-3xl shadow-lg max-w-sm mx-auto overflow-hidden fixed top-[20%] left-[12%] right-[65%]">
      <div className="p-6 relative rounded-3xl overflow-hidden aspect-square">
        <div className="absolute " />
        <img
          src={profilePic ? profilePic : Aryan}
          alt="Profile"
          className="w-full h-[350px] object-cover rounded-3xl"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-1">{firstname + " " + lastname} </h2>
        <p className="text-gray-400 text-sm mb-4">@{firstname.toLowerCase()}</p>
        <div className="flex justify-between mb-6">
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
        <button
          onClick={handleContactMe}
          className="w-full py-3 bg-gray-800 hover:bg-gray-700 rounded-md transition-all duration-300 ease-in-out text-sm font-medium"
        >
          Contact Me
        </button>
      </div>
    </div>
  );
};

export default MeCard;
