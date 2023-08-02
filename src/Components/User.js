import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function User() {
    const navigate = useNavigate();

    const[column,setColumn]=useState([])
    const[records,setRecords]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/userpg').then(res=>res.json()).then(
            data=>{
               // console.log(data)
                setColumn(Object.keys(data.rows[0]))
                setRecords(data.rows)
            }
        )
    },[])
    const getserve=()=>{
        navigate('/getserve')
    }
  return (
    <div>
        <h1>Note:Only 10 members can get service per day</h1>
    <button onClick={getserve}>Get service</button>
    <table>
    <thead id="dh">
      <tr>
        <td>Place</td>
        <td>Dose Available</td>
       
      </tr>
    </thead>
    <tbody>
  {records.map((record, i) => (
    <tr key={i}>
      <td>{record.Place}</td>
      <td>{record.DoseNo}</td>
    </tr>
  ))}
</tbody>

   </table>  
    </div>
  )
}

export default User
