import React, { useEffect, useState } from "react";
import axios from "axios";

const StatsCard = () => {
  const [projectLen, setProjectLen] = useState(null);
  const [skillLen, setSkillLen] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchOptions = {
          credentials: "include",
        };

        // Make both requests concurrently
        const [projectsResponse, skillsResponse] = await Promise.all([
          fetch(
            "http://localhost:5000/api/v1/project/getall",
            fetchOptions
          ),
          fetch(
            "http://localhost:5000/api/v1/skill/getall",
            fetchOptions
          ),
        ]);

        // Check if responses are ok
        if (!projectsResponse.ok || !skillsResponse.ok) {
          throw new Error("One or more requests failed");
        }

        // Parse both responses
        const [projectsData, skillsData] = await Promise.all([
          projectsResponse.json(),
          skillsResponse.json(),
        ]);

        // Set the lengths
        setProjectLen(projectsData.projects?.length || 0);
        setSkillLen(skillsData.skills?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to set some error state here
        setProjectLen(0);
        setSkillLen(0);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[50%] bg-custom-gradient shadow-lg rounded-3xl p-6 flex justify-between items-stretch">
      <div className="bg-[#1E1E1E] rounded-xl p-4 mx-2 flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-1">{projectLen}+</h2>
          <p className="text-[10px] text-gray-500 uppercase whitespace-pre-line leading-tight">
            Projects
          </p>
        </div>
      </div>

      <div className="bg-[#1E1E1E] rounded-xl p-4 mx-2 flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-1">{skillLen}+</h2>
          <p className="text-[10px] text-gray-500 uppercase whitespace-pre-line leading-tight">
            Skills
          </p>
        </div>
      </div>
      <div className="bg-[#1E1E1E] rounded-xl p-4 mx-2 flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-1">02+</h2>
          <p className="text-[10px] text-gray-500 uppercase whitespace-pre-line leading-tight">
            Clients
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
