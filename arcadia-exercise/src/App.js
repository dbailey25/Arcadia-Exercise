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
    contacts: [],
    sort: {
      column: null,
      direction: 'desc',
    }
  };

  componentDidMount() {
    this.setState({ contacts: contactsArr });
  }

  onSort = (column) => (e) => {
    const direction = this.state.sort.column ? (this.state.sort.direction === 'asc' ? 'desc' : 'asc') : 'desc';
    const sortedData = this.state.contacts.sort((a, b) => {
      if (column === 'name') {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      } else if (column === 'email') {
        const emailA = a.email.toUpperCase();
        const emailB = b.email.toUpperCase();
        if (emailA < emailB) {
          return -1;
        }
        if (emailA > emailB) {
          return 1;
        }

        // emails must be equal
        return 0;
      } else {
        const phoneA = a.phone.toUpperCase();
        const phoneB = b.phone.toUpperCase();
        if (phoneA < phoneB) {
          return -1;
        }
        if (phoneA > phoneB) {
          return 1;
        }

        // phones must be equal
        return 0;        
      }
      // else {
      //   return a.contractValue - b.contractValue;
      // }
    });

    if (direction === 'desc') {
      sortedData.reverse();
    }

    this.setState({
      data: sortedData,
      sort: {
        column,
        direction,
      }
    });
  };

  setArrow = (column) => {
    let className = 'sort-direction';

    if (this.state.sort.column === column) {
      className += this.state.sort.direction === 'asc' ? ' asc' : ' desc';
    }

    console.log(className);

    return className;
  };


  render() {
     var newContacts = this.state.contacts;

      return (
        <div className="App">
          <header className="App-header">
            <img src='./ap-logo_white.png' className="App-logo" alt="logo" />
            <span className="App-title">Contact Manager</span>
          </header>

        <table className="table">
          <thead>
            <tr>
                <th onClick={this.onSort('name')}>NAME<span className={this.setArrow('name')}></span></th>
                <th onClick={this.onSort('email')}>EMAIL<span className={this.setArrow('email')}></span></th>
                <th onClick={this.onSort('phone')}>PHONE<span className={this.setArrow('phone')}></span></th>
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
