// src/types/task.ts
export type TaskStatus = 'PENDIENTE' | 'EN_REVISION' | 'ACEPTADO' | 'RECHAZADO';

export interface Task {
  id: number;
  nombre: string;
  proyectoId: number;
  proyectoTitulo?: string;
  usuarioId: number;
  usuarioNombre?: string;
  estado: TaskStatus;
}