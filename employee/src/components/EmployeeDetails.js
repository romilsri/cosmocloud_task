import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://cosmocloud.io/';

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee", error);
      }
    }
    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>Employee Details</h1>
      <p>Name: {employee.name}</p>
      <p>ID: {employee.emp_id}</p>
      <p>Address: {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}</p>
      <p>Contacts:</p>
      <ul>
        {employee.contacts.map((contact, index) => (
          <li key={index}>{contact.contact_method}: {contact.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeDetails;
