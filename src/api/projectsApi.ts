// src/api/projectsApi.ts
import { projectHttp } from './httpClient';
import { Project } from '../types/project';

export const listProjects = async (): Promise<Project[]> => {
  const res = await projectHttp.get('/projects');
  return res.data;
};

export const createProject = async (
  project: Omit<Project, 'id'>
): Promise<Project> => {
  const res = await projectHttp.post('/projects', project);
  return res.data;
};