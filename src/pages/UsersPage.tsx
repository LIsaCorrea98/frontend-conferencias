// src/pages/UsersPage.tsx
import { useEffect, useState } from 'react';
import { listUsers, createUser } from '../api/usersApi';
import { User, UserRole } from '../types/user';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<{ nombre: string; correo: string; rol: UserRole | '' }>({
    nombre: '',
    correo: '',
    rol: '',
  });

  const loadUsers = async () => {
    const data = await listUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rol) return;

    await createUser({
      nombre: form.nombre,
      correo: form.correo,
      rol: form.rol
    } as any);

    setForm({ nombre: '', correo: '', rol: '' });
    loadUsers();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <section>
        <h2>Crear usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            placeholder="Correo"
            type="email"
            value={form.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />
          <select
            value={form.rol}
            onChange={(e) => setForm({ ...form, rol: e.target.value as UserRole })}
          >
            <option value="">Selecciona rol</option>
            <option value="PONENTE">Ponente</option>
            <option value="EVALUADOR">Evaluador</option>
            <option value="CHAIR">Chair</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit">Crear</button>
        </form>
      </section>

      <section>
        <h2>Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};