import axios from "axios";
import React, { useEffect, useState } from "react";

function Details() {
  const [aboutMe, setAboutMe] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios(
        "https://portfolio-backend-q094.onrender.com/api/v1/user/me",
        {
          withCredentials: true,
        }
      );
      setAboutMe(data.user.aboutMe);
    };
    getUser();
  }, []);
  return (
    <div className="bg-custom-gradient shadow-lg text-gray-300 p-6 rounded-lg shadow-lg  mb-4 mx-auto">
      <h2 className="text-white text-2xl font-bold mb-4">ABOUT ME</h2>
      <p className="text-sm leading-relaxed">{aboutMe}</p>
    </div>
  );
}

export default Details;
