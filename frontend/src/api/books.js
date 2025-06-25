// src/api/books.js
import api from './axios';

export const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};
