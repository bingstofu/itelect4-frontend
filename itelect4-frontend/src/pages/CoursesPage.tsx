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

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.code} style={{ marginBottom: '0.5rem' }}>
              <Link to={`/courses/${course.code}`}>
                <strong>{course.code}</strong>: {course.title} ({course.units} Units)
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}