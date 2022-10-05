import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Title from './components/Title/Title';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

import './App.scss';

export default function App() {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts') ?? []),
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number,
    )
      ? alert(`${name} is already in contacts.`)
      : setContacts(prevState => [...prevState, contact]);
  };

  const handleDeleteContact = id => {  
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleChangeFilter = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const visibleContacts = () =>
    contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
        contact.number.includes(filter.trim()),
    );

  return (
    <div className="container">
      <h1 className="visually_hidden">Phonebook</h1>

      <Title title="Phonebook" />
      <ContactForm onSubmit={addContact} />

      <Title title="Contacts" />
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        visibleContacts={visibleContacts()}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}