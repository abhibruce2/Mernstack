import axios from 'axios';
import { API } from '.';

  export async function Post (formData) {
    try {
        const response = await API.post('/signin',{
 }, formData);
// if(response){
  console.log("res----------------", response.data);
  return response
// 
// }
      } catch (error) {
        console.error('There was an error submitting the post:', error.message);
      }
    };
