import { FolderClock, AudioLines, Instagram, FolderKanban } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Aryan from "../../assets/Aryan1.png";
import { Button } from "@/components/ui/button";
//import { Card, CardContent } from "@/components/ui/card";
//import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";

import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearAllSkillErrors } from "../../Store/slices/skillSlice";
import { clearAllProjectErrors } from "../../Store/slices/projectSlice";

const data = [
  { name: "Proficiency above 50%", value: 14810 },
  { name: "Proficiency below 50%", value: 3560 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Preview() {
  const navigateTo = useNavigate();
  // const gotoMangeSkills = () => {
  //   navigateTo("/setting/skills");
  // };
  // const gotoMangeTimeline = () => {
  //   navigateTo("/setting/profile");
  // };
  const gotoMangeProjects = () => {
    navigateTo("/setting/project");
  };

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);

  console.log("skills:", skills);

  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );
  console.log("projects:", projects);

  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    // if (appError) {
    //   toast.error(appError);
    //   dispatch(clearAllSoftwareAppErrors());
    // }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    // if (appMessage) {
    //   toast.success(appMessage);
    //   setAppId(null);
    //   dispatch(resetSoftwareApplicationSlice());
    //   dispatch(getAllSoftwareApplications());
    // }
    // if (timelineError) {
    //   toast.error(timelineError);
    //   dispatch(clearAllTimelineErrors());
    // }
  }, [dispatch, skillLoading, skillError, skillMessage]);

  return (
    <div>
      <main className="flex-1 p-8 ">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            {user && user.avatar && user.avatar.url ? (
              <Avatar>
                <AvatarImage src={user.avatar.url} alt="User Avatar" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
            ) : (
              <p>Loading avatar...</p> 
            )}
            <div>
              <h1 className="text-xl font-semibold">Greetings! 👋</h1>
              <p className="text-sm text-gray-600">{user.firstName} </p>
            </div>
          </div>
          <div className="flex items-center space-x-8 mr-[60px]">
            <div className="relative">
              <Card>
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardFooter>
                  <p>{projects.length} </p>
                </CardFooter>
              </Card>
            </div>
            <div className="relative ">
              <Card>
                <CardHeader >
                  <CardTitle className="mr-8 flex items-center" >Skills</CardTitle>
                </CardHeader>
                <CardFooter>
                  <h1>{skills.length} </h1>
                </CardFooter>
              </Card>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Profile</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-black text-white rounded-2xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-10">
                      <span className="text-2xl font-bold">About</span>
                      <Button>
                        <span className="text-sm">Edit</span>
                      </Button>
                    </div>
                    <div className="text-sm">{user.aboutMe}</div>
                  </CardContent>
                </Card>
                <Card className="bg-white rounded-2xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-10">
                      <span className="text-2xl font-bold">Education</span>
                      <Button>
                        <span className="text-sm">Edit</span>
                      </Button>
                    </div>
                    <div className="text-sm">{user.education} </div>
                    <div className="text-sm">{user.education}</div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="flex space-x-4">
              <Button
                onClick={gotoMangeProjects}
                className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl py-6"
              >
                <FolderKanban size={20} className="mr-2" />
                <span>Projects</span>
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-white rounded-xl py-6"
              >
                <FolderClock size={20} className="mr-2" />
                <span>Timeline</span>
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-white rounded-xl py-6"
              >
                <AudioLines size={20} className="mr-2" />
                <span>Experience</span>
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-white rounded-xl py-6"
              >
                <Instagram size={20} className="mr-2" />
                <span>Socials</span>
              </Button>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
              <div className="w-full">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="pb-2 pl-[20px] pr-[40px] font-normal">
                        Title
                      </th>
                      <th className="pb-2 font-normal">Deployed</th>
                      <th className="pb-2 font-normal">Options</th>
                      <th className="pb-2 pr-[10px] font-normal text-right">
                        View
                      </th>
                    </tr>
                  </thead>
                </table>
                <div className="max-h-[160px] overflow-y-auto">
                  <table className="w-full">
                    <tbody>
                      {projects && projects.length > 0 ? (
                        projects.map((element) => {
                          return (
                            <tr key={element.id}>
                              <td className="py-3 flex items-center space-x-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage
                                    src={element.projectBanner.url}
                                    alt="James Smith"
                                  />
                                  {/* <AvatarFallback>JS</AvatarFallback> */}
                                </Avatar>
                                <span>{element.title}</span>
                              </td>
                              <td className="py-3 text-gray-500">
                                {element.stack}
                              </td>
                              <td className="py-3">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                  {element.deployed}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                {element.technologies}{" "}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
                            You have not added any project.
                          </TableCell>
                        </TableRow>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

          <div>
            <section className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Skills</h2>
                <Button>Edit</Button>
              </div>

              <div className="h-56 flex justify-center items-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={data}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  {/* Adding text in the center of the pie chart */}
                  <text
                    x={100}
                    y={100}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-current text-lg font-semibold"
                  >
                    {" "}
                    {skills.length}
                  </text>

                  <Tooltip />
                </PieChart>
              </div>

              <div className="space-y-4 overflow-hidden overflow-y-scroll h-[270px]">
                {skills.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <img
                          src={item.skillSvg.url}
                          className="text-blue-600 font-semibold"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-xs text-gray-500"></p>
                      </div>
                    </div>
                    <span className="text-red-500 font-semibold">
                      {item.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Preview;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
