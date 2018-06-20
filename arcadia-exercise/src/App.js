import React, { Component } from 'react';
import './App.css';
import Contacts from './contacts.json';
// import { Table } from './components';

// Parse and format input data
var contactsArr = Contacts.contacts;

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

var keys = Object.keys(contactsArr[0]);
var fields = keys.map(function (x) { return x.toUpperCase() })
console.log('fields', fields);






class App extends Component {

  state = {
    contacts: []
  };

  componentDidMount() {
    this.setState({ contacts: contactsArr });
  }

  render() {
     var newContacts = this.state.contacts;

      return (
        <div className="App">
          <header className="App-header">
            <img src='./ap-logo_white.png' className="App-logo" alt="logo" />
            <span className="App-title">Contact Manager</span>
          </header>

        <table className="m-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
            </tr>
          </thead>
          <tbody>
            {newContacts.map(function (contact, index) {
              return (
                <tr key={index} contacts-item={contact}>
                  <td contacts-title="Name">{contact.name}</td>
                  <td contacts-title="Email">{contact.email}</td>
                  <td contacts-title="Phone">{contact.phone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div >
      );
  }
}




  // createTable = (headers, contacts) => {
  //   var table = document.createElement('table');
  //   // var tableHead = document.createElement('thead');
  //   var tableBody = document.createElement('tbody');

  //   console.log('headers', headers);
    

    // headers.forEach(function (headerData) {
    //   var headerRow = document.createElement('tr');

    //   headerData.forEach(function (headerName) {
    //     var header = document.createElement('td'); header.appendChild(document.createTextNode(headerName));
    //     headerRow.appendChild(header);
    //   });

    //   tableHead.appendChild(headerRow);
    // });

    // contacts.forEach(function (rowData) {
    //   var row = document.createElement('tr');

    //   rowData.forEach(function (cellData) {
    //     var cell = document.createElement('td');
    //     cell.appendChild(document.createTextNode(cellData));
    //     row.appendChild(cell);
    //   });

    //   tableBody.appendChild(row);
    // });

  //   table.appendChild(tableBody);
  //   document.body.appendChild(table);
  // }
  

  // render() {
  //   console.log(this.state.contacts);
  //   console.log(this.state.fields);
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src='./ap-logo_white.png' className="App-logo" alt="logo" />
  //         <span className="App-title">Contact Manager</span>
  //       </header>
  //       <p className="App-intro">
  //         Contacts
  //       </p>
  //       {/* <List>
  //         {contactsArr.map(contact => (
  //           <ListItem key={contact.id}>
  //             <div to={"/contact/" + contact.id}>
  //                 {contact.name}:  {contact.email}:  {contact.phone}
  //             </div>
  //             <DeleteBtn onClick={() => this.deleteCurrentOrder(order._id)} />
  //           </ListItem>
  //         ))
  //         }
  //       </List> */}
  //       <Table
  //         fields={this.state.fields}
  //         contacts={this.state.contacts}
  //         createTable={this.createTable()}
  //       />
  //     </div>
  //   );
  // }
// }

export default App;
