import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../api/client';
import type { Course } from '../types';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<Course[]>('/api/courses')
      .then(setCourses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ color: 'var(--text-muted)' }}>Loading courses...</p>;
  if (error) return <div className="error-box">{error}</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Available Courses</h2>
      {courses.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No courses found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {courses.map((course) => (
            <div key={course.code} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge" style={{ backgroundColor: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', border: '1px solid #2563eb' }}>
                  {course.code}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{course.units} Units</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{course.title}</h3>
              <Link to={`/courses/${course.code}`} className="btn-primary" style={{ display: 'inline-block', textAlign: 'center', width: '100%', textDecoration: 'none', padding: '0.5rem' }}>
                View Course
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}