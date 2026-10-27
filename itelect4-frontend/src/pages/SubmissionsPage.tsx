import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api/client';
import type { Submission } from '../types';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<Submission[]>('/api/submissions')
      .then(setSubmissions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Loading submissions...</p>;
  if (error) return <div className="error-box">{error}</div>;

  const formatUrl = (text?: string) => {
    if (!text) return null;
    if (text.startsWith('http://') || text.startsWith('https://')) {
      return text;
    }
    return null;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>My Submissions</h2>
        <Link to="/submissions/new" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
          + New Submission
        </Link>
      </div>

      {submissions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No submissions found yet.</p>
          <Link to="/submissions/new" className="btn-primary" style={{ textDecoration: 'none' }}>
            Create Your First Submission
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {submissions.map((sub: any) => {
            const linkUrl = formatUrl(sub.repoUrl || sub.content);

            return (
              <div key={sub.id || sub._id} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: '#f8fafc' }}>
                      {sub.title || 'Untitled Submission'}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                      <span className="badge" style={{ backgroundColor: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', border: '1px solid #2563eb' }}>
                        {sub.courseCode || 'ITELECT4'}
                      </span>
                      {sub.priority && (
                        <span className="badge" style={{ backgroundColor: 'rgba(148, 163, 184, 0.15)', color: '#cbd5e1', border: '1px solid #475569' }}>
                          Priority: {sub.priority}
                        </span>
                      )}
                      {sub.category && (
                        <span className="badge" style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid #a855f7' }}>
                          {sub.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Submitted on: {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                  </small>
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Repository / Work Link:</p>
                  {linkUrl ? (
                    <a
                      href={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#60a5fa',
                        textDecoration: 'underline',
                        wordBreak: 'break-all',
                        fontWeight: 500,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      🔗 {linkUrl}
                    </a>
                  ) : (
                    <p style={{ color: '#cbd5e1', wordBreak: 'break-all' }}>{sub.content || sub.repoUrl || 'No content provided'}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}