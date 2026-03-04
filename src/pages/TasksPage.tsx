// src/pages/TasksPage.tsx
import { useEffect, useState } from 'react';
import { listTasks, createTask, changeTaskStatus } from '../api/tasksApi';
import { listProjects } from '../api/projectsApi';
import { listUsers } from '../api/usersApi';
import { Task, TaskStatus } from '../types/task';
import { Project } from '../types/project';
import { User } from '../types/user';

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [form, setForm] = useState<{
    nombre: string;
    proyectoId: string;
    usuarioId: string;
    estado: TaskStatus;
  }>({
    nombre: '',
    proyectoId: '',
    usuarioId: '',
    estado: 'PENDIENTE',
  });

  const loadData = async () => {
    const [tasksRes, projectsRes, usersRes] = await Promise.all([
      listTasks(),
      listProjects(),
      listUsers(),
    ]);
    setTasks(tasksRes);
    setProjects(projectsRes);
    setUsers(usersRes);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.proyectoId || !form.usuarioId) return;

    await createTask({
      nombre: form.nombre,
      proyectoId: Number(form.proyectoId),
      usuarioId: Number(form.usuarioId),
      estado: form.estado,
    } as any);

    setForm({
      nombre: '',
      proyectoId: '',
      usuarioId: '',
      estado: 'PENDIENTE',
    });
    loadData();
  };

  const handleChangeStatus = async (taskId: number, newStatus: TaskStatus) => {
    await changeTaskStatus(taskId, newStatus);
    loadData();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <section>
        <h2>Crear tarea</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nombre de la tarea"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <select
            value={form.proyectoId}
            onChange={(e) => setForm({ ...form, proyectoId: e.target.value })}
          >
            <option value="">Selecciona proyecto</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.titulo}
              </option>
            ))}
          </select>
          <select
            value={form.usuarioId}
            onChange={(e) => setForm({ ...form, usuarioId: e.target.value })}
          >
            <option value="">Selecciona usuario</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre}
              </option>
            ))}
          </select>
          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value as TaskStatus })}
          >
            <option value="PENDIENTE">Pendiente</option>
            <option value="EN_REVISION">En revisión</option>
            <option value="ACEPTADO">Aceptado</option>
            <option value="RECHAZADO">Rechazado</option>
          </select>
          <button type="submit">Crear</button>
        </form>
      </section>

      <section>
        <h2>Tareas</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Proyecto</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>{t.nombre}</td>
                <td>{t.proyectoTitulo || t.proyectoId}</td>
                <td>{t.usuarioNombre || t.usuarioId}</td>
                <td>{t.estado}</td>
                <td>
                  <select
                    value={t.estado}
                    onChange={(e) =>
                      handleChangeStatus(t.id, e.target.value as TaskStatus)
                    }
                  >
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="EN_REVISION">En revisión</option>
                    <option value="ACEPTADO">Aceptado</option>
                    <option value="RECHAZADO">Rechazado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};