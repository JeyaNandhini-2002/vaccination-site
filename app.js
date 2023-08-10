const express=require('express');
const mysql=require("mysql");
const app=express();//obj 
const dotenv=require('dotenv');
const path=require("path");
const cors=require('cors')
const nodemailer = require('nodemailer');
app.use(cors())
const bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
const sender=nodemailer.createTransport({
  service:'gmail',
  auth:{
    user:'2012059@nec.edu.in',
    pass:'Jeyathemass'
  }
});

const db=mysql.createConnection({
    database:"login",
    host:"localhost",
    user:"root",
    password:"Jeyathemass@12"
});
db.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("my sql connected")
    }
})
app.post('/login', (req, res) => {
  console.log(req.body.email)
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT Email, Password FROM details WHERE Email = ?', [email], async (error, result) => {
    if (error) {
      console.error(error);
      return res.json('Internal server error');
    }

    if (result.length === 0) {
      // No matching email found
      return res.json('Invalid credentials1');
    }

    const storedEmail = result[0].Email;
    const storedPassword = result[0].Password;

    if (storedEmail === email && storedPassword === password) {
      return res.json('Login successful')
      
    } else {
      return res.json('Invalid credentials');
    }
  });
});
app.get('/userpg',(req,res)=>{
  db.query('SELECT Place,DoseNo FROM dose', async (error, rows)=>{
    if(rows.length>0){
      return res.json({rows:rows})
    }
});
})
app.post('/changepass',(req,res)=>{
  const email=req.body.email;
    const pass=req.body.password;
    const confirmpass=req.body.confirmpassword;
  db.query('UPDATE details set Password=? where email=?',[pass,email],(error,result)=>{
    if(error){
      console.log(error);
    }
    else{
      return res.json('updated');
    }
  })
})
app.get('/adminpg',(req,res)=>{
  db.query('SELECT * FROM dose', async (error, rows)=>{
    if(rows.length>0){
      return res.json({rows:rows})
    }
});
})
app.post('/add', (req, res) => {
  const loc = req.body.Location;
  const place = req.body.Place;
  const dose = 10;
  console.log(dose);

  db.query('SELECT Place FROM dose WHERE Place = ?', [place], async (error, result) => {
    if (result.length > 0) {
      console.log("yes")
      return res.json('place already exists');
    }

    db.query('INSERT INTO dose SET ?', { Location: loc, Place: place, DoseNo: dose }, (err, result) => {
      if (err) {
        console.log(err);
        return res.json('error occurred');
      } else {
        return res.json('added');
      }
    });
  });
});
app.delete('/delete', (req, res) => {
  console.log("delete");
  try {
    const place = req.body.place;
    db.query('DELETE FROM dose WHERE Place = ?', [place], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error deleting record.' });
      } else {
        db.query('SELECT * FROM dose', async (error, rows) => {
          if (rows.length > 0) {
            console.log(rows);
            return res.json('deleted');
          } else {
            return res.json('Record not found.');
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/signup',(req,res)=>{
  const name=req.body.name;
  const email=req.body.email;
  const passwowrd=req.body.password;
  const confirm=req.body.confirmpassword;
  db.query('select *  from details where email=?',[email],(error,result)=>{
      if(error){
          console.log(error);
      }
      else{
          if(result.length>0){
              return res.json('email id already exits')
          }
          else{
              db.query('insert into details set ?',{Name:name,Email:email,Password:passwowrd},(err,result)=>{
                  if(err){
                      console.log(err);
                  }
                  else{
                      console.log(res);
                      return res.json('user registration success');
                  }
              })
          }
      }
  })
})

app.listen(5000,()=>{
    console.log("server started")
})
app.post('/getserve',(req,res)=>{
  const name=req.body.name;
  const email=req.body.email;
  const place=req.body.place;
  db.query('select DoseNo from dose where Place=?',[place],async(error,result)=>{
   // console.log(result.DoseNo);
    if(result.length<=0){
      return res.json('out of stock or no such center')
    }
   else{
     let x=result[0].DoseNo-1;
     if(x<0){
       return res.json('out of stock');
     }
     db.query('UPDATE dose SET DoseNo= ? WHERE Place = ?',[x,place],(err,result)=>{
       if(err){
         console.log(err);
       }
       else{
        const composemail={
              
              from:'2012059@nec.edu.in',
              to:email,
              subject:'Wonderful! I am delighted to inform you that your vaccine appointment has been successfully booked. You have been assigned to receive the vaccine at'+ place+', and the best part is, you can choose a convenient time that suits you. This is a significant step towards safeguarding your health and well-being. Thank you for proactively taking this important measure.',
              html:'welcome'
              }
              sender.sendMail(composemail,function(error,info){
                if(error){
                  console.log(error);
                }
                else{
                  //console.log("sent")
                  return res.json("booked")
                }
              })
       }
     } )
   }
})
})
