import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export default function Navbar() {
  const { token, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '1rem 2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#f8fafc', fontWeight: 700, textDecoration: 'none', fontSize: '1.1rem' }}>
            ITELECT4
          </Link>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem' }}>Courses</Link>
          {token && <Link to="/submissions" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem' }}>Submissions</Link>}
          {token && <Link to="/submissions/new" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem' }}>New Submission</Link>}
          {token && <Link to="/review" style={{ color: '#60a5fa', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>AI Review</Link>}
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {token ? (
            <>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{user?.email}</span>
              <button onClick={handleLogout} className="btn-primary" style={{ backgroundColor: '#475569', padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Login</Link>
              <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}