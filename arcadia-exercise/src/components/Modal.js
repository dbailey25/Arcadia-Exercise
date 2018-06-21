import React from "react";
import './components.css';

const Modal = props => {
    // <div className="card mt-4">
    //     <div className="card-header header-style">
    //         <h3>
    //             <strong>
    //                 {props.title}
    //             </strong>
    //         </h3>
    //     </div>
    //     <div className="card-body">{props.children}</div>
    // </div>

    return (
        <div id="contactModal" className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>

        </div>
    );
};

export default Modal;
