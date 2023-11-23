import React,{useState, useEffect} from "react";
import Form from "./Form";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { Post } from "../Api/SignUp";
import { useNavigate  } from 'react-router-dom';


const OTP = () => {
    const [otp, setOtp] = useState({
        otpValue: ""
    });
    const [ backenOtp, setBackendOtp] = useState()
    useEffect(() => {
         post();
      }, []);
    const location = useLocation();
    const  state  = location.state
    const NavigateTo = useNavigate ();

const post = async () => {
    try {
        const response = await axios.post('http://localhost:5000/otp', state);

        setBackendOtp(response.data.otp)
        return response.data
      } catch (error) {
        console.error('There was an error submitting the post:', error.message);
      }
    };



    const handleChange = evt => {
        const value = evt.target.value;
        setOtp({
        //   ...otp,
          [evt.target.name]: value
        });
      };
      
      const handleOnSubmit = evt => {
        // evt.preventDefault();
     
       if( otp.otp == backenOtp){
        Post(state).then((res) => {
            NavigateTo('/');
        })

       }else{
        alert("Invalid OTP")
       }
    
      };

    return(
        <Form
        enableReinitialize={true}
        initialValues={{
otp :""

        }}
     onSubmit={handleOnSubmit}>

        <div className="d-flex justify-content-center p-5 ">
                

            <div className="container d-flex justify-content-center align-items-center p-5">
            <div>
                <div>
                <h1>Please Enter OTP</h1>
                </div>
                <div className=" d-flex justify-content-center align-items-center p-5">
               
               <input type="number" name="otp" placeholder="Please Enter OTP" value={otp.otpValue} onChange={handleChange} />
               
                               </div>
                               <div className=" d-flex justify-content-center">
                               <button>Confirm</button>
               
                               </div>
                
            </div>
           
           

            </div>
            
        </div>
        </Form>

    )
}
export default OTP ;

