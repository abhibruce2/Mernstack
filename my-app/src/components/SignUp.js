import React,{useState} from "react";
import {Post} from "../Api/OTP";
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';


function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    phone:"",
    dob: "",
    password: "",
    image:""
  });
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const NavigateTo = useNavigate ();

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
   
      state.image = image
      NavigateTo('/otp',{
        state: state,
      });
 

  };
  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
    setImage(reader.result);
    }
    reader.onerror = error => {
      console.log("Error: ", error);
    }
  };
  return (
    <div   >
<div className="form-container sign-up-container h-100 " 
   style={{
    // height: "auto",
    overflowY: 'scroll'}}
    >
      <form  onSubmit={handleOnSubmit} style={{
    height: "auto",
    }}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required

        />
        <input
          type="number"
          name="phone"
          // value={state.email}
          onChange={handleChange}
          placeholder="Phone"
          required

        />
        <input
          type="date"
          name="dob"
          // value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required

        />
        {/* <input
          type="file"
          name="image"
          // value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required

        /> */}
    {/* <input type="file" id="fileInput" name="image" accept="image/*" />
    <input type="submit" value="Upload"/> */}
  
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input type="file" onChange={convertToBase64} accept="image/*" required /><br /><br />
                  {image == ""|| image==null  ? "": <img width = {100} height={100} src={state?.image || image}/> }

        <button>Sign Up</button>
      </form>
    </div>
    </div>
    
  );
}

export default SignUpForm;
