import { React, useState } from "react";
import PropTypes from 'prop-types'
import { Switch, FormControlLabel } from "@mui/material";

const propTypes = {
    onChangeCallback: PropTypes.func,
}

const FilterComponent = ({ onChangeCallback }) => {
  // state to handle the input value
  const [searchItem, setSearchItem] = useState('')
  const [isCaseSensitiveToggleSelected, setCaseSensitiveToggleSelected] = useState(false);

  // new handler function that will update the state 
  // when the input changes
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchItem(inputValue)
    // if the component receives a callback, call it,
    // and pass the input value as an argument
    onChangeCallback && onChangeCallback(inputValue, isCaseSensitiveToggleSelected)
  }

  return (
    <div style={{ height: "30px", margin: "10px", justifyContent: "grid" }}>
        <input
          type="text"
          value={searchItem}
          onChange={handleInputChange}
          placeholder="Type to search"
          style={{ width: "310px" }}
        />
        <div style={{ height: "30px", display: "flex" }}>
          <FormControlLabel
            control={
              <Switch
                onChange={() => {
                  setCaseSensitiveToggleSelected(!isCaseSensitiveToggleSelected);
                }}
              ></Switch>
            }
            label="Turn ON for case sensitive search"
            style={{ color: "red" }}
          ></FormControlLabel>
        </div>
      </div>
  )
}

FilterComponent.propTypes = propTypes;
export default FilterComponent