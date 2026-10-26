import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api/client';
import type { Course } from '../types';

export default function SubmissionFormPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseCode, setCourseCode] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch<Course[]>('/api/courses')
      .then((data) => {
        setCourses(data);
        if (data.length > 0) setCourseCode(data[0].code);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await apiFetch('/api/submissions', {
        method: 'POST',
        body: JSON.stringify({ courseCode, title, content }),
      });
      navigate('/submissions');
    } catch (err: any) {
      setError(err.message || 'Failed to submit project');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '500px' }}>
      <h2>Create Submission</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          Course:
          <select value={courseCode} onChange={(e) => setCourseCode(e.target.value)} style={{ width: '100%', marginTop: '0.25rem' }}>
            {courses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
        </label>
        <input
          type="text"
          placeholder="Submission Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content / Submission details"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
        />
        <button type="submit">Submit Work</button>
      </form>
    </div>
  );
}