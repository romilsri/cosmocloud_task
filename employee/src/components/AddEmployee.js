import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://cosmocloud.io/';

function AddEmployee() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState({ line1: '', city: '', country: '', zip: '' });
  const [contacts, setContacts] = useState([{ contact_method: 'EMAIL', value: '' }]);

  const navigate = useNavigate();

  const handleAddContact = () => {
    setContacts([...contacts, { contact_method: 'EMAIL', value: '' }]);
  };

  const handleSave = async () => {
    try {
      await axios.post(`${API_BASE_URL}/employees`, { name, address, contacts });
      navigate('/');
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <div>
          <h3>Address</h3>
          <label>
            Line 1:
            <input type="text" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
          </label>
          <label>
            City:
            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          </label>
          <label>
            Country:
            <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
          </label>
          <label>
            Zip:
            <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
          </label>
        </div>
        <div>
          <h3>Contacts</h3>
          {contacts.map((contact, index) => (
            <div className="contact-group" key={index}>
              <label>
                Contact Method:
                <select value={contact.contact_method} onChange={(e) => {
                  const newContacts = [...contacts];
                  newContacts[index].contact_method = e.target.value;
                  setContacts(newContacts);
                }}>
                  <option value="EMAIL">Email</option>
                  <option value="PHONE">Phone</option>
                </select>
              </label>
              <label>
                Value:
                <input type="text" value={contact.value} onChange={(e) => {
                  const newContacts = [...contacts];
                  newContacts[index].value = e.target.value;
                  setContacts(newContacts);
                }} />
              </label>
            </div>
          ))}
          <button type="button" className="add-contact" onClick={handleAddContact}>Add Contact</button>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default AddEmployee;
