

//const API_BASE_URL = 'https://ecommercebackend-jzct.onrender.com/book/663d24f8fc9104a185767530'; 


import axios from 'axios';

const API_BASE_URL = 'https://ecommercebackend-jzct.onrender.com/book/663d24f8fc9104a185767530'; // قاعدة الـ API

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getBookDetails = async (bookId) => {
  try {
    const response = await api.get(`/book/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};
