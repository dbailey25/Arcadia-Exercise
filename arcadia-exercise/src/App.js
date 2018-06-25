import React, { Component } from 'react';
import './App.css';
import Contacts from './contacts.json';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Contact } from './components';

// Parse and format input data
var contactsArr = Contacts.contacts;
let parsedContacts = [];

// const parseContacts = () => {
//   contactsArr.forEach(element => {
//     var id1 = element.id;
//     var id2 = parseInt(id1, 10);
//     element.id = id2;
//     var name1 = element.name;
//     var name2 = name1.replace(/[^a-z]/gi, ' ')
//     .replace(/ +/g, ' ');
//     element.name = name2;
//     var phone1 = element.phone;
//     var phone2 = phone1.replace(/\D/g, ''); 
//     var m = phone2.match(/^(\d{3})(\d{3})(\d{4})$/);
//     element.phone = "(" + m[1] + ") " + m[2] + "-" + m[3];
//   });
//   parsedContacts=contactsArr;
//   console.log('parsedContacts', parsedContacts);

// };

// parseContacts();


// var keys = Object.keys(parsedContacts[0]);
// var fields = keys.map(function (x) { return x.toUpperCase() })
// console.log('fields', fields);



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: parsedContacts,
      sort: {
        column: null,
        direction: 'desc',
      },
      modal: false,
      id: 0,
      name: '',
      email: '',
      phone: '',
      contactCount: 0
    };

    this.toggleAdd = this.toggleAdd.bind(this);
    this.getContact = this.getContact.bind(this);
  }

  parseContacts = () => {
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
    parsedContacts = contactsArr;
    console.log('parsedContacts', parsedContacts);

  };

  componentDidMount() {
    this.parseContacts();
    this.setState({
      contacts: parsedContacts
    })
  }


  renderContact = (contact, index) => {
    return (
      <tr id={contact.id} className='contact-row' key={index} contacts-item={contact} data-toggle="modal" data-target="#exampleModal" onClick={() => this.getContact(contact)}>
        <td contacts-title="Name">{contact.name}</td>
        <td contacts-title="Email">{contact.email}</td>
        <td contacts-title="Phone">{contact.phone}</td>
      </tr>
    );
  }

  toggleAdd() {
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

        return 0;        
      }
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
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  } // end method, handleInputChange

  addContact = () => {
    if (this.state.name && this.state.email && this.state.phone) {
      let recordNumber = parsedContacts.length + 1;
      let newRecord = {
        id: recordNumber,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
      };    
      contactsArr.push(newRecord);
      this.parseContacts();
      this.setState({
        modal: !this.state.modal
      });
    }
  }

  getContact = (contact) => {
    console.log('getContact');
    
    console.log(contact);
    this.setState({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    })    
  }

  editContact = (contact) => {   
    console.log('editContact');
    let editedContact = {      
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    };   
    console.log('editedContact', editedContact);
    
    let i = this.state.id -1;
    contactsArr.splice(i, 1, editedContact);
    this.parseContacts()
    this.setState({
      contactCount: contactsArr.length
    })
  }

  deleteContact = () => {
    let i = this.state.id - 1;
    contactsArr.splice(i, 1);    
    this.setState({
      contactCount: contactsArr.length
    })
  }


  render() {

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
                {/* {parsedContacts.map((contact, index) => this.renderContact(contact, index))} */}
                {this.state.contacts.map((contact, index) => this.renderContact(contact, index))}
              </tbody>
            </table>
            <div id='add-contact' onClick={this.toggleAdd}>
            + Add new contact
            </div>

                {/* Add Contact Modal */}

            <div>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggleAdd}>Add Contact</ModalHeader>
                <ModalBody>
                  <Contact
                    handleInputChange={this.handleInputChange}                 
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.addContact}>Add</Button>{' '}
                  <Button color="secondary" onClick={this.toggleAdd}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>

            {/* Edit Contact Modal */}

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Contact</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <Contact
                      handleInputChange={this.handleInputChange}
                      name={this.state.name}
                      email={this.state.email}
                      phone={this.state.phone}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => this.editContact()} data-dismiss="modal">Save</button>
                    <button type="button" className="btn btn-danger" onClick={() => this.deleteContact()} data-dismiss="modal">Delete</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                  </div>
                </div>
              </div>
            </div>            
          </div>
        </div >
      );
  }
}


export default App;
