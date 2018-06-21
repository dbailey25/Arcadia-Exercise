import React from "react";
import "./components.css"

export const NewContact = props => (
  <form>
      <span>Name: </span>
      <input
        className="form-control form-input-pers"
        value={props.name}
        onChange={props.handleInputChange}
        name="name"
        placeholder={props.name}
      />
      <span>Email: </span>
      <input
        className="form-control form-input-pers"
        value={props.email}
        onChange={props.handleInputChange}
        name="email"
        placeholder={props.email}
      />
      <span>Phone: </span>
      <input
        className="form-control form-input-pers"
        value={props.phone}
        onChange={props.handleInputChange}
        name="phone"
        placeholder={props.phone}
      />
    </form>
);
