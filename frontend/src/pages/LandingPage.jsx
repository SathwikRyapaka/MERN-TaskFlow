import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '2rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '24px', height: '24px', backgroundColor: 'var(--primary-color)', borderRadius: '4px' }}></div>
          TaskFlow
        </div>
        <nav style={{ display: 'flex', gap: '2rem', fontWeight: '500' }}>
          <a href="#features" style={{ color: 'var(--text-dark)' }}>Features</a>
          <a href="#workflow" style={{ color: 'var(--text-dark)' }}>Workflow</a>
          <span style={{ cursor: 'pointer', color: 'var(--text-dark)' }} onClick={() => navigate('/dashboard')}>Dashboard</span>
        </nav>
        <button className="btn-primary" onClick={() => navigate('/dashboard')}>Get Started</button>
      </header>

      <main style={{ flex: 1, padding: '4rem', display: 'flex', gap: '4rem', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            Manage Projects,<br/>One Sprint At A Time
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem', maxWidth: '500px' }}>
            Track tasks through SDLC phases, manage teams and monitor project progress from one dashboard.
          </p>
          <button className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} onClick={() => navigate('/dashboard')}>
            Start Managing
          </button>
        </div>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
           {/* Placeholder for the laptop image in the design */}
           <div style={{ 
             width: '100%', maxWidth: '600px', height: '400px', 
             backgroundColor: 'var(--card-bg)', borderRadius: '12px',
             boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
             display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--border-color)'
           }}>
             <div style={{ height: '30px', backgroundColor: '#E8E0D5', display: 'flex', alignItems: 'center', padding: '0 1rem', gap: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
             </div>
             <div style={{ flex: 1, padding: '1rem', display: 'flex', gap: '1rem', backgroundColor: 'var(--bg-color)' }}>
                <div style={{ width: '200px', backgroundColor: 'white', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ height: '10px', width: '50%', backgroundColor: '#eee', marginBottom: '1rem' }}></div>
                    <div style={{ height: '60px', backgroundColor: 'var(--status-testing-bg)', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                    <div style={{ height: '60px', backgroundColor: 'var(--status-inprogress-bg)', borderRadius: '4px' }}></div>
                </div>
                <div style={{ width: '200px', backgroundColor: 'white', borderRadius: '8px', padding: '1rem' }}>
                    <div style={{ height: '10px', width: '50%', backgroundColor: '#eee', marginBottom: '1rem' }}></div>
                    <div style={{ height: '60px', backgroundColor: 'var(--status-todo-bg)', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
                </div>
             </div>
           </div>
        </div>
      </main>
      
      <section id="features" style={{ padding: '6rem 4rem', backgroundColor: 'var(--card-bg)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '1rem' }}>Features</p>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>Everything You Need<br/>For Project Management</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {[
            { title: 'Task Tracking', desc: 'Move tasks across SDLC phases seamlessly.' },
            { title: 'User Management', desc: 'Assign tasks to team members and track their progress.' },
            { title: 'Task History', desc: 'Track every status change with complete history.' },
            { title: 'Project Insights', desc: 'Monitor project progress and team performance easily.' }
          ].map((feat, i) => (
            <div key={i} style={{ padding: '2rem', backgroundColor: 'var(--bg-color)', borderRadius: '12px', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                 <div style={{ width: '20px', height: '20px', backgroundColor: 'var(--primary-color)', opacity: 0.2, borderRadius: '4px' }}></div>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{feat.title}</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: '1.6' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
