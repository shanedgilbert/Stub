import React from 'react';
import {getLocalUser} from "../../../actions/login";
import {addToList} from "../../../actions/shows";
import {addListShow}  from "../../../actions/lists"
import { useDispatch } from 'react-redux';
import "./modal.css";

const ModalDropdown = (prop) => {
    const dispatch = useDispatch();

    const handleAddToList = (show, listID) => {
      //dispatch(addToList(show, listID))
      dispatch(addListShow(listID, show))
    }

    return (
        <div className = "modalAddDropdown">
            {!(getLocalUser() == null) && prop.list.length > 0 ?
                <div className = "dropdown">
                  <div className = "editMenuContentModal">
                      {prop.list.map((listItem, index) => {
                        return (
                          <button key = {listItem.listsList_id} className = "dropdownLinkModal" onClick={() => handleAddToList(prop.props, listItem.listsList._id)} disabled = {!listItem.isDisplay}>Add to {listItem.listsList.name}</button>
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