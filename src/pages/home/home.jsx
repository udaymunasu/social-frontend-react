import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import RightSide from "../../components/RightSide/RightSide";
import "./home.css";
import ProfileSide from "../../components/profileSide/profileSide";

const Home = () => {
  return (
    <div className="Home"> 
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
