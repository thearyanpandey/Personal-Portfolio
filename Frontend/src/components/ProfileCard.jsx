import { ArrowRight } from "lucide-react";
import Aryan from "../assets/Aryan1.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfileCard() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profile, setProfile] = useState("");
  const [city, setCity] = useState("");

  function HandelProfileCard() {
    navigate("/about");
  }

  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/user/portfolio/me",
        { withCredentials: true }
      );
      //console.log(data);
      setFirstName(data.user.firstName);
      setLastName(data.user.lastName);
      setProfile(data && data.user && data.user.avatar.url);
      setCity(data.user.city);
    };
    getMyProjects();
  }, []);

  return (
    <div className="flex bg-custom-gradient p-6 shadow-lg rounded-3xl overflow-hidden max-w-2xl">
      <div className="w-1/2">
        <img
          src={profile ? profile : Aryan}
          style={{ height: "265px", width: "290px" }}
          alt="David Henderson"
          className="w-full h-full object-cover rounded-tl-[40px] rounded-tr-[0px] rounded-br-[40px] rounded-bl-[0px]"
        />
      </div>
      <div className="w-1/2 p-8 flex flex-col">
        <p className="text-gray-400 text-sm mb-2">A WEB DEVELOPER</p>
        <h1 className="text-4xl font-bold mb-2 text-white">
          {firstName}
          <br />
          {lastName}.
        </h1>
        <p className="text-gray-400 text-sm">
          I am a Web Designer based
          <br />
          in {city}
        </p>
        <div className="mt-auto self-end mt-[35px]">
          <Button onClick={HandelProfileCard} />
        </div>
      </div>
    </div>
  );
}
