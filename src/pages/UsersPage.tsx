// src/pages/UsersPage.tsx
import { useEffect, useState } from 'react';
import { listUsers, createUser } from '../api/usersApi';
import { User, UserRole } from '../types/user';
import { Layout } from '../components/layout/Layout';
import { UserPlus, Mail, Shield } from 'lucide-react';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<{ name: string; lastName: string; email: string; role: UserRole | '' }>({
    name: '',
    lastName: '',
    email: '',
    role: '',
  });

  const loadUsers = async () => {
    try {
      const data = await listUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role || !form.name || !form.email) return;

    try {
      await createUser({
        name: form.name,
        lastName: form.lastName,
        email: form.email,
        role: form.role
      } as any);

      setForm({ name: '', lastName: '', email: '', role: '' });
      loadUsers();
    } catch (error) {
      console.error("Error creando usuario", error);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'badge-danger';
      case 'CHAIR': return 'badge-primary';
      case 'PONENTE': return 'badge-success';
      case 'EVALUADOR': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  return (
    <Layout
      title="Gestión de Usuarios"
      description="Agrega nuevos usuarios y administra los roles del sistema ETOMS."
    >
      <div className="grid-2" style={{ gridTemplateColumns: '1fr 2fr' }}>
        <section>
          <div className="card position-sticky" style={{ top: '90px' }}>
            <div className="card-header">
              <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserPlus size={20} /> Nuevo Usuario
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre</label>
                <input
                  className="form-input"
                  placeholder="Ej. Juan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Apellido</label>
                <input
                  className="form-input"
                  placeholder="Ej. Pérez"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <input
                    className="form-input"
                    style={{ paddingLeft: '2.75rem' }}
                    placeholder="correo@ejemplo.com"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Rol del Sistema</label>
                <div style={{ position: 'relative' }}>
                  <Shield size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <select
                    className="form-input"
                    style={{ paddingLeft: '2.75rem', appearance: 'none' }}
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                    required
                  >
                    <option value="" disabled>Selecciona un rol</option>
                    <option value="PONENTE">Ponente</option>
                    <option value="EVALUADOR">Evaluador</option>
                    <option value="CHAIR">Chair</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                <UserPlus size={18} /> Registrar Usuario
              </button>
            </form>
          </div>
        </section>

        <section>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Directorio de Usuarios</h2>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nombre Completo</th>
                    <th>Correo</th>
                    <th>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No hay usuarios registrados
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id}>
                        <td style={{ fontWeight: 500 }}>{u.name} {u.lastName}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                        <td>
                          <span className={`badge ${getRoleBadgeClass(u.role)}`}>
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};