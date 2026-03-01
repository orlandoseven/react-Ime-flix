import axios from 'axios';

//Base da URL :https://api.themoviedb.org/3/

//const apiKey = '95e3ca8fcbda1be5519be4a7f9acb283';
const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api;