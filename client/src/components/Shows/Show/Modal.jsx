import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./modal.css";


const Modal = props => {
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);


  
  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>


          <div className="modal-body">

          <div>
            <button onClick={props.onClose} className="button closeButton">
              x
            </button>
            <img src={props.movieImage} alt={props.title} width="899px"></img>
            
          </div>


          <tr className="modalTable">
          
            <td className="modalOverview">
              <h2 className="modal-title">{props.title} <a href={props.link}><img className="streamingLink" src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-N-Symbol-logo-red-transparent-RGB-png.png" alt="streaming logo" width="30"></img></a></h2>
              
              <p><b>Release Date: </b>{props.date} <b>Runtime: </b> {props.runtime} minutes</p>
              <p>{props.overview}</p>
            </td>
            <td className="modalInfo">
              <p><b>Cast: </b> {props.cast}</p>
            </td>
            </tr>
          <p>{props.children}</p>
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
