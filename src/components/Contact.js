import React from "react";
import "./components.css"

export const Contact = props => (
  <form>
      <span>Name: </span>
      <input
        className="form-control"
        value={props.name}
        onChange={props.handleInputChange}
        name="name"
        placeholder='First Last'
      />
      <span>Email: </span>
      <input
        className="form-control"
        value={props.email}
        onChange={props.handleInputChange}
        name="email"
        placeholder='example@example.com'
      />
      <span>Phone: </span>
      <input
        className="form-control"
        value={props.phone}
        onChange={props.handleInputChange}
        name="phone"
        placeholder='(555) 555-5555'
      />
    </form>
);
