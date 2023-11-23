import React, {useState} from "react";
import TextForm from "./TextForm";
import "../styles.css"
import Form from "./Form";
import { Add, update } from "../Api/Product";
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from "../cookies";
// import { Form, Field } from 'react-advanced-form'
// import { Input } from 'react-advanced-form-addons'
const AddProduct = (props) => {

  const NavigateTo = useNavigate ();

  const location = useLocation();
    const  state  = location.state
    const [data, setData] = useState({
        product: state?.product ? state?.product : "",
        quantity : state?.quantity ? state?.quantity : "",
        price: state?.price ? state?.price : "",
        discount: state?.discount ? state?.discount : "",
        productThumbnail: state?.productThumbnail ? state?.productThumbnail : "",
        image: "",
        name: ""
    })
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
  
    const handleNameChange = (e) => {
      setName(e.target.value);
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


    const handleOnSubmit = evt => {
        // evt.preventDefault();
        const id = state?._id
        data.name = name ;
         data.image = image ;
         data.email = getCookie('email');
       state? update( data, id).then(res => {
     
         NavigateTo('/home')

       }) : Add(data).then(res => {
     
        NavigateTo('/home')

      });
      
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
       <div style={{padding: '0px, 0px, 150px ', maxWidth : '1000px',}}>
     
       <Form
       initialValues={{
             product:"",
             quantity : "",
             price: "",
             discount: "",
             productThumbnail: ""
       }}
    onSubmit={handleOnSubmit}
       >
       <h1 style={{padding:"15px"}}>{state ? "Edit" : "Add"} products</h1>
       
        <TextForm 
      name= "product"
      label = "Product Name"
      value={data.product}
      onChange={handleChange}
      />
      <TextForm 
      name= "quantity"
      label = "quantity"
      value={data.quantity}
      type="number"
      onChange={handleChange}
      />
      <TextForm
      name= "price"
      label = "price"
      type = "number"
      value={data.price}
      onChange={handleChange}
      />
      <TextForm
      name = "discount"
      label = "discount"
      type="number"
      value={data.discount}
      onChange={handleChange}
      />
      <TextForm
      name = "productThumbnail"
      label = "Product Thumbnail"
      value={data.productThumbnail}
      onChange={handleChange}
      />

      
{state ? "" : <><input type="file" onChange={convertToBase64} accept="image/*" required /><br /><br /></>}
          {image == ""|| image==null  ? "": <img width = {100} height={100} src={state?.image || image}/> }
          {state?.image &&  <img width = {100} height={100} src={state?.image || image}/> }
        
         <button>{state ? "Update" : "Add"}</button>

       </Form>
       </div>

       </>
    )
}

export default AddProduct;