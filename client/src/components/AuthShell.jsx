export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <main className="auth">
      <section className="auth-art" aria-hidden="true">
        <div className="bubble b1">Are you free tonight?</div>
        <div className="bubble b2 mine">Just finishing up. Call you in ten.</div>
        <div className="bubble b3">Perfect. I'll save you a seat.</div>
        <div className="typing"><i /><i /><i /></div>
      </section>
      <section className="auth-panel">
        <h1 className="brand">Hushline</h1>
        <h2>{title}</h2>
        <p className="muted">{subtitle}</p>
        {children}
        <p className="auth-footer">{footer}</p>
      </section>
    </main>
  );
}
