import base from "./base";

export const loginApi = (payload) => base('POST', null, payload, '/users/login');

export const signUpApi = (payload) => base('POST', null, payload, '/users/signUp');

export const getUserDataApi = () => base('GET', {'Authorization': `Bearer ${localStorage.getItem('token')}`}, null, '/users/me');