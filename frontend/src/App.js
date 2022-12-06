import React from 'react'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'


//  import Header from './components/Header';
 import Login from './Pages/Login';
import Register from './Pages/Register'; 
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import ValidationMsg from './Pages/ValidationMsg';
import Profile from './Pages/Profile';
import Protected from './util/Protected';

function App() {
  return (
<>
  <Router>
  
    <div >

       <Routes>
       <Route element={<Protected />}>
          <Route path='/profile' element={<Profile/>} />
        </Route>
        <Route path='/validationMsg' element={<ValidationMsg/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgetpassword' element={<ForgetPassword/>} />
        <Route path='/resetpassword/:token' element={<ResetPassword/>} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />


       </Routes>
   
    </div>
      </Router>

   
</>
  );
}

export default App;
