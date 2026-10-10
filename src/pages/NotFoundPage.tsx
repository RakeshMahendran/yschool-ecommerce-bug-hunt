import EmptyState from '../components/EmptyState';
import Link from '../components/Link';

export default function NotFoundPage() {
  return (
    <main className="page container" id="main-content">
      <h1 className="page-title">Page not found</h1>
      <EmptyState
        testId="not-found"
        icon="compass"
        title="This page doesn't exist"
        message="The link may be broken or the page may have moved."
        action={
          <Link to="/" className="btn btn-primary">
            Back to shop
          </Link>
        }
      />
    </main>
  );
}
