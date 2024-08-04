import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://cosmocloud.io/';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await axios.get(`${API_BASE_URL}/employees`);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    }
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/employees/${id}`);
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Employee List</h1>
        <Link to="/add-employee">Add New Employee</Link>
      </div>
      {employees.length === 0 ? (
        <p>No Employees in the system</p>
      ) : (
        <ul>
          {employees.map(emp => (
            <li key={emp._id}>
              <Link to={`/employee/${emp._id}`}>{emp.name} ({emp.emp_id})</Link>
              <button className="delete" onClick={() => deleteEmployee(emp._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;
