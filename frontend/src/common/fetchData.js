import axios from 'axios';
import {
  message
} from 'antd';

export const BASE_URL = `http://localhost:5001`;

const fetchData = axios.create({
  baseURL: BASE_URL
})
fetchData.interceptors.response.use(
  response => {
    console.log("response.data = ", response.data)
    if (response.data.code < 0) {
      message.error(response.data.msg);
      return Promise.reject(response.data.msg);
    }
    return response.data;
  },
  error => {
    message.error('An error occurred on the server')
    return Promise.reject(error)
  }
)
export default fetchData
