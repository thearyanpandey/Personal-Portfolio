import Button from "./Button";
import { useNavigate } from "react-router-dom";

const WorkTogetherCard = () => {
  const navigate = useNavigate();

  function HandelWorkTogether(){
    navigate('/contact');
  }
  
  return (
    <div className="w-[50%] bg-custom-gradient shadow-lg rounded-2xl p-6 flex flex-col justify-between">
      <div className="mb-4">
        <svg className="w-10 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      <div>
        <h2 className="text-white text-5xl font-bold mb-2">
          Let's <br />
          work <span className="text-blue-500">together.</span>
        </h2>
      </div>
      <div className="self-end">
        <Button onClick={HandelWorkTogether}/>
      </div>
    </div>
  );
};

export default WorkTogetherCard;