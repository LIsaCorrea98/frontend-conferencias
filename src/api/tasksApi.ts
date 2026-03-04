// src/api/tasksApi.ts
import { http } from './httpClient';
import { Task, TaskStatus } from '../types/task';

export const listTasks = async (): Promise<Task[]> => {
  const res = await http.get('/tareas');
  return res.data;
};

export const createTask = async (
  task: Omit<Task, 'id'>
): Promise<Task> => {
  const res = await http.post('/tareas', task);
  return res.data;
};

export const changeTaskStatus = async (
  id: number,
  estado: TaskStatus
): Promise<Task> => {
  const res = await http.patch(`/tareas/${id}/estado`, { estado });
  return res.data;
};

export const listTasksByUser = async (userId: number): Promise<Task[]> => {
  const res = await http.get(`/usuarios/${userId}/tareas`);
  return res.data;
};