// src/api/usersApi.ts
import { userHttp } from './httpClient';
import { User } from '../types/user';

export const listUsers = async (): Promise<User[]> => {
  const res = await userHttp.get('/users');
  return res.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const res = await userHttp.post('/users', user);
  return res.data;
};