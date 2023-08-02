import React, { useState } from 'react';
import { validation } from './IndexValidation'; // Import the validation function from IndexValidation.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Index() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    //   console.log(event); // Inspect the event object
    // console.log(event.target); // Inspect the event.target object
    // console.log(event.target.name); // Inspect the value of event.target.name
    // console.log(event.target.value); // Inspect the value of event.target.value
     setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
     };
  const handleSubmit = event => {
    event.preventDefault();
    setErrors(validation(values));
  };



  const submitForm = () => {
    if (Object.keys(errors).length === 0 ) {
      axios
        .post('http://localhost:5000/login', values)
        .then(res => {
          if (values.email === "2012059@nec.edu.in" && values.password === "123") {
           // console.log("yes");
            navigate('/admin');
          }
          
          else if(res.data==='Login successful'){
            navigate('/user');
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
    <div className="container">
      <div className="text">user login</div>
      <form action=""  onSubmit={handleSubmit}>
        <span style={{ color: 'red' }}>{errors.email}</span>
        <div className="data">
          <label htmlFor="email">Email</label><br />
          <input type="email" name="email" id="email" onChange={handleInput}/>
        </div>
        <div className="data">
          <label htmlFor="password">password</label><br />
          <input type="password" name="password" id="password" onChange={handleInput}/>
        </div>
        <div className="forgetpass">
          <a href="/forget">Forget Password</a>
        </div>
        <div className="btn">
          <button onClick={submitForm}>Login</button>
        </div>
        <div className="signup-link">
          Not a member? <a href="/signup">Signup now</a>
        </div>
      </form>
    </div>
  );
}

export default Index;
