/* eslint-disable no-undef */
import { React, useState, useEffect } from "react";
import Axios from "axios";
import UsersList from './components/Userlist'
import FilterComponent from "./components/FilterModule";


function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load the users list by calling the get method for the dummy users json.
  useEffect(() => {
    Axios.get("https://dummyjson.com/users")
      .then((response) => {
        if (response.status === 200) {
          // initially set both the users & filtered users to the response data.
          // later we will user the filteredUsers list to dynamically filter the list.
          setUsers(response.data.users);
          setFilteredUsers(response.data.users);
        } else {
          Promise.reject();
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filterUsers = (searchKey, isCaseSensitiveToggleSelected) => {
    // using the case sensitive switch state, toggle the functionality
    // to do a case sensitive search.
    const filteredUsers = users.filter((user) => {
      const name_full_formatted = user.firstName + " " + user.lastName;
      if (isCaseSensitiveToggleSelected) {
        return name_full_formatted.includes(searchKey);
      } else {
        return name_full_formatted
          .toLowerCase()
          .includes(searchKey.toLowerCase());
      }
    });

    setFilteredUsers(filteredUsers);
  }

  return (
    <div style={{ margin: "10px", justifyContent: "center", display: "grid" }}>
      <h1>Dynamic Search Filter</h1>
      <FilterComponent onChangeCallback={filterUsers} />
      {loading && <p>Loading...</p>}
      {error && <p>Error loading users...</p>}
      {!loading && !error && <UsersList users={filteredUsers} />}
    </div>
  );
}

export default App;
