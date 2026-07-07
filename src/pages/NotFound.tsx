import "../styles/not-found.css";

type NotFoundProps = {
  onGoHome: () => void;
};

export function NotFound({ onGoHome }: NotFoundProps) {
  return (
    <main className="not-found-page">
      <section>
        <span>404 / WAYNETECH ROUTE FAILURE</span>
        <h1>Signal Lost</h1>
        <p>The requested Gotham Control route is not indexed in the Batcomputer.</p>

        <button onClick={onGoHome}>Return to Dashboard</button>
      </section>
    </main>
  );
}
