import React from 'react';
//import Aryan from "../../assets/Aryan1.png"

const ProfilePicture = ({user}) => {
  //console.log("pic", user)
  return (
    <div className="relative rounded-3xl overflow-hidden bg-[#202020] p-6">
      <div className="relative rounded-3xl overflow-hidden aspect-square">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-300"></div>
        <img
          src={user && user.avatar && user.avatar.url}
          alt="Profile"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProfilePicture;