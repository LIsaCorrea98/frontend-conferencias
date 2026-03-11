// src/components/layout/Layout.tsx
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: ReactNode;
    title: string;
    description?: string;
}

export const Layout = ({ children, title, description }: LayoutProps) => {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <header className="topbar">
                    <div className="topbar-title">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                            AD
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Admin User</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>admin@etoms.com</div>
                        </div>
                    </div>
                </header>

                <main className="page-container animate-fade-in">
                    <div style={{ marginBottom: '2rem' }}>
                        <h1>{title}</h1>
                        {description && <p className="page-description">{description}</p>}
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
};
