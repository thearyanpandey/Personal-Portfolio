import FeaturedWork from "../FeaturedWork";
import CredentialsCard from "../CredentialsCard";
import ProjectsCard from "../ProjectsCard";
import BlogCard from "../BlogCard";
import ServicesCard from "../ServicesCard";
import ProfileCard from "../ProfileCard";
import StatsCard from "../StatsCard";
import WorkTogetherCard from "../WorkTogetherCard";
import SocialsCard from "../SocialsCard";

export default function Home() {
  return (
    <div className="bg-[#0F0F0F] ">
      
      {/* Content Area */}
      <div className="bg-[#0F0F0F] pl-[12%] pr-[12%] pt-[5%]">
        {/* Section 1 */}
        <div className="Section1 bg-[#0F0F0F] max-w-[1320px] mx-auto p-4">
          <div className="flex space-x-6 h-[318px]">
            <ProfileCard />
            <div className="flex-1 space-y-4">
              <FeaturedWork />
              <div className="flex space-x-6 h-[78%]">
                <CredentialsCard />
                <ProjectsCard />
              </div>
            </div>
          </div>
        </div>
        {/* Section 2 */}
        <div className="Section2 bg-[#0F0F0F] max-w-[1320px] mx-auto p-4">
          <div className="flex space-x-4 h-[250px]">
            <div className="flex-1">
              <BlogCard />
            </div>
            <div className="flex-[2]">
              <ServicesCard />
            </div>
            <div className="flex-1">
              <SocialsCard />
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="Section3 bg-[#0F0F0F] max-w-[1320px] mx-auto p-4 ">
          <div className="flex space-x-4">
            <StatsCard />
            <WorkTogetherCard />
          </div>
        </div>
      </div>
    </div>
  );
}
