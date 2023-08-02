import React, { useState } from 'react'
import { validation } from './IndexValidation'; // Import the validation function from IndexValidation.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serve } from './Servevalidation';
function Getserve() {
    const navigate=useNavigate();
    const [values, setValues] = useState({
        email: '',
        name: '',
        place:''
      });    
      const [errors, setErrors] = useState({});
      const handleInput = (event) => {
         setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
         };
      const handleSubmit = event => {
        event.preventDefault();
        setErrors(serve(values));
      };
      const submitForm = () => {
        console.log("yeeee")
        if (Object.keys(errors).length === 0 ) {
          axios
            .post('http://localhost:5000/getserve', values)
            .then(res => {
              if(res.data==='booked'){
                console.log("yes")
                navigate('/user');
              //console.log("yes")
              }
              else{
                setErrors(prev => ({ ...prev, email: res.data }));
    
              }
            })
            .catch(err=>err);
        }
        else{
          errors.email="not found"
        }
      };
    return (
        
        <div>
          <h1>BOOK YOUR SLOTS HERE</h1>
          <div className="container">
          <span style={{ color: 'red' }}>{errors.email}</span>
            <form  onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" onChange={handleInput}/><br />
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" onChange={handleInput}/><br />
              <label htmlFor="place">Enter your area:</label>
              <input type="text" name="place" id="place" onChange={handleInput}/>
              <button onClick={submitForm}>Book vaccine</button>
            </form>
          </div>
        </div>
      );
      
}

export default Getserve