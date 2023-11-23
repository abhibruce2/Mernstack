import React, {useEffect} from "react";
import Form from "./Form";
import { useNavigate  } from 'react-router-dom';
import { Post } from "../Api/SignIn";
import { setCookie } from "../cookies";

function SignIn() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };
  const NavigateTo = useNavigate ();


  const handleOnSubmit = evt => {
    // evt.preventDefault();

    Post(state).then((res) => {
      if(res.status === 200){
        setCookie('email', state.email, 30);
        
        NavigateTo('/home');
        for (const key in state) {
               setState({
                  ...state,
                 [key]: ""
     });
          }
      }
    }).catch((err) => alert("Invalid Credentials"))

  };

  return (
    <div className="form-container sign-in-container" 
>
      <Form
          enableReinitialize={true}
          initialValues={{
email: "",
passsword: ""

          }}
       onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          required
        />
 
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          required
        />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </Form>
    </div>
  );
}

export default SignIn;
