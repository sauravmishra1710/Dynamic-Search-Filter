import { React } from "react";
import PropTypes from 'prop-types'

const propTypes = {
    users: PropTypes.arrayOf(PropTypes.string)
}

const UsersList = ({users}) => {
    return (
        <div>
        {users.length === 0
          ? <p>No users found based on the search key.</p>
          : <ul>
          {users.map((user) => {
            const name_full_formatted = user.firstName + " " + user.lastName;
            return <li key={user.id}>{name_full_formatted}</li>;
          })}
        </ul>
        }
      </div>
    )
  }
  
  UsersList.propTypes = propTypes;
  export default UsersList