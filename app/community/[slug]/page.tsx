'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuArrowLeft, LuSend, LuSmile, LuPin, LuEllipsisVertical } from 'react-icons/lu';
import { communityRooms, peopleList } from '@/lib/data';
import { useParams } from 'next/navigation';

const SEED_MESSAGES = [
  { id: 'm1', userId: 'p1', content: 'This is going to be an incredible match! 🔥', time: '19:42', reactions: [{ emoji: '🔥', count: 5 }] },
  { id: 'm2', userId: 'p3', content: 'Who else thinks Real Madrid takes this one?', time: '19:44', reactions: [{ emoji: '👍', count: 3 }, { emoji: '❤️', count: 2 }] },
  { id: 'm3', userId: 'p5', content: 'At Goal! Lounge right now — screens are perfect 📺', time: '19:46', reactions: [{ emoji: '😍', count: 4 }] },
  { id: 'm4', userId: 'p2', content: 'Man Utd all the way! Never doubting them 💪', time: '19:47', reactions: [] },
  { id: 'm5', userId: 'p7', content: 'The atmosphere here at Fan Zone is insane!!', time: '19:50', reactions: [{ emoji: '🔥', count: 8 }] },
];

const EMOJIS = ['🔥', '⚽', '👍', '❤️', '😍', '😂', '🎯', '💪', '🏆', '😮'];

export default function CommunityRoomPage() {
  const params = useParams<{ slug: string }>();
  const room = communityRooms.find(r => r.slug === params.slug);
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [input, setInput] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    setMessages(prev => [...prev, {
      id: `m${Date.now()}`, userId: 'p1',
      content: text,
      time: `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`,
      reactions: [],
    }]);
    setInput('');
  };

  const addReaction = (msgId: string, emoji: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== msgId) return m;
      const existing = m.reactions.find(r => r.emoji === emoji);
      if (existing) {
        return { ...m, reactions: m.reactions.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r) };
      }
      return { ...m, reactions: [...m.reactions, { emoji, count: 1 }] };
    }));
  };

  const getUser = (id: string) => peopleList.find(p => p.id === id);
  const isMe = (id: string) => id === 'p1';

  if (!room) {
    return (
      <div style={{ background: 'var(--black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>Room not found</p>
        <Link href="/community" className="back-btn"><LuArrowLeft size={16} /> Community</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--black)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Room header */}
      <div style={{ position: 'sticky', top: '4.5rem', zIndex: 100, background: 'rgba(18,18,18,0.96)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0.75rem 1rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link href="/community" style={{ color: 'var(--text-muted)', display: 'flex' }}><LuArrowLeft size={18} /></Link>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{room.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
              <span>{room.activeUsers} active</span>
              {!room.isPermanent && <span style={{ color: 'var(--warning)' }}>· Auto-deletes in 24h</span>}
            </div>
          </div>
          <button style={{ color: 'var(--text-muted)' }}><LuEllipsisVertical size={18} /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="container" style={{ flex: 1, overflowY: 'auto', padding: '1rem 0', paddingBottom: '5rem' }}>
        {!room.isPermanent && (
          <div style={{ textAlign: 'center', padding: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', background: 'var(--secondary)', padding: '4px 10px', borderRadius: '999px' }}>
              💬 Messages auto-delete after 24 hours
            </span>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {messages.map(msg => {
            const user = getUser(msg.userId);
            const mine = isMe(msg.userId);
            return (
              <div key={msg.id} style={{ display: 'flex', flexDirection: mine ? 'row-reverse' : 'row', gap: '0.5rem', alignItems: 'flex-end', maxWidth: '85%', marginLeft: mine ? 'auto' : 0 }}>
                {!mine && (
                  <div style={{ width: 30, height: 30, borderRadius: 8, overflow: 'hidden', flexShrink: 0, position: 'relative', background: 'var(--card)' }}>
                    {user && <Image src={user.avatar} alt={user.name} fill style={{ objectFit: 'cover' }} unoptimized />}
                  </div>
                )}
                <div>
                  {!mine && <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '0.2rem', paddingLeft: '0.5rem' }}>{user?.name}</div>}
                  <div style={{
                    padding: '0.6rem 0.85rem',
                    background: mine ? 'var(--brand-red)' : 'var(--secondary)',
                    borderRadius: mine ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                    fontSize: '13px', lineHeight: 1.5,
                    color: mine ? '#fff' : 'var(--text-primary)',
                  }}>
                    {msg.content}
                  </div>
                  {msg.reactions.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.3rem', flexWrap: 'wrap', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
                      {msg.reactions.map(r => (
                        <button key={r.emoji} onClick={() => addReaction(msg.id, r.emoji)} style={{
                          display: 'flex', alignItems: 'center', gap: 2,
                          padding: '1px 6px', background: 'var(--card)', borderRadius: '999px',
                          fontSize: '11px', border: '1px solid var(--border)',
                        }}>
                          {r.emoji} <span style={{ color: 'var(--text-muted)' }}>{r.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '0.2rem', textAlign: mine ? 'right' : 'left', paddingLeft: '0.4rem' }}>{msg.time}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Emoji picker */}
      {showEmoji && (
        <div style={{ position: 'fixed', bottom: '6rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '0.75rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', zIndex: 200, maxWidth: 280 }}>
          {EMOJIS.map(e => (
            <button key={e} onClick={() => { setInput(i => i + e); setShowEmoji(false); }} style={{ fontSize: '1.4rem', padding: '0.25rem' }}>{e}</button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div style={{ position: 'fixed', bottom: '4rem', left: 0, right: 0, background: 'rgba(18,18,18,0.96)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--border)', padding: '0.6rem 1rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={() => setShowEmoji(s => !s)} style={{ color: 'var(--text-muted)', display: 'flex', flexShrink: 0 }}>
            <LuSmile size={20} />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Say something about the match…"
            style={{
              flex: 1, fontSize: '14px', padding: '0.55rem 0.9rem',
              background: 'var(--secondary)', borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
            }}
          />
          <button onClick={send} disabled={!input.trim()} style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: input.trim() ? 'var(--brand-red)' : 'var(--card)',
            color: input.trim() ? '#fff' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'var(--transition)',
          }}>
            <LuSend size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
