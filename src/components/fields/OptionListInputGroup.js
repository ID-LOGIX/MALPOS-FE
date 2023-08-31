import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const OptionListInputGroup = ({ options }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <InputGroup className="">
      <FormControl
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
        value={value}
        onChange={handleChange}
        list="options-list"
      />
      <datalist id="options-list">
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
      <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faPlus}/> </InputGroup.Text>

    </InputGroup>

  );
};

export default OptionListInputGroup;
