import React, { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import axios from "axios";

const SelfSummary = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-backend-q094.onrender.com/api/v1/user/portfolio/me",
          { withCredentials: true }
        );

        // Using optional chaining to safely access nested properties
        setFirstName(data?.user?.firstName || "");
        setLastName(data?.user?.lastName || "");
        setAboutMe(data?.user?.aboutMe || "");
        setUser(data?.user || "");
        //console.log("setPic", data?.user?.avatar?.url)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="bg-[#0F0F0F] p-6 rounded-3xl flex items-center space-x-6">
      <div className="w-1/3">
        <ProfilePicture user={user} />
      </div>
      <div className="w-2/3">
        <h1 className="text-white text-6xl font-bold flex items-center justify-center pb-7">
          <span className="mr-2 mt-0">✧</span>
          SELF-SUMMARY
          <span className="ml-2">✧</span>
        </h1>
        {/*pt-24 down there*/}
        <div className="bg-custom-gradient shadow-lg rounded-2xl p-8 ">
          <h2 className="text-white text-4xl font-semibold mb-2">
            {firstName + " " + lastName || "Loading..."}
          </h2>
          <p className="text-gray-400 text-lg">{aboutMe || "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export default SelfSummary;
