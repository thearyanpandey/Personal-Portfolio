import { ArrowRight } from "lucide-react"
import Button from "./Button"
import { useNavigate } from "react-router-dom"

export default function ProjectsCard() {
  const navigate = useNavigate();

  function HandelProject(){
    navigate('/works')
  }
  return (
    <div className="flex-1 bg-custom-gradient shadow-lg rounded-2xl p-6 flex flex-col items-center justify-between">
      <div className="flex-grow flex items-center justify-center">
        <img
          src="https://wpriverthemes.com/gridx/wp-content/uploads/2023/04/my-works.png"
          alt="Project Preview"
          className="w-32 rounded-lg"
        />
      </div>
      <div className="w-full mt-4">
        <p className="text-gray-500 text-xs mb-1">SHOWCASE</p>
        <div className="flex justify-between items-end">
          <h2 className="text-white text-2xl font-bold">Projects</h2>
          {/* <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </button> */}
          <Button onClick={HandelProject}/>
        </div>
      </div>
    </div>
  )
}