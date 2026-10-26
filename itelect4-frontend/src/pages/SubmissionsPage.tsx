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

  if (loading) return <p>Loading submissions...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>My Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <ul>
          {submissions.map((sub) => (
            <li key={sub.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #eee' }}>
              <h3>{sub.title} ({sub.courseCode})</h3>
              <p>{sub.content}</p>
              <small>Submitted on: {new Date(sub.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}