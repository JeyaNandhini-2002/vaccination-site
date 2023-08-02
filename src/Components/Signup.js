import React, { useState }  from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signup } from './Servevalidation';

function Signup() {
    const [values, setValues] = useState({
        name:'',
        email: '',
        password: '',
        confirmpassword:''
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
        setErrors(signup(values));
      };
    
    
    
      const submitForm = () => {
        if (Object.keys(errors).length === 0 ) {
          axios
            .post('http://localhost:5000/signup', values)
            .then(res => {
              if(res.data==='user registration success'){
                navigate('/');
              //console.log(rows)
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
        <div className="container">
          <div className="text">user Registration</div>
          <form action=""  onSubmit={handleSubmit}>
          <span style={{ color: 'red' }}>{errors.email}</span>
            <div className="data">
              <label htmlFor="name">Name</label><br />
              <input type="text" name="name" id="name" onChange={handleInput} />
            </div>
            <div className="data">
              <label htmlFor="email">Email</label><br />
              <input type="email" name="email" id="email" onChange={handleInput}/>
            </div>
            <div className="data">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" onChange={handleInput} />
            </div>
            <div className="data">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input type="password" name="confirmpassword" id="confirmpassword" onChange={handleInput}/>
            </div>
            <div className="btn">
              <button onClick={submitForm}>Register</button>
            </div>
            <div className="signup-link">
              Already a member? <a href="/">Login now</a>
            </div>
          </form>
        </div>
      );
      
}

export default Signup