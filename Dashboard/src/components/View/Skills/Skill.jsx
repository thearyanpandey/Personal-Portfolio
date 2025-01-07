import NavBar from "../../Home/NavBar"
import SkillSetting from "./SkillSetting"

function Skill() {
  return (
    <div className="flex h-screen bg-[#383838]">
      <NavBar/>
      
      <div className="w-[96%] ml-16 mr-4 mt-2 mb-2 rounded-3xl bg-[#F6F6F6] overflow-hidden">
        <SkillSetting/>
      </div>
    </div>
  )
}

export default Skill;