import Axios from 'axios';

const request = Axios.create({
    baseURL: 'http://localhost:4000/',
});

export default request;
