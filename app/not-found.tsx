import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div style={{ background: 'var(--black)', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', textAlign: 'center' }}>
      <Image src="/icon.svg" alt="AbaFans" width={56} height={56} style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
      <h1 style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--brand-red)', lineHeight: 1 }}>404</h1>
      <p style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0.75rem 0 0.4rem' }}>Page not found</p>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '2rem' }}>That page does not exist — maybe the match was postponed.</p>
      <Link href="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.75rem 1.5rem', background: 'var(--brand-red)', color: '#fff',
        borderRadius: 'var(--radius-lg)', fontSize: '14px', fontWeight: 600,
      }}>
        Back to matches
      </Link>
    </div>
  );
}
