// import React, { useEffect, useState } from "react";
import Aryan from "../../../assets/Aryan1.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import SpecialLoadingButton from "../../sub-components/SpecialLoadingBtn";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "../../../Store/slices/projectSlice";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const EditProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(
          `https://portfolio-backend-q094.onrender.com/api/v1/project/get/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
          setProjectBannerPreview(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, error]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
    formData.append("stack", stack);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("projectBanner", projectBanner);
    dispatch(updateProject(id, formData));
  };

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <form onSubmit={handleUpdateProject} className="space-y-8">
        <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
          <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
            UPDATE PROJECT
          </h2>
          <Button onClick={handleReturnToDashboard}>Return to Dashboard</Button>
        </div>

        <div className="space-y-6">
          <div className="w-full">
            <img
              src={projectBannerPreview ? projectBannerPreview : Aryan}
              alt="projectBanner"
              className="w-60 h-60 object-cover"
            />
            <input
              type="file"
              onChange={handleProjectBanner}
              className="mt-4 w-full"
            />
          </div>

          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="MERN STACK PORTFOLIO"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              placeholder="Feature 1. Feature 2. Feature 3."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Technologies Used
            </label>
            <Textarea
              placeholder="HTML, CSS, JAVASCRIPT, REACT"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          {/* Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stack
            </label>
            <Select
              value={stack}
              onValueChange={(selectedValue) => setStack(selectedValue)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Project Stack" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full Stack">Full Stack</SelectItem>
                <SelectItem value="Mern">MERN</SelectItem>
                <SelectItem value="Mean">MEAN</SelectItem>
                <SelectItem value="Next.JS">NEXT.JS</SelectItem>
                <SelectItem value="React.JS">REACT.JS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deployed */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deployed
            </label>
            <Select
              value={deployed}
              onValueChange={(selectedValue) => setDeployed(selectedValue)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Is this project deployed?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Github Repository Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Github Repository Link
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Github Repository Link"
                value={gitRepoLink}
                onChange={(e) => setGitRepoLink(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Link
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Project Link"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          {loading ? (
            <SpecialLoadingButton content={"Updating"} width={"w-52"} />
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-52"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProject;
