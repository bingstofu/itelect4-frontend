import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../api/client';
import type { Course } from '../types';

export default function CourseDetailPage() {
  const { code } = useParams<{ code: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;
    apiFetch<Course>(`/api/courses/${code}`)
      .then(setCourse)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Loading course details...</p>;
  if (error) return <div className="error-box">{error}</div>;
  if (!course) return <p style={{ color: 'var(--text-muted)' }}>Course not found.</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-block', marginBottom: '1rem' }}>
        ← Back to Courses
      </Link>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <span className="badge" style={{ backgroundColor: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', border: '1px solid #2563eb', marginBottom: '0.5rem' }}>
              {course.code}
            </span>
            <h2 style={{ fontSize: '1.75rem', color: '#f8fafc', marginTop: '0.25rem' }}>{course.title}</h2>
          </div>
          <Link to="/submissions/new" className="btn-primary" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            Submit Work for this Course
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '1rem', backgroundColor: '#0f172a', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Academic Units</span>
            <strong style={{ fontSize: '1.1rem', color: '#f8fafc' }}>{course.units} Units</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Semester Offering</span>
            <strong style={{ fontSize: '1.1rem', color: '#f8fafc' }}>{course.semester || '1st Semester, AY 2026-2027'}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>Department</span>
            <strong style={{ fontSize: '1.1rem', color: '#f8fafc' }}>College of Information Technology</strong>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#f8fafc' }}>Course Description</h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
            {course.description || `Comprehensive study and practical application of core topics in ${course.title}. Designed to give students hands-on technical proficiency, architectural knowledge, and modern industry workflows.`}
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#f8fafc' }}>Key Modules & Syllabus Outline</h3>
          <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', display: 'grid', gap: '0.5rem' }}>
            <li>Module 1: System Architecture & Development Setup</li>
            <li>Module 2: Database Schemas, API Design & Data Persistence</li>
            <li>Module 3: Authentication, Authorization & JWT Route Guards</li>
            <li>Module 4: Automated Testing Suite & Continuous Integration (CI/CD)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}