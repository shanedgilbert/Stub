import React from 'react';
import {getLocalUser} from "../../../actions/login";
import {addToList} from "../../../actions/shows";
import { useDispatch } from 'react-redux';
import "./modal.css";

const ModalDropdown = (prop) => {
    const dispatch = useDispatch();
    const handleAddToList = (show, listID) => {
        dispatch(addToList(show, listID))
    }

    return (
        <div className = "dropdown">
            {!(getLocalUser() == null) ?
                <div className = "dropdown">
                  <div className = "editMenuContentModal">
                      {prop.list.map((listItem, index) => {
                        return (
                          <button key = {listItem._id} className = "dropdownLinkModal" onClick={() => handleAddToList(prop.props, listItem._id)}>Add to {listItem.name}</button>
                        )
                      })}
                    </div>
                  <button className = "editButton">Add To List</button>
                </div>
              :null}
        </div>
    )
}
export default ModalDropdown;