import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../../api/UserRequests";
import "./Userprofile.css";
import User from "../user/user";
import { getTimelinePosts } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const UserDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log("params", params);
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [followersData, setFollowersData] = useState([]);
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let { posts, loading } = useSelector((state) => state.postReducer);
  console.log("posts start", userData, posts);

  useEffect(() => {
    // Fetch timeline posts

    // Fetch user data and followers' data
    const fetchData = async () => {
      try {
        const response = await getUser(userId);
        setUserData(response.data.user);
        fetchFollowersData(response.data.user.followers);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, [dispatch, userId]);

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // const posts = "";


  if (!posts) return "No Posts";

  if (params.userId) {
    posts = posts.posts.filter((posts) => posts.userId === params.userId);
  } else {
    posts = posts.posts;
  }

  const fetchFollowersData = async (followerIds) => {
    const followers = [];
    for (const followerId of followerIds) {
      try {
        const response = await getUser(followerId);
        followers.push(response.data.user);
      } catch (error) {
        console.error(
          `Error fetching follower details for user with ID ${followerId}:`,
          error
        );
      }
    }
    setFollowersData(followers);
    console.log("followersData", followersData);
  };
  const serverPublic =
    process.env.REACT_APP_PUBLIC_FOLDER || "http://localhost:3000/images/";
  return (
    <div className="user-profile">
      {userData && (
        <>
          <div className="cover-photo">
            <img
              src={
                userData.coverPicture
                  ? serverPublic + userData.coverPicture
                  : serverPublic + "defaultCover.jpg"
              }
              alt="Cover"
            />
          </div>
          <div className="profile-info">
            <div className="profile-picture">
              <img
                src={
                  userData.coverPicture
                    ? serverPublic + userData.coverPicture
                    : serverPublic + "defaultCover.jpg"
                }
                alt="Profile"
              />
            </div>
            <div className="user-details">
              <h2>
                {userData.firstname} {userData.lastname}
              </h2>
              <p>Email: {userData.email}</p>
              <p>Lives in: {userData.livesin}</p>
              <p>Works at: {userData.worksat}</p>
              <p>Relationship: {userData.relationship}</p>
              {/* Add more user details here */}
            </div>
          </div>

          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Posts" value="1" />
                <Tab label="Friends" value="2" />
                <Tab label="Photos" value="3" />
                <Tab label="Videos" value="4" />
                <Tab label="About" value="5" />
                <Tab label="Settings" value="6" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="post-content">
                {posts.map((post) => (
                  <div className="post" key={post._id}>
                    <div className="post-header">
                      <img
                        className="avatar"
                        src={
                          userData.coverPicture
                            ? serverPublic + userData.coverPicture
                            : serverPublic + "defaultCover.jpg"
                        }
                        alt="Cover"
                      />
                      <div className="post-header-info">
                        <h3>
                          {userData.firstname} {userData.lastname}
                        </h3>
                        <p>{userData.createdAt}</p>
                      </div>
                    </div>
                    <div className="post-body">
                      {post.image && (
                        <img
                          className="post-image"
                          src={serverPublic + post.image}
                          alt="Post"
                        />
                      )}
                      <p>{post.desc}</p>
                    </div>
                    <div className="post-actions">
                      <button className="like-button">
                        {post.likes.length} Likes
                      </button>
                      {/* Add more action buttons if needed */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="followers-section">
                <h3>Followers</h3>
                <ul>
                  {Array.isArray(followersData) &&
                    followersData.map((follower) => (
                      <User key={follower._id} person={follower}></User>
                    ))}
                </ul>
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div className="images-card">
                {posts.map((post) => (
                  <div className="post-images">
                    {post.image && (
                      <img src={serverPublic + post.image} alt="Post" />
                    )}
                  </div>
                ))}
              </div>
            </TabPanel>

            <TabPanel value="4">Item Three</TabPanel>
            <TabPanel value="5">Item Three</TabPanel>
            <TabPanel value="6">Item Three</TabPanel>
          </TabContext>
        </>
      )}
      {!userData && <p>Loading...</p>}
    </div>
  );
};

export default UserDetails;
