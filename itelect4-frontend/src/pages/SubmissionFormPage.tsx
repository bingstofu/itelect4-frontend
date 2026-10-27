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
        body: JSON.stringify({
          courseCode,
          title,
          content,
          repoUrl: content,
        }),
      });
      navigate('/submissions');
    } catch (err: any) {
      setError(err.message || 'Failed to submit project');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ marginBottom: '0.5rem' }}>Create Submission</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Submit your repository link or project details for grading
        </p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Course</label>
            <select value={courseCode} onChange={(e) => setCourseCode(e.target.value)} className="select-field">
              {courses.map((course) => (
                <option key={course.code} value={course.code}>
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Submission Title</label>
            <input
              id="title"
              type="text"
              className="input-field"
              placeholder="e.g. GT6 Testing Implementation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="content" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Content / Repository Link</label>
            <textarea
              id="content"
              className="textarea-field"
              placeholder="https://github.com/username/repository"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Submit Work
          </button>
        </form>
      </div>
    </div>
  );
}