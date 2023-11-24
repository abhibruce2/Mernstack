import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import Table from "./Table";
import { useNavigate  } from 'react-router-dom';
// import { Get } from "../Api/Product";
import axios from 'axios';

const Home = () => {

    const [data, setData] = useState([])
    useEffect(() => {
         Get();
      }, []);

      const Get = async () => {
        try {
        const response = await axios.get('http://localhost:5000/products');
        const data = response.data
    setData(data)

          } catch (error) {
            console.error('There was an error submitting the post:', error.message);
          }
        };

    const NavigateTo = useNavigate ();

    return(
        <>
         <NavBar/>

         <div className = "p-5">
            <div className = "d-flex justify-content-end p-2">

              <div className="px-2">
              <button onClick = {() => {
                NavigateTo('/add-product');
            }
            }>Add</button>
              </div>
              <button onClick = {() => {
                NavigateTo('/add-product');
            }
            }>Change Password</button>

            

            </div>

         <Table data = {data}/>

         </div>
        </>

    )
}

export default Home
