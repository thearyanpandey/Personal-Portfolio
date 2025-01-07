import axios from "axios";
import { useEffect, useState } from "react";

export default function Skills() {
  const [skills, setSkills] = useState("");

  useEffect(() => {
    const getSkills = async () => {
      const { data } = await axios(
        "http://localhost:5000/api/v1/skill/getall",
        {
          withCredentials: true,
        }
      );
      setSkills(data.skills);
    };
    getSkills();
  }, []);

  // const awards = [
  //   { name: "Bluebase", date: "14 May 2020" },
  //   { name: "Demble", date: "26 June 2018" },
  // ];

  return (
    <div className="mt-5 bg-custom-gradient shadow-lg text-gray-300 p-8 font-sans rounded-3xl">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-white">SKILLS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills &&
            skills.map((skill) => (
              <div key={skill.title} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-lg font-semibold text-white">
                    {skill.title}
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="text-sm mb-2">Non enim praesent</div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* <section>
        <h2 className="text-2xl font-bold mb-6 text-white">AWARDS</h2>
        <div className="space-y-6">
          {awards.map((award) => (
            <div key={award.name} className="mb-4">
              <div className="text-sm text-gray-500 mb-1">{award.date}</div>
              <div className="text-lg font-semibold text-white">
                {award.name}
              </div>
              <div className="text-sm">Non enim praesent</div>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
}
