import React, {useState} from "react";
import NavBar from "./NavBar";
import TextForm from "./TextForm";
import { Button } from "reactstrap";
import Form from "./Form";
import { getCookie } from "../cookies";
import axios from "axios";

const ChangePassword = () => {
    const [data, setData] = useState({
        oldPassword:"",
        newPassword : "",
        retype: "",
    })
    const handleOnSubmit = async (evt) => {
        // evt.preventDefault();
        // const { product, quantity } = data;
        // const cookies = new Cookies(req.headers.cookie);
        const email =  getCookie('email');
        const formData = {
          email: email,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          retype: data.retype

        }
        const response = await axios.put('http://localhost:5000/changePassword', formData);

        // if(data.oldPassword ===)
        // NavigateTo('/home');

        for (const key in data) {
            setData({
            ...data,
            [key]: ""
          });
        }
      };

      const handleChange = evt => {
        const value = evt.target.value;
        setData({
          ...data,
          [evt.target.name]: value
        });
      };
    return(
        <>
            <NavBar/>

<div className = "d-flex justify-content-center">
    <div>
    <h1 className= "p-5 d-flex justify-content-center">Change Password</h1>

<div>
    <Form 
       initialValues={{
        oldPassword:"",
        newPassword : "",
        retype: "",
       
  }}
onSubmit={handleOnSubmit}
    >
    <TextForm
     name = "oldPassword"
      placeholder = "Current Password..."
      type = "password"
      value={data.oldPassword}
      onChange={handleChange}
      />
    <TextForm
    name = "newPassword"
    type = "password"
    
    placeholder = "New password"
    value={data.newPassword}
    onChange={handleChange}
    />
    <TextForm 
    name = "retype" 
    placeholder= "re Type New Password.."
    type = "password"

    value={data.retype}
    onChange={handleChange}
    />
    <Button>Update</Button>
    </Form>
   
</div>

    </div>

</div>
        </>

    )
}

export default ChangePassword