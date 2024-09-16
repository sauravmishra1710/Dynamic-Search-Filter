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

  useEffect(() => {
    Axios.get("https://dummyjson.com/users")
      .then((response) => {
        if (response.status === 200) {
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

  const filterUsers = (searchTerm, isCaseSensitiveToggleSelected) => { 
    // we previously set the input state here, 
    // you can remove that now
    const filteredUsers = users.filter((user) => {
      const name_full_formatted = user.firstName + " " + user.lastName;
      if (isCaseSensitiveToggleSelected) {
        return name_full_formatted.includes(searchTerm);
      } else {
        return name_full_formatted
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
    });

    setFilteredUsers(filteredUsers);
  }

  return (
    <div style={{ margin: "10px", justifyContent: "center", display: "grid" }}>
      <h1>Dynamic Search Filter</h1>
      <FilterComponent onChangeCallback={filterUsers} />
      {loading && <p className="text">Loading...</p>}
      {error && <p className="text">Error loading users...</p>}
      {!loading && !error && <UsersList users={filteredUsers} />}
    </div>
  );
}

export default App;
