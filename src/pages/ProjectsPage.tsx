// src/pages/ProjectsPage.tsx
import { useEffect, useState } from 'react';
import { listProjects, createProject } from '../api/projectsApi';
import { Project } from '../types/project';
import { listUsers } from '../api/usersApi';
import { User } from '../types/user';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<{
    titulo: string;
    descripcion: string;
    usuarioId: string;
  }>({
    titulo: '',
    descripcion: '',
    usuarioId: '',
  });

  const loadData = async () => {
    const [projectsRes, usersRes] = await Promise.all([
      listProjects(),
      listUsers(),
    ]);
    setProjects(projectsRes);
    setUsers(usersRes);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.usuarioId) return;

    await createProject({
      titulo: form.titulo,
      descripcion: form.descripcion,
      usuarioId: Number(form.usuarioId),
    } as any);

    setForm({ titulo: '', descripcion: '', usuarioId: '' });
    loadData();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <section>
        <h2>Crear proyecto</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />
          <textarea
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
          <select
            value={form.usuarioId}
            onChange={(e) => setForm({ ...form, usuarioId: e.target.value })}
          >
            <option value="">Selecciona autor</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nombre}
              </option>
            ))}
          </select>
          <button type="submit">Crear</button>
        </form>
      </section>

      <section>
        <h2>Proyectos</h2>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descripción</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.titulo}</td>
                <td>{p.descripcion}</td>
                <td>{p.usuarioNombre || p.usuarioId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};