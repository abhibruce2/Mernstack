import React, {useState , useEffect} from "react";
import { useNavigate  } from 'react-router-dom';
import axios from "axios";
import {Button} from 'reactstrap';
import { getCookie } from "../cookies";
import { API } from "../Api";
const Table = (props) => {
  const [products,  setProducts] = useState([]);
    const NavigateTo = useNavigate ();

    useEffect(() => {
      Get();
   }, [])

const email = getCookie('email')

   const Get = async (value) => {
    try {
      if (value == undefined || value == "") {
        console.log("email-------------",email);
        const response = await API.get(`http://localhost:5000/products/${email}`);
        const data = response.data
    setProducts(data)
      }else{
        const response = await axios.get(`http://localhost:5000/searchproducts/${value}/${email}`);
        const data = response.data
       
        setProducts(data)

      }


      } catch (error) {
        console.error('There was an error submitting the post:', error.message);
      }
    };
    const sortAscending = () => {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      setProducts(sortedProducts);
    };

    const sortDescending = () => {
      const sortedProducts = [...products].sort((a, b) => b.price - a.price);
      setProducts(sortedProducts);
    };
const handleChange = (e) =>{
Get(e.target.value);
}
    return(
      <>
      <input type = "search" placeholder="Please Search..." onChange={handleChange}/>
      <Button className="bg-dark" onClick={sortAscending}>asc</Button>
      <Button className="bg-dark" onClick={sortDescending}>dsc</Button>

       <table class="table table-striped table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">discount Type</th>
      <th scope="col">Product Thumbnail</th>
      <th scope="col">Edit</th>


    </tr>
  </thead>
  <tbody>
{products ? 
(
  products && products.length > 0 ? products.map(element => {
    return(
      <>
      <tr>
      <th scope="row">{element.length}</th>
      <td>{element.product}</td>
      <td>{element.quantity}</td>
      <td>{element.price}</td>
      <td>{element.discount}</td>
      <td>{element.productThumbnail}</td>
      <td>
      <button onClick={() => {
      NavigateTo('/add-product', {state: element});
    } }>Edit</button>
    </td>
</tr>

    </>
    )
      
  }) : <h1>No Records Found</h1>
)
:
//   ( data && data.length > 0 ? data.map(element => {
//     return(
//       <>
//       <tr>
//       <th scope="row">{element.length}</th>
//       <td>{element.product}</td>
//       <td>{element.quantity}</td>
//       <td>{element.price}</td>
//       <td>{element.discount}</td>
//       <td>{element.productThumbnail}</td>
//       <td>
//       <button onClick={() => {
//       NavigateTo('/add-product', {state: element});
//     } }>Edit</button>
//     </td>
// </tr>

//     </>
//     )
      
//   }): <h1>Norecords</h1>)
  ""

}

  </tbody>
</table>
      </>
       
    )
}

export default Table 
