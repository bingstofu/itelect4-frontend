import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SubmissionBadge from './SubmissionBadge';
import type { ApiSubmission } from '../types';

const graded: ApiSubmission = {
  id: '665f1c2ab4e8d3a1f0c9e101',
  studentId: '665f1c2ab4e8d3a1f0c9e001',
  courseCode: 'ITELECT4',
  repoUrl: 'https://github.com/juan/itelect4-project',
  submittedAt: '2026-10-17T02:15:00.000Z',
  score: 95,
};

describe('SubmissionBadge', () => {
  it('shows the repo link and the score', () => {
    render(<SubmissionBadge submission={graded} />);

    expect(screen.getByText('Repo: https://github.com/juan/itelect4-project')).toBeInTheDocument();
    expect(screen.getByText('Score: 95')).toBeInTheDocument();
  });

  it('says Not graded yet when there is no score', () => {
    const ungraded: ApiSubmission = { ...graded, score: undefined };

    render(<SubmissionBadge submission={ungraded} />);

    expect(screen.getByText('Score: Not graded yet')).toBeInTheDocument();
  });
});