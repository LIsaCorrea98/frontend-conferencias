// src/api/usersApi.ts
import { http } from './httpClient';
import { User } from '../types/user';

export const listUsers = async (): Promise<User[]> => {
  const res = await http.get('/users');
  return res.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const res = await http.post('/users', user);
  return res.data;
};