export const Topbar = () => {
    return (
      <header
        style={{
          height: '56px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          background: '#ffffff',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <h1 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
          Gestión de Conferencia
        </h1>
        <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
          Panel de administración
        </span>
      </header>
    );
  };