import React, { Component } from 'react';
import './App.css';
import Contacts from './contacts.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NewContact } from './components';

// Parse and format input data
var contactsArr = Contacts.contacts;
let parsedContacts = [];

const parseContacts = () => {
  contactsArr.forEach(element => {
    var id1 = element.id;
    var id2 = parseInt(id1, 10);
    element.id = id2;
    var name1 = element.name;
    var name2 = name1.replace(/[^a-z]/gi, ' ')
    .replace(/ +/g, ' ');
    element.name = name2;
    var phone1 = element.phone;
    var phone2 = phone1.replace(/\D/g, ''); 
    var m = phone2.match(/^(\d{3})(\d{3})(\d{4})$/);
    element.phone = "(" + m[1] + ") " + m[2] + "-" + m[3];
  });
  parsedContacts=contactsArr;
  console.log('parsedContacts', parsedContacts);

};

parseContacts();

console.log(parsedContacts);

var keys = Object.keys(parsedContacts[0]);
var fields = keys.map(function (x) { return x.toUpperCase() })
console.log('fields', fields);



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      sort: {
        column: null,
        direction: 'desc',
      },
      modal: false,
      name: '',
      email: '',
      phone: ''
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({ contacts: parsedContacts });
  }

  // this.toggle = this.toggle.bind(this);
  // }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }; // end method, handleInputChange

  addContact = () => {
    let recordNumber = parsedContacts.length + 1;
    let newRecord = {
      id: recordNumber,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    };    
    contactsArr.push(newRecord);
    parseContacts();
    this.setState({
      modal: !this.state.modal
    });

  }

  render() {
     var newContacts = this.state.contacts;

      return (
        <div className="App">
          <header className="App-header">
            <img src='./ap-logo_white.png' className="App-logo" alt="logo" />
            <span className="App-title">Contact Manager</span>
          </header>
          <div className='content'>
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
            <div id='add-contact' onClick={this.toggle}>
            + Add new contact
            </div>

                {/* Add Contact Modal */}

            <div>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Add New Contact</ModalHeader>
                <ModalBody>
                  <NewContact
                    handleInputChange={this.handleInputChange}                 
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.addContact}>Add Contact</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
            
          </div>
        </div >
      );
  }
}


export default App;
