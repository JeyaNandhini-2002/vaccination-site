import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {add} from './Servevalidation'

function Addcenter() {
    const [values, setValues] = useState({
        Location: '',
        Place: '',
        Dosage:''
      });
      const navigate = useNavigate();
    
      const [errors, setErrors] = useState({});
      const handleInput = (event) => {
         setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
         };
         const handleSubmit = event => {
          event.preventDefault();
          setErrors(add(values));
        };
        
        const submitForm = () => {
          if (Object.keys(errors).length === 0 && values.Location !== "" && values.Place !== "" ) {
            axios
              .post('http://localhost:5000/add', values)
              .then(res => {
                if (res.data === 'place already exists') {
                  setErrors(prev => ({ ...prev, Location: 'Location already exists' }));
                } else if (res.data === 'added') {
                  navigate('/admin');
                } else {
                  setErrors(prev => ({ ...prev, Location: 'Invalid credentials' }));
                }
              })
              .catch(err => console.error(err));
          } else {
            setErrors({ ...errors, Location: 'Enter required fields' });
          }
        };
        
        
      
    return (
        <div>
          <div className="container">
          <span style={{ color: 'red' }}>{errors.Location}</span>
            <form action="" onSubmit={handleSubmit}>
              <label htmlFor="Location">Location</label>
              <input type="text" id="location" name="Location" onChange={handleInput}/><br />
              <label htmlFor="Place">Place</label>
              <input type="text" id="place" name="Place" onChange={handleInput}/><br />
              <label htmlFor="Dosage">DosageNumber</label>
              <input type="text" id="dosage" name="Dosage" value="10" readOnly /><br />
              <button onClick={submitForm}>Add</button>
            </form>
          </div>
        </div>
      );
      
}

export default Addcenter