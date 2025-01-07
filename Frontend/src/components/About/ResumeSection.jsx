import React from 'react';

const ResumeItem = ({ years, title, subtitle }) => (
  <div className="mb-6">
    <p className="text-gray-500 text-sm mb-1">{years}</p>
    <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
    <p className="text-gray-400 text-sm">{subtitle}</p>
  </div>
);

const ResumeSection = ({ title, items }) => (
  <div className="bg-custom-gradient shadow-lg rounded-3xl p-6">
    <h2 className="text-white text-xl font-bold mb-6">{title}</h2>
    {items.map((item, index) => (
      <ResumeItem key={index} {...item} />
    ))}
  </div>
);

const ResumeSections = () => {
  const experienceItems = [
    { years: "2023 - 20XX", title: "Freelance", subtitle: "Freelance Work" },
    { years: "Oct'23 - Dec'23", title: "Content Designer", subtitle: "Brain Behaviour Research Foundation of India (BBFI)" },
  ];

  const educationItems = [
    { years: "2023 - 2027", title: "B.Tech in Production and Industrial Engineering", subtitle: "Delhi Technological University (DTU)" },
    { years: "2020 - 2022", title: "Senior Secondary Schooling", subtitle: "Punchsheel Balak Inter College" },
  ];

  return (
    <div className="flex space-x-6 bg-[#0F0F0F] p-2 rounded-3xl">
      <div className="flex-1">
        <ResumeSection title="EXPERIENCE" items={experienceItems} />
      </div>
      <div className="flex-1">
        <ResumeSection title="EDUCATION" items={educationItems} />
      </div>
    </div>
  );
};

export default ResumeSections;