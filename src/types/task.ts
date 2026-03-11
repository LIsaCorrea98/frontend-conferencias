// src/types/task.ts
export type TaskStatus = 'PENDIENTE' | 'EN_REVISION' | 'ACEPTADO' | 'RECHAZADO';

export interface Task {
  id: number;
  title: string;
  projectId: number;
  projectName?: string;
  userId: number;
  userName?: string;
  status: TaskStatus;
}