import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin() {
    const navigate = useNavigate();

    const[column,setColumn]=useState([])
    const[records,setRecords]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/adminpg').then(res=>res.json()).then(
            data=>{
               // console.log(data)
                setColumn(Object.keys(data.rows[0]))
                setRecords(data.rows)
            }
        )
    },[])
    const addcenter=()=>{
        navigate('/addcenter')
    }
    const delcenter = (place, location) => {
      console.log('Place:', place);
      console.log('Location:', location);
      axios.delete('http://localhost:5000/delete', { data: { place, location } })
        .then(res => {
          if (res.data === 'deleted') {
            navigate('/admin');
          }
        })
        .catch(err => console.error(err));
    };
    
  return (
    <div>
        <h1>Note:Only 10 members can get service per day</h1>
    <button onClick={addcenter}>Add Center</button>
    <table>
  <thead id="dh">
    <tr>
      <td>Place</td>
      <td>Location</td>
      <td>Dose Available</td>
      <td>Delete</td>
    </tr>
  </thead>
  <tbody>
    {records.map((record, i) => (
      <tr key={i}>
        <td>{record.Place}</td>
        <td>{record.Location}</td>
        <td>{record.DoseNo}</td>
        <td>
          <button value="delete" onClick={() => delcenter(record.Place, record.Location)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
 
    </div>
  )
}

export default Admin