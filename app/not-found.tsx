import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-stack">
      <section className="section">
        <div className="empty-state panel">
          <p className="eyebrow">Page not found</p>
          <h1>We could not find that finance page.</h1>
          <p className="lead">
            Head back to the main enquiry hub or choose one of the loan pathways
            below.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/">
              Return home
            </Link>
            <Link className="button button--ghost" href="/home-loans">
              View loan pages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
