import axios from 'axios'
import config from './config'

const serviceApi = axios.create({
  baseURL: config[process.env.REACT_APP_ENV || "dev"]?.apiURL,
  timeout: 10000,
  withCredentials: false, 
  headers: {
    'Content-Type': 'application/json'
  }
})
console.log('process.env.REACT_APP_ENV',process.env.REACT_APP_ENV)

export default serviceApi
