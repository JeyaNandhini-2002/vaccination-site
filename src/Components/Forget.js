import React, { useState } from 'react';
import { change } from './Servevalidation'; // Import the validation function from IndexValidation.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forget() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmpassword:''
      });
      const navigate = useNavigate();
    
      const [errors, setErrors] = useState({});
      const handleInput = (event) => {
         setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
         };
      const handleSubmit = event => {
        event.preventDefault();
        setErrors(change(values));
      };
      const submitForm = () => {
        if (Object.keys(errors).length === 0 ) {
          axios
            .post('http://localhost:5000/changepass', values)
            .then(res => {
              if(res.data==='updated'){
                navigate('/');
              //console.log(rows)
              }
              else{
                setErrors(prev => ({ ...prev, email: 'Invalid credentials' }));
    
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
          <div className="container">
                   <span style={{ color: 'red' }}>{errors.email}</span>

            <form action=""  onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" onChange={handleInput}/>
              <label htmlFor="password">New Password</label>
              <input type="password" id="password" name="password" onChange={handleInput} />
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input type="password" id="confirmpassword" name="confirmpassword" onChange={handleInput}/>
              <button onClick={submitForm}>Submit</button>
            </form>
          </div>
        </div>
      );
      
}

export default Forget