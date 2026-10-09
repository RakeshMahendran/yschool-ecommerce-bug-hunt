import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  message: string;
  testId: string;
  icon?: string;
  action?: ReactNode;
}

export default function EmptyState({ title, message, testId, icon = '🛍️', action }: EmptyStateProps) {
  return (
    <div className="empty-state" data-testid={testId}>
      <div className="empty-icon" aria-hidden="true">
        {icon}
      </div>
      <h2>{title}</h2>
      <p className="muted">{message}</p>
      {action}
    </div>
  );
}
