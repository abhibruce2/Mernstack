import axios from 'axios';


  export async function Add (formData) {
    try {
        const response = await axios.post('http://localhost:5000/addProduct', formData);

  return response
      } catch (error) {
        console.error('There was an error submitting the post:', error.message);
      }
    };

    export async function Get () {
        try {
        const response = await axios.get('http://localhost:5000/products');
        const data = response
      return data

          } catch (error) {
            console.error('There was an error submitting the post:', error.message);
          }
        };

        export async function update (formData, id) {
          try {
              const response = await axios.put(`http://localhost:5000/updateProduct/${id}`, formData);
      
        return response
            } catch (error) {
              console.error('There was an error submitting the post:', error.message);
            }
          };