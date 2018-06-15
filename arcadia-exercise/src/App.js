import React, { Component } from 'react';
import './App.css';
import Contacts from './contacts.json';

console.log(Contacts);

var contactsArr = Contacts.contacts;

console.log(contactsArr);


contactsArr.forEach(element => {
  var name1 = element.name;
  var name2 = name1.replace(/[^a-zA-Z]/g, ' ')
  .replace(/ +/g, ' ');
  // console.log(name2);
  element.name = name2;
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
