'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowLeft, LuMail, LuLock, LuUser, LuEye, LuEyeOff } from 'react-icons/lu';

type Mode = 'signin' | 'signup';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('signin');
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const inputStyle = {
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    background: 'var(--secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', padding: '0 1rem', height: '3rem',
    transition: 'var(--transition)',
  };

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <Link href="/" className="back-btn" style={{ marginBottom: '2rem' }}>
          <LuArrowLeft size={16} /> Home
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Image src="/icon.svg" alt="AbaFans" width={56} height={56} style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            {mode === 'signin' ? 'Welcome back' : 'Join AbaFans'}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {mode === 'signin' ? 'Sign in to track predictions & earn points' : 'Start predicting and climb the leaderboard'}
          </p>
        </div>

        <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: '0 0 0 1px var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Mode tabs */}
          <div className="tab-pills" style={{ marginBottom: '0.5rem' }}>
            <div className={`tab-pill${mode === 'signin' ? ' active' : ''}`} onClick={() => setMode('signin')}>Sign In</div>
            <div className={`tab-pill${mode === 'signup' ? ' active' : ''}`} onClick={() => setMode('signup')}>Sign Up</div>
          </div>

          {mode === 'signup' && (
            <div style={inputStyle}>
              <LuUser size={16} color="var(--text-muted)" />
              <input
                placeholder="Full name"
                value={name} onChange={e => setName(e.target.value)}
                style={{ flex: 1, fontSize: '14px' }}
              />
            </div>
          )}

          <div style={inputStyle}>
            <LuMail size={16} color="var(--text-muted)" />
            <input
              type="email" placeholder="Email address"
              value={email} onChange={e => setEmail(e.target.value)}
              style={{ flex: 1, fontSize: '14px' }}
            />
          </div>

          <div style={inputStyle}>
            <LuLock size={16} color="var(--text-muted)" />
            <input
              type={showPw ? 'text' : 'password'} placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              style={{ flex: 1, fontSize: '14px' }}
            />
            <button onClick={() => setShowPw(!showPw)} style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
              {showPw ? <LuEyeOff size={16} /> : <LuEye size={16} />}
            </button>
          </div>

          <button style={{
            width: '100%', padding: '0.85rem',
            background: 'var(--brand-red)', color: '#fff',
            borderRadius: 'var(--radius)', fontSize: '14px', fontWeight: 700,
            transition: 'var(--transition)',
          }}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>

          {/* Social auth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <button style={{
            width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            background: 'var(--secondary)', borderRadius: 'var(--radius)', fontSize: '13px', fontWeight: 600,
            border: '1px solid var(--border)', color: 'var(--text-secondary)', transition: 'var(--transition)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '1.25rem' }}>
          By continuing you agree to AbaFans&apos; Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
