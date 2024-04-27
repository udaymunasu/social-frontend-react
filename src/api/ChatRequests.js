import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const createChat = (data) => API.post('/api/', data);

export const userChats = (id) => API.get(`/api/${id}`);

export const findChat = (firstId, secondId) => API.get(`/api/find/${firstId}/${secondId}`);