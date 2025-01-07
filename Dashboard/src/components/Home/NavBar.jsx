import { FolderGit, History, Home, LogOut, PencilRuler, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState('');

  // Set initial active button based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveButton('home');
    else if (path === '/setting/skills') setActiveButton('skills');
    else if (path === '/setting/project') setActiveButton('projects');
    else if (path === '/setting/profile') setActiveButton('profile');
    else if (path === '/git') setActiveButton('git');
  }, [location.pathname]);

  const handleNavigation = (route, buttonId) => {
    setActiveButton(buttonId);
    navigate(route);
  };

  const NavButton = ({ id, icon, route, tooltip }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation(route, id)}
            className={`transition-colors duration-200 ${
              activeButton === id 
                ? 'bg-gray-200 hover:bg-gray-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="aside fixed w-[4%] h-screen">
      <aside className="w-full h-full flex flex-col items-center pr-2 py-4 space-y-4 justify-between">
        <div className="flex flex-col space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-8 h-8 pl-2 bg-black text-white flex items-center justify-center font-bold text-xl">
                  <Button 
                    onClick={() => handleNavigation('/', 'home')}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    A
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <NavButton 
            id="git"
            icon={<FolderGit className="h-5 w-5" />}
            route="/git"
            tooltip="Repository"
          />

          <NavButton 
            id="skills"
            icon={<History className="h-5 w-5" />}
            route="/setting/skills"
            tooltip="Skills"
          />

          <NavButton 
            id="projects"
            icon={<PencilRuler className="h-5 w-5" />}
            route="/setting/project"
            tooltip="Projects"
          />

          <NavButton 
            id="profile"
            icon={<User className="h-5 w-5" />}
            route="/setting/profile"
            tooltip="Profile"
          />

          <NavButton 
            id="homepage"
            icon={<Home className="h-5 w-5" />}
            route="/"
            tooltip="Dashboard"
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => handleNavigation('/login', 'logout')}
                className="bg-lime-300 hover:bg-lime-400"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </aside>
    </div>
  );
}

export default NavBar;