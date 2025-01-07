import CredentialsCard from "../CredentialsCard";
import WorkTogetherCard from "../WorkTogetherCard";
import SocialsCard from "../SocialsCard";
import SelfSummary from "./SelfSummary";
import ResumeSections from "./ResumeSection";

export default function About() {
  return (
    <div className="bg-[#0F0F0F] ">
      {/* Content Area */}
      <div className="bg-[#0F0F0F] pl-[12%] pr-[12%] pt-[5%]">
        {/* Section 1 */}
        <div className="Section3 bg-[#0F0F0F] max-w-[1320px] mx-auto pt-4"> 
        <SelfSummary/>
        </div>
        {/* Section 2 */}
        <div className="Section2 bg-[#0F0F0F] max-w-[1320px] mx-auto p-4">
          <ResumeSections/>
        </div>
        {/* Section 3 */}
        <div className="Section3 bg-[#0F0F0F] max-w-[1320px] mx-auto p-4 ">
          <div className="flex space-x-4">
            <SocialsCard />
            <WorkTogetherCard />
            <CredentialsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
