import React from "react";
import { ArrowRight, Instagram, Twitter } from "lucide-react";
import Button from "./Button";
import { useNavigate } from 'react-router-dom';

export default function SocialsCard() {
  const navigate = useNavigate();

  function HandelSocialCard(){
    navigate('/contact')
  }

  return (
    <div className="h-[250px] bg-custom-gradient shadow-lg rounded-3xl p-6 flex flex-col justify-between">
      <div className="flex justify-center pt-[30px]">
        <div className="bg-[#232323] rounded-2xl p-3 flex space-x-4">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <Instagram className="w-10 h-10 text-white" />
          </div>
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <Twitter className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-end">
        <div>
          <p className="text-gray-500 text-xs mb-1">STAY WITH ME</p>
          <h2 className="text-white text-2xl font-bold">Profiles</h2>
        </div>
     <Button onClick={HandelSocialCard} />
      </div>
    </div>
  );
}