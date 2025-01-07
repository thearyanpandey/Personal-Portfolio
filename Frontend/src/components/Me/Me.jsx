import MeCard from "./MeCard";
import ResumeSections from "../About/ResumeSection";
import Details from "./Details";
import Skills from "./Skills";

function Me() {
  return (
    <div className="pl-[14%] pr-[14%] pt-[6.25rem] flex">
      {/* ----------------------- */}
      <div className="w-[34%] bg-[#0F0F0F] ">
        <div className="mb-4">
          <MeCard/>
        </div>
      </div>
      {/* ----------------------- */}
      <div className="w-[66%] bg-[#0F0F0F] ">
      <Details/>
      <ResumeSections/>
      <Skills/>
      </div>
      {/* ----------------------- */}
    </div>
  );
}

export default Me;
