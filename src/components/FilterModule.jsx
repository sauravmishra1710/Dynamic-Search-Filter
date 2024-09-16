import { React, useState } from "react";
import PropTypes from 'prop-types'
import { Switch, FormControlLabel } from "@mui/material";

const propTypes = {
    onChangeCallback: PropTypes.func,
}

const FilterComponent = ({ onChangeCallback }) => {
  const [searchItem, setSearchItem] = useState('')
  const [isCaseSensitiveToggleSelected, setCaseSensitiveToggleSelected] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchItem(inputValue)
    // use the callback function to pass on the input searcy key & the state
    // of the case sensitive search switch to the parent component to perform the search accordingly.
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