import React, {useEffect, useState} from 'react';
import iconClose from '../../resources/themes/dashboard-v1/icons/close.svg'
import UploadZone from "./UploadZone";

const ImportFilePopup = ({upload_endpoint}) => {
    const closePopup =()=>{
        const popup = document.getElementById('importFilePopup')
        popup.style.display = 'none'
    }

    window.onkeydown = function( event ) {
        if (event.keyCode === 27 ) {
            closePopup()
        }
    };

    return (
      <div
        id="importFilePopup"
        className="popup-container vw-100 vh-100  jusitfy-content-center align-items-center p-md-0 p-2"
      >
        <div
          onClick={closePopup}
          className="w-100 h-100 position-absolute outer-modal top-0 left-0"
        ></div>
        <div className="popup position-relative bg-white">
          <img
            onClick={closePopup}
            className="close-btn"
            src={iconClose}
            alt="close"
          />
          <div className="py-3 px-4">
            <div className="border-bottom py-4 d-flex flex-column gap-4 ">
              <span className="fw-bold fs-5">Import your data</span>
            </div>
            <div className={"p-3"}>
              <UploadZone api_endpoint={upload_endpoint} max_files={1} />
            </div>
          </div>
        </div>
      </div>
    );
}

export default ImportFilePopup;
