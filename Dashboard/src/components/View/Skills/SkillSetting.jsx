import { Link } from "lucide-react";
import React, { useState } from "react";
import AddSkill from "./AddSkill";
import ManageSkill from "./ManageSkill";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, UserCog, KeyRound } from "lucide-react";

function Settings() {
  const [selectedComponent, setSelectedComponent] = useState("Profile");
  const navigate = useNavigate();

  function HandleArrowClick() {
    navigate("/");
  }
  return (
    <div className=" flex h-full flex-col">
      <div className="flex-1 flex min-h-0">
        {/* Fixed navigation */}
        <nav className="flex-none w-[250px] p-4">
          <div className="grid gap-4 text-sm text-foreground">
            {/* Back button and Settings header */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => HandleArrowClick()}
                className="hover:text-primary"
              >
                <ArrowLeft size={18} />
              </button>
              <h1 className="text-3xl mr-4 font-semibold">Settings</h1>
            </div>

            {/* Navigation buttons */}
            <button
              className={`flex items-center gap-2 ${
                selectedComponent === "Profile"
                  ? "font-semibold text-primary"
                  : ""
              }`}
              onClick={() => setSelectedComponent("Profile")}
            >
              <User size={18} />
              <span>Skills</span>
            </button>

            <button
              className={`flex items-center gap-2 ${
                selectedComponent === "Update Profile"
                  ? "font-semibold text-primary"
                  : ""
              }`}
              onClick={() => setSelectedComponent("Update Profile")}
            >
              <UserCog size={18} />
              <span>Update Skill</span>
            </button>
          </div>
        </nav>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4">
          {(() => {
            switch (selectedComponent) {
              case "Profile":
                return <ManageSkill />;
              case "Update Profile":
                return <AddSkill />;
              default:
                return <ManageSkill />;
            }
          })()}
        </div>
      </div>
    </div>
  )
}

export default Settings;