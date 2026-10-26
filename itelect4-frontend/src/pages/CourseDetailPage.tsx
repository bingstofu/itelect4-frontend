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
    apiFetch<Course>(`/api/courses/${code}`)
      .then(setCourse)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <Link to="/">← Back to Courses</Link>
      <h2>{course.title}</h2>
      <p><strong>Code:</strong> {course.code}</p>
      <p><strong>Units:</strong> {course.units}</p>
      <p><strong>Semester:</strong> {course.semester}</p>
    </div>
  );
}