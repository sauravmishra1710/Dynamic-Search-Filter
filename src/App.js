import { useState, useEffect } from 'react'
import Axios from "axios";
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

function App() {
  const [searchItem, setSearchItem] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCaseSensitiveToggleSelected, setCaseSensitiveToggleSelected] = useState(false);

  let name_full_formatted = "";

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
      })
    },
  []);


  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = users.filter((user) => {
      name_full_formatted = user.firstName + " " + user.lastName;
      if (isCaseSensitiveToggleSelected) {
        return name_full_formatted.includes(searchTerm);
      }
    else {
      return name_full_formatted.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });
  
      setFilteredUsers(filteredItems);
  }

  return (
    <div style={{margin: "10px", justifyContent: "center", display: "grid"}}> 
      <h1>Dynamic Search Filter</h1>
      <div style={{height: "30px",margin: "10px", justifyContent: "space-evenly", display: "flex"}}>   
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder='Type to search'
        />
        <div style={{height: "30px", justifyContent: "space-evenly", display: "flex"}}>
        <ToggleButton
          value="check"
          selected={isCaseSensitiveToggleSelected}
          onChange={() => {
            setCaseSensitiveToggleSelected(!isCaseSensitiveToggleSelected);
          }}>
            
        <CheckIcon />
        </ToggleButton>
        <span style={{alignSelf: "center", fontSize: "6px", color: "red", fontWeight: "bold"}}>Select for case<br/> sensitive search</span>
        </div>
    </div>  

      {!loading && !error && filteredUsers.length === 0
        ? <p>No users found based on the search key.</p>
        : <ul>
          {
            filteredUsers.map(user => {
            name_full_formatted = user.firstName + " " + user.lastName;
            return <li key={user.id}>{name_full_formatted}</li>; })
          }
        </ul>
      }
    </div>
  )
}

export default App