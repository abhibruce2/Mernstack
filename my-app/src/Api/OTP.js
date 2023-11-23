import axios from 'axios';


  export async function Post (formData) {
    console.log("formData_________________", formData);
    try {
        const response = await axios.post('http://localhost:5000/otp', formData);

        console.log('Post submitted successfully!', response.data);
        return response.data
      } catch (error) {
        console.error('There was an error submitting the post:', error.message);
      }
    };