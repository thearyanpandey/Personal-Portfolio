//import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Aryan from "../../../assets/Aryan1.png";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "../../../Store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import SpecialLoadingButton from "../../sub-components/SpecialLoadingBtn";
import { useEffect, useState } from "react";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [firstName, setFirstName] = useState(user && user.firstName);
  const [lastName, setLastName] = useState(user && user.LastName);
  const [email, setEmail] = useState(user && user.email);
  const [education, setEducation] = useState(user && user.education);
  const [awards, setAwards] = useState(user && user.awards);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolio, setPortfolio] = useState(user && user.portfolio);
  const [city, setCity] = useState(user && user.city);
  const [linkedIn, setLinkedIn] = useState(
    user && (user.linkedIn === "undefined" ? "" : user.linkedIn)
  );
  const [gitHub, setGitHub] = useState(
    user && (user.gitHub === "undefined" ? "" : user.gitHub)
  );
  const [instagram, setInstagram] = useState(
    user && (user.instagram === "undefined" ? "" : user.instagram)
  );
  const [ResumeLink, setResumeLink] = useState(
    user && (user.ResumeLink === "undefined" ? "" : user.ResumeLink)
  );
  const [twitter, setTwitter] = useState(
    user && (user.twitter === "undefined" ? "" : user.twitter)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url);

  const dispatch = useDispatch();


  //function to set preview from file
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("education", education);
    formData.append("awards", awards);
    formData.append("phone", phoneNumber);
    formData.append("city", city);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolio);
    formData.append("linkedInURL", linkedIn);
    formData.append("githubURL", gitHub);
    formData.append("instagramURL", instagram);
    formData.append("twitterURL", twitter);
    formData.append("resumeLink", ResumeLink);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Profile Here
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={avatarPreview ? avatarPreview : Aryan}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={avatarHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>First Name</Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  className="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  className="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>City</Label>
                <Input
                  type="text"
                  className="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea
                  className="About Me"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Education</Label>
                <Textarea
                  className="Education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Awards</Label>
                <Textarea
                  className="Awards"
                  value={awards}
                  onChange={(e) => setAwards(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Portfolio URL</Label>
                <Input
                  type="text"
                  className="Portfolio URL"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="text"
                  className="LinkedIn URL"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input
                  type="text"
                  className="Github URL"
                  value={gitHub}
                  onChange={(e) => setGitHub(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input
                  type="text"
                  className="Instagram URL"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Twitter(X) URL</Label>
                <Input
                  type="text"
                  className="Twitter(X) URL"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Resume URL</Label>
                <Input
                  type="text"
                  className="Twitter(X) URL"
                  value={ResumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdateProfile()}
                  className="w-full"
                >
                  Update Profile
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
