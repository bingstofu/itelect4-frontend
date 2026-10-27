import React, { useState } from 'react';
import { askAi } from '../api/client';
import type { AiReview } from '../types';

export default function ReviewPage() {
  const [prompt, setPrompt] = useState('');
  const [review, setReview] = useState<AiReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = prompt.trim();

    if (trimmed.length < 20) {
      setError('Describe your project in at least 20 characters.');
      return;
    }
    if (trimmed.length > 2000) {
      setError('Keep the description under 2000 characters.');
      return;
    }

    setError(null);
    setLoading(true);
    setReview(null);

    try {
      const data = await askAi(trimmed);
      setReview(data);
    } catch (err: any) {
      setError(err.message || 'Failed to get AI review.');
    } finally {
      setLoading(false);
    }
  };

  const badgeClass = review?.readiness === 'ready' 
    ? 'badge-ready' 
    : review?.readiness === 'almost' 
    ? 'badge-almost' 
    : 'badge-notyet';

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ marginBottom: '0.25rem' }}>AI Review</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Describe your project and get instant feedback before submitting.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="prompt" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Project Description
            </label>
            <textarea
              id="prompt"
              rows={6}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What it does, technology stack, deployment status, unit test status..."
              className="textarea-field"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            {loading ? 'Reviewing...' : 'Review my project'}
          </button>
        </form>

        {error && <div className="error-box" style={{ marginTop: '1.25rem' }}>{error}</div>}

        {review && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '1rem' }}>
              <span className={`badge ${badgeClass}`}>
                Readiness: {review.readiness}
              </span>
            </div>

            <p style={{ fontSize: '1.05rem', fontWeight: 500, marginBottom: '1.25rem', color: '#f8fafc' }}>
              {review.summary}
            </p>

            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#4ade80' }}>Strengths</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1' }}>
                {review.strengths.map((s, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#f87171' }}>Before You Submit</h4>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#cbd5e1' }}>
                {review.improvements.map((imp, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}