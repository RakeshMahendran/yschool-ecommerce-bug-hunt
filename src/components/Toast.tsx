import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toast, dismissToast } = useToast();

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className={`toast toast-${toast.tone}`} data-testid="toast">
          <span data-testid="toast-message">{toast.message}</span>
          <button type="button" className="toast-close" onClick={dismissToast} aria-label="Dismiss notification">
            ×
          </button>
        </div>
      )}
    </div>
  );
}
