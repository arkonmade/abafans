'use client';
import { useState } from 'react';
import { LuBell, LuBellOff } from 'react-icons/lu';
import Toast from './Toast';
import type { FollowableType } from '@/types';

interface Props {
  type: FollowableType;
  id: string;
  label?: string;
  count?: number;
}

export default function FollowButton({ type, id, label = 'Follow', count }: Props) {
  const [following, setFollowing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggle = () => {
    setFollowing(f => !f);
    setToast(following ? 'Unfollowed' : `Following! You'll be notified of updates.`);
  };

  return (
    <>
      <button onClick={toggle} style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.55rem 1rem',
        background: following ? 'var(--card)' : 'var(--secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        fontSize: '13px', fontWeight: 600,
        color: following ? 'var(--brand-red)' : 'var(--text-secondary)',
        transition: 'var(--transition)',
      }}>
        {following ? <LuBellOff size={14} /> : <LuBell size={14} />}
        {following ? 'Following' : label}
        {count !== undefined && !following && (
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 400 }}>
            {count.toLocaleString()}
          </span>
        )}
      </button>
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}
