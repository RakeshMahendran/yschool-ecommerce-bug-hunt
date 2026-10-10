import type { ReactNode } from 'react';
import Icon, { type IconName } from './Icon';

interface EmptyStateProps {
  title: string;
  message: string;
  testId: string;
  icon?: IconName;
  action?: ReactNode;
}

export default function EmptyState({ title, message, testId, icon = 'bag', action }: EmptyStateProps) {
  return (
    <div className="empty-state" data-testid={testId}>
      <div className="empty-icon" aria-hidden="true">
        <Icon name={icon} size={40} />
      </div>
      <h2>{title}</h2>
      <p className="muted">{message}</p>
      {action}
    </div>
  );
}
