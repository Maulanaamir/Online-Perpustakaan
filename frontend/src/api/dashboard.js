
import api from './axios';

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;


};

export const getBorrowings = async() => {
    const response = await api.get('/borrowings');
    return response.data;
}

export const createBook = async (data) => {
  const response = await api.post('/books', data);
  return response.data;
};

