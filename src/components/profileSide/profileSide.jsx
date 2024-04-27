import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";

import "./profileSide.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import LogoSearch from "../LogoSearch/LogoSearch";
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
