import logo from './logo.svg';
import './App.css';
import Index from './Components/Index';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import User from './Components/User';
import Getserve from './Components/Getserve';
import Signup from './Components/Signup';
import Forget from './Components/Forget'
import Admin from './Components/Admin';
import Addcenter from './Components/Addcenter'

function App() {
  return (
    // <div className="App">
    //   <Index/>
    // </div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index/>}></Route>
      <Route path='/user' element={<User/>}></Route>
      <Route path='/getserve' element={<Getserve/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/forget' element={<Forget/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path="/addcenter" element={<Addcenter/>}></Route>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
