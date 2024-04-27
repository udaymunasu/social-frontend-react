import React, { useState, useEffect } from "react";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import { Link, useNavigate } from "react-router-dom";
import { getAllUser } from "../../api/UserRequests";

const LogoSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user

  useEffect(() => {
    // Fetch all users when the component mounts
    getAllUser()
      .then((response) => {
        setAllUsers(response.data); // Store all users in state
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);

    // Filter users based on search query
    const filteredUsers = allUsers.filter(
      (user) =>
        (user.firstname &&
          user.firstname.toLowerCase().includes(value.toLowerCase())) ||
        (user.lastname &&
          user.lastname.toLowerCase().includes(value.toLowerCase()))
    );
    console.log("filteredUsers", filteredUsers);
    setSearchResults(filteredUsers);
    setSelectedUser(null);
  };

  const handleUserClick = (userId) => {
    setSelectedUser(userId); // Set the selected user when a user is clicked
  };

  return (
    <div className="LogoSearch">
      <Link to="../home">
        <img src={Logo} alt="" />
      </Link>

      <div className="Search">
        <input
          type="text"
          placeholder="#Explore"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>

      {/* Render search results dropdown */}
      {searchQuery !== "" && (
        <div className="SearchResultsDropdown">
          {searchResults.length > 0 ? (
            <ul className="SearchResultsList">
              {searchResults.map((user) => (
                <li key={user._id} onClick={() => handleUserClick(user._id)}>
                  
                  <Link
                    to={`/userprofile/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                   {user.firstname} {user.lastname}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="NoResults">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogoSearch;
