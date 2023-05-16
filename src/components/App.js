import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";



function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const[contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, {id: uuidv4(), ...contact }]);
    console.log(contact);
  };

const removeContactHandler = (id) => {
  const newContactlist = contacts.filter((contact) => {
    return contact.id !== id;
  });

  setContacts(newContactlist);
};

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className='ui container'>
      <Router>
      < Header />
      <Switch>
        <Route 
          path="/" 
          exact 
          render={(props) => (
            <ContactList 
            {...props} 
            contacts={contacts} 
            getContactId  = {removeContactHandler}/>)}
        />
          <Route
            path="/add" 
            render={(props)=>(<AddContact {...props} addContactHandler={addContactHandler}/>)}
          />

          <Route path="/contact/:id" component={ContactDetail}/>
        </Switch>
        
          {/* <AddContact addContactHandler={addContactHandler}/> */ }
          {/* <ContactList contacts={contacts} getContactId  = {removeContactHandler} /> */ }
      </Router>
    </div>
  );
  
}

export default App;         