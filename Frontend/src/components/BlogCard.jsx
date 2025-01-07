import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Resume from "../assets/Resume.png";
import Button from "./Button";
import axios from "axios";

export default function BlogCard() {
  const [resumeLink, setResumeLink] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios(
        "https://portfolio-backend-q094.onrender.com/api/v1/user/me",
        {
          withCredentials: true,
        }
      );

      setResumeLink(data.user.ResumeLink);
    };
    getUser();
  }, []);
  const driveLink = `https://${resumeLink}`;

  function HandelResume() {
    window.open(driveLink, "_blank");
  }
  return (
    <div className="h-[250px] flex-1 bg-custom-gradient shadow-lg rounded-2xl p-6 flex flex-col items-center justify-between">
      <div className="flex-grow flex items-center justify-center">
        <img src={Resume} alt="Signature" className="w-24" />
      </div>
      <div className="w-full flex justify-between items-end mt-4">
        <div>
          <p className="text-gray-500 text-xs mb-1">MORE ABOUT ME</p>
          <h2 className="text-white text-2xl font-bold">Resume</h2>
        </div>
        <Button onClick={HandelResume} />
      </div>
    </div>
  );
}
