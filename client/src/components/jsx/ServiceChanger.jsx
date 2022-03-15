import React, {useState} from "react";
import { Dropdown } from 'react-bootstrap';
import './ServiceChangerStyles.css';

function ServiceChanger() {

  return (
    <div className="selectorContainer">
      <Dropdown className="selectorDropdown">
        <Dropdown.Toggle variant="dark" id="dropdown-button-dark-service">
          Streaming Service
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark" className="dropdownMenu">
          <Dropdown.Item href="#/action-1">Netflix</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Hulu</Dropdown.Item>
          <Dropdown.Item href="#/action-3">HBO</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="selectorDropdown">
        <Dropdown.Toggle variant="dark" id="dropdown-button-dark-type">
          Type
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark" className="dropdownMenu">
          <Dropdown.Item href="#/action-1">Show</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Movie</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ServiceChanger;