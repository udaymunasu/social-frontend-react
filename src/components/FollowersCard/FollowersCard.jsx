import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { getAllUser } from "../../api/UserRequests";
import User from "../user/user";
import { useSelector } from "react-redux";
// import FollowersModal from "../FollowersModal/FollowersModal";

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      {/* <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      /> */}
    </div>
  );
};

export default FollowersCard;
