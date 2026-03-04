// src/api/projectsApi.ts
import { http } from './httpClient';
import { Project } from '../types/project';

export const listProjects = async (): Promise<Project[]> => {
  const res = await http.get('/proyectos');
  return res.data;
};

export const createProject = async (
  project: Omit<Project, 'id'>
): Promise<Project> => {
  const res = await http.post('/proyectos', project);
  return res.data;
};