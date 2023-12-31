import React from "react";
import { useNavigate  } from 'react-router-dom';

const NavBar = () => {
  const NavigateTo = useNavigate ();


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger px-5">
    <a className ="navbar-brand text-light" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav" >
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link text-light" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Pricing</a>
        </li>
        <li className="nav-item text-light">
          <a className="nav-link disabled text-light" href="#">Disabled</a>
        </li>

      </ul>
    </div>
<button onClick = {() => {
                NavigateTo('/');
            } } >LogOut</button>

  </nav>
  );
};

export default NavBar;