// src/types/project.ts
export interface Project {
    id: number;
    titulo: string;
    descripcion: string;
    usuarioId: number;      // autor
    usuarioNombre?: string; // opcional, si backend lo devuelve
  }