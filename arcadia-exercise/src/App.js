import React, { Component } from 'react';
import './App.css';
import Contacts from './contacts.json';

console.log(Contacts);

var contactsArr = Contacts.contacts;

console.log(contactsArr);


contactsArr.forEach(element => {
  var name1 = element.name;
  var name2 = name1.replace(/[^a-z]/gi, ' ')
  .replace(/ +/g, ' ');
  element.name = name2;
  var phone1 = element.phone;
  var phone2 = phone1.replace(/\D/g, ''); 
  var m = phone2.match(/^(\d{3})(\d{3})(\d{4})$/);
  element.phone = "(" + m[1] + ") " + m[2] + "-" + m[3];
});

console.log(contactsArr);


// contactsArr.forEach(element => {
//   element.name = ;
//   var name2 = name1.replace(/[^a-zA-Z]/g, ' ')
//     .replace(/ +/g, ' ');
//   console.log(name2);
// });


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src='./ap-logo_white.png' className="App-logo" alt="logo" />
          <span className="App-title">Contact Manager</span>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
