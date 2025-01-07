import React from "react";
import { ArrowRight} from "lucide-react";
import { SiReact} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function SocialsCard() {
  const navigate = useNavigate();

  function HandelStack(){
    navigate('/stack')
  }
  return (
    <div className="h-[250px] bg-custom-gradient shadow-lg rounded-3xl p-6 flex flex-col justify-between">
      <div className="flex justify-center pt-[30px]">
        <div className=" rounded-2xl p-3 flex space-x-6">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <SiReact className="w-10 h-10 text-white" />
          </div>
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <RiJavascriptFill className="w-10 h-10 text-white" />
          </div>
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <FaPython className="w-10 h-10 text-white" />
          </div>
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <FaJava className="w-10 h-10 text-white" />
          </div>
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <RiJavascriptFill className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-end">
        <div>
          <p className="text-gray-500 text-xs mb-1">STAY WITH ME</p>
          <h2 className="text-white text-2xl font-bold">Technologies</h2>
        </div>
        {/* <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-white" />
        </button> */}
        <Button onClick={HandelStack}/>
      </div>
    </div>
  );
}