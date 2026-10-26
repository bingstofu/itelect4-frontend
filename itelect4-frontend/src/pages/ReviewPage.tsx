import React, { useState } from 'react';
import { askAi } from '../api/client';
import type { AiReview } from '../types';

const READINESS_COLORS: Record<AiReview['readiness'], { bg: string; color: string; border: string }> = {
  ready: { bg: '#e8f5e9', color: '#2e7d32', border: '#a5d6a7' },
  almost: { bg: '#fffde7', color: '#f57f17', border: '#ffe082' },
  'not-yet': { bg: '#ffebee', color: '#c62828', border: '#ef9a9a' },
};

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

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '0.25rem' }}>AI Review</h2>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>
        Describe your project and get feedback before you submit it.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label htmlFor="prompt" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Project Description
          </label>
          <textarea
            id="prompt"
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What it does, how it is built, deployment details, README status..."
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            justifySelf: 'start',
            padding: '0.6rem 1.25rem',
            backgroundColor: loading ? '#999' : '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Reviewing...' : 'Review my project'}
        </button>
      </form>

      {error && (
        <p style={{ color: '#d32f2f', marginTop: '1rem', padding: '0.5rem', backgroundColor: '#ffebee', borderRadius: '4px' }}>
          {error}
        </p>
      )}

      {review && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1.25rem',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.6rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                backgroundColor: READINESS_COLORS[review.readiness].bg,
                color: READINESS_COLORS[review.readiness].color,
                border: `1px solid ${READINESS_COLORS[review.readiness].border}`,
              }}
            >
              {review.readiness}
            </span>
          </div>

          <p style={{ fontSize: '1.05rem', fontWeight: '500', margin: '0 0 1rem 0' }}>{review.summary}</p>

          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2e7d32' }}>Strengths</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {review.strengths.map((s, idx) => (
                <li key={idx} style={{ marginBottom: '0.25rem' }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#c62828' }}>Before You Submit</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
              {review.improvements.map((imp, idx) => (
                <li key={idx} style={{ marginBottom: '0.25rem' }}>
                  {imp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}