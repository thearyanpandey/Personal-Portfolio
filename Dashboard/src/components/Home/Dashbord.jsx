import NavBar from "./NavBar";
import Preview from "./Preview";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-[#383838]">
      <NavBar/>
      <div className="w-[96%] ml-16 mr-4 mt-2 mb-2 rounded-3xl bg-[#F6F6F6]">
        <div className="h-full overflow-y-auto">
          <Preview/>
        </div>
      </div>
    </div>
  );
}