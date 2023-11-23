import axios from 'axios';


  export async function Post (formData) {
    try {
        const response = await axios.post('http://localhost:5000/signin', formData);

  return response
      } catch (error) {
        console.error('There was an error submitting the post:', error.message);
      }
    };
