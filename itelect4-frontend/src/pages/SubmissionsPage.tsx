import { useEffect, useState } from 'react';
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

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>My Submissions</h2>
      {submissions.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No submissions found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {submissions.map((sub) => (
            <div key={sub.id} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem' }}>{sub.title}</h3>
                <span className="badge" style={{ backgroundColor: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', border: '1px solid #2563eb' }}>
                  {sub.courseCode}
                </span>
              </div>
              <p style={{ color: '#cbd5e1', marginBottom: '0.75rem', wordBreak: 'break-all' }}>{sub.content}</p>
              <small style={{ color: 'var(--text-muted)' }}>Submitted on: {new Date(sub.createdAt).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}