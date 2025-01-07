import React, { useEffect, useState } from "react";
import Aryan from "../../assets/Aryan1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Dribbble,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import ContactForm from "./ContactForm";

function Contacts() {
  const navigate = useNavigate();

  //const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  //const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios(
        "https://portfolio-backend-q094.onrender.com/api/v1/user/portfolio/me",
        {
          withCredentials: true,
        }
      );
      //console.log(data);

      //setName(data.user.fullName);
      setTwitter(data.user.twitter);
      setGithub(data.user.gitHub);
      setLinkedin(data.user.linkedIn);
      setPortfolio(data.user.portfolio);
      setInstagram(data.user.instagram);
      //setProfilePic(data.user.avatar.url);
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
    <div className="pl-[14%] pr-[14%] pt-[6.25rem] flex">
      {/* ----------------------- */}
      <div className="w-[28%] bg-[#0F0F0F] ">
        <div className="bg-[#0F0F0F] text-white  font-sans">
          <h2 className="text-2xl font-bold mb-6">CONTACT INFO</h2>

          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <div className="bg-gray-800 p-3 rounded-lg mr-4">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400 mb-1">MAIL US</p>
                <p>aryanpandey32123@gmail.com</p>
                <p>aryanaquapandey@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-800 p-3 rounded-lg mr-4">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400 mb-1">CONTACT Me</p>
                <p>+91 8285414595</p>
                <p>+91 8285414595</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-gray-800 p-3 rounded-lg mr-4">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400 mb-1">LOCATION</p>
                {/* <p></p> */}
                <p>Delhi</p>
                <p>India</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">SOCIAL INFO</h2>

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
        </div>
      </div>
      {/* ----------------------- */}
      <div className="w-[75%] bg-[#0F0F0F] ">
        <ContactForm />
      </div>
      {/* ----------------------- */}
    </div>
  );
}

export default Contacts;
