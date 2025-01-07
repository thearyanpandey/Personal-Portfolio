"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AirplayIcon } from "lucide-react";

const SkillItem = ({ skill, isHovered, onHover, onClick, isSelected }) => (
  <motion.div
    className={`relative cursor-pointer ${isSelected ? "h-4 w-4" : "h-full"}`}
    onMouseEnter={() => onHover(skill.title)}
    onMouseLeave={() => onHover(null)}
    onClick={(e) => {
      e.stopPropagation();
      onClick(skill.title);
    }}
    animate={{
      width: isHovered && !isSelected ? "5rem" : isSelected ? "12rem" : "4rem",
      height: isSelected ? "12rem" : "100%",
      zIndex: isHovered || isSelected ? 10 : 1,
      y: isSelected ? -50 : 0,
    }}
    transition={{ duration: 0.3 }}
  >
    <div className="h-full w-full rounded-md bg-gray-800">
      {/* Render the SVG */}
      <img
        src={skill.skillSvg.url}
        alt={skill.title}
        className="object-contain h-full w-full p-2"
      />
    </div>
    <div
      className={`absolute top-0 left-0 h-full w-8 flex items-center justify-center 
                  ${isSelected ? "bg-black bg-opacity-50" : ""}`}
    >
      <div
        className={`transform -rotate-90 origin-center whitespace-nowrap text-white font-bold
                    ${isSelected ? "text-lg" : "text-xs"}`}
        style={{
          position: "absolute",
          width: isSelected ? "12rem" : "100%",
          textAlign: "center",
          left: isSelected ? "calc(-6rem + 16px)" : "-50%",
          top: "50%",
        }}
      >
        {skill.title}
      </div>
      {isSelected && (
        <div className="absolute bottom-4 left-0 w-full text-center text-white">
          Proficiency: {skill.proficiency}%
        </div>
      )}
    </div>
  </motion.div>
);

export default function SkillsCarousel() {
  const [skills, setSkills] = useState([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const containerRef = useRef(null);

  const handleSkillClick = (skillTitle) => {
    setSelectedSkill(selectedSkill === skillTitle ? null : skillTitle);
  };

  const handleOutsideClick = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setSelectedSkill(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios(
          "http://localhost:5000/api/v1/skill/getall",
          {
            withCredentials: true,
          }
        );
        setSkills(data.skills || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    getSkills();
  }, []);

  return (
    <div
      className="w-full h-full bg-[#0F0F0F] flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="w-full h-full pl-[15%] pr-[15%] pt-[6.25rem] flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative flex items-center justify-center space-x-2 w-full h-[240px] p-4 bg-[#0F0F0F] rounded-lg shadow-lg"
        >
          {skills.map((skill) => (
            <SkillItem
              key={skill._id}
              skill={skill}
              isHovered={hoveredSkill === skill.title}
              onHover={setHoveredSkill}
              onClick={handleSkillClick}
              isSelected={selectedSkill === skill.title}
            />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl text-white mb-4">
                {skills.find((skill) => skill.title === selectedSkill)?.title}
              </h2>
              <div className="text-white">
                Proficiency:{" "}
                {
                  skills.find((skill) => skill.title === selectedSkill)
                    ?.proficiency
                }
                %
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
