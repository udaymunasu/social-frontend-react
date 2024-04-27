import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/UploadAction";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const serverPublic =
    process.env.REACT_APP_PUBLIC_FOLDER || "http://localhost:3000/images/";

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log(newPost);
      try {
        await dispatch(uploadImage(data));
      } catch (err) {
        console.error(err);
        // Handle error if necessary
        return;
      }
    }

    try {
      await dispatch(uploadPost(newPost));
      resetShare();
    } catch (err) {
      console.error(err);
      // Handle error if necessary
    }
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };

  return (
    <div className="PostShare">
      <div className="postHeader">
        <img
          className="profileImage"
          src={
            user.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="Profile"
        />
        <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
        />
      </div>
      <div className="postOptions">
        <div
          className="option"
          style={{ color: "var(--photo)" }}
          onClick={() => imageRef.current.click()}
        >
          <UilScenery />
          Photo
        </div>

        <div className="option" style={{ color: "var(--video)" }}>
          <UilPlayCircle />
          Video
        </div>
        <div className="option" style={{ color: "var(--location)" }}>
          <UilLocationPoint />
          Location
        </div>
        <div className="option" style={{ color: "var(--shedule)" }}>
          <UilSchedule />
          Schedule
        </div>
        <button
          className="button ps-button"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploading" : "Share"}
        </button>

        <div style={{ display: "none" }}>
          <input type="file" ref={imageRef} onChange={onImageChange} />
        </div>
      </div>
      <div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
