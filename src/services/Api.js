import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

if(localStorage.getItem('auth') != null)
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth');

export const getRequest = (url) => {
  return axios.get(url).then((res) => {
    return res.data;
  });
}

export const postRequest = (url, params) => {
  return axios.post(url, params).then((res) => {
    return res.data;
  });
}

export const logar = (params) => {
  return axios.post('/autenticacao/login', params).then((res) => {
    localStorage.setItem('auth', 'Bearer ' + res.data.token);
    localStorage.setItem('usuario', JSON.stringify(res.data));

    window.dispatchEvent( new Event('storage') );
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;

    return res.data;
  });
}