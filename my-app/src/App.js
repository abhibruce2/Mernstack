import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/main';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import NavBar from './components/NavBar';
import ChangePassword from './components/ChangePassword';
import OTP from './components/OTP';


const App = () => {
  return (
    <Router>
      <div>
        {/* Your app header/navigation can go here */}
        
        {/* Define your routes */}
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/add-product" element={<AddProduct/>} />
          <Route path="/changepassword" element={<ChangePassword/>} />
          <Route path="/otp" element={<OTP/>} />

    
        </Routes>
      </div>
    </Router>
  );
};

export default App;
