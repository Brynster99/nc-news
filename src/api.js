import axios from 'axios';

export default axios.create({
  baseURL: 'https://northcoders-backend-project.herokuapp.com/api',
});
