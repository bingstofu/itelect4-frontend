import type { ApiSubmission } from '../types';

interface SubmissionBadgeProps {
  submission: ApiSubmission;
}

export default function SubmissionBadge({ submission }: SubmissionBadgeProps) {
  return (
    <div>
      <p>Repo: {submission.repoUrl}</p>
      <p>Score: {submission.score ?? 'Not graded yet'}</p>
    </div>
  );
}