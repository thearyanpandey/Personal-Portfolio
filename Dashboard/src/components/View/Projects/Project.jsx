import NavBar from "../../Home/NavBar"
import ProjectSetting from "./ProjectSetting"

function UserView() {
  return (
    <div className="flex h-screen bg-[#383838]">
      <NavBar/>
      
      <div className="flex-1 ml-16 mr-4 mt-2 mb-2 rounded-3xl bg-[#F6F6F6] overflow-auto">
        <ProjectSetting/>
      </div>
    </div>
  )
}

export default UserView