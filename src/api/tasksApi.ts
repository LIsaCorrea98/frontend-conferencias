// src/api/tasksApi.ts
import { http } from './httpClient';
import { Task, TaskStatus } from '../types/task';

export const listTasks = async (): Promise<Task[]> => {
  const res = await http.get('/tasks');
  return res.data;
};

export const createTask = async (
  task: Omit<Task, 'id'>
): Promise<Task> => {
  const res = await http.post('/tasks', task);
  return res.data;
};

export const changeTaskStatus = async (
  id: number,
  status: TaskStatus
): Promise<Task> => {
  const res = await http.put(`/tasks/${id}/status`, { status });
  return res.data;
};

export const listTasksByUser = async (userId: number): Promise<Task[]> => {
  const res = await http.get(`/tasks/user/${userId}`);
  return res.data;
};