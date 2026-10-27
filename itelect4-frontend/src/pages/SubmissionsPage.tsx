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

  const parseTitleAndLink = (rawTitle: string = '', sub: any) => {
    const directContent = sub.repoUrl || sub.content || sub.description || '';
    const textToSearch = `${rawTitle} ${directContent}`;
    const urlRegex = /(https?:\/\/[^\s]+|github\.com[^\s]+)/i;
    const match = textToSearch.match(urlRegex);

    let linkUrl: string | null = null;
    if (match) {
      linkUrl = match[0].startsWith('http') ? match[0] : `https://${match[0]}`;
    }

    let cleanTitle = rawTitle;
    if (match && rawTitle.includes(match[0])) {
      cleanTitle = rawTitle
        .replace(match[0], '')
        .replace(/\s*[—\-\|:]\s*$/, '')
        .replace(/^\s*[—\-\|:]\s*/, '')
        .trim();
    }

    return {
      title: cleanTitle || 'Submission Work',
      linkUrl,
    };
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
            const { title: displayTitle, linkUrl } = parseTitleAndLink(sub.title, sub);

            return (
              <div key={sub.id || sub._id} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem', color: '#f8fafc' }}>
                      {displayTitle}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                      <span className="badge" style={{ backgroundColor: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', border: '1px solid #2563eb' }}>
                        {sub.category ? sub.category.toUpperCase() : 'STUDY'}
                      </span>
                      {sub.priority !== undefined && sub.priority !== null && (
                        <span className="badge" style={{ backgroundColor: 'rgba(148, 163, 184, 0.15)', color: '#cbd5e1', border: '1px solid #475569' }}>
                          Priority: {sub.priority}
                        </span>
                      )}
                    </div>
                  </div>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Submitted on: {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                  </small>
                </div>

                {linkUrl && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Repository / Work Link:</p>
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
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}