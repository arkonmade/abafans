'use client';
import { useState } from 'react';
import { LuMapPin, LuHouse, LuUsers, LuCheck, LuChevronDown } from 'react-icons/lu';
import Toast from '@/components/ui/Toast';
import { venuesList } from '@/lib/data';
import type { CheckInLocation } from '@/types';

interface Props { matchId: string }

const LOCATION_OPTIONS: { id: CheckInLocation; label: string; icon: React.ReactNode }[] = [
  { id: 'home',   label: 'Watching at Home',         icon: <LuHouse size={15} /> },
  { id: 'friends',label: 'Watching with Friends',    icon: <LuUsers size={15} /> },
  { id: 'other',  label: 'Other Location',            icon: <LuMapPin size={15} /> },
];

export default function MatchCheckIn({ matchId }: Props) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [selected, setSelected] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const venueOptions = venuesList.map(v => ({ id: v.id, label: v.name, icon: <LuMapPin size={15} /> }));
  const allOptions = [...venueOptions, ...LOCATION_OPTIONS];

  const handleCheckIn = () => {
    if (!selected) { setToast('Choose where you are watching first!'); return; }
    setCheckedIn(true);
    const label = allOptions.find(o => o.id === selected)?.label ?? 'here';
    setToast(`✓ Checked in! Watching at ${label}`);
  };

  if (checkedIn) {
    const label = allOptions.find(o => o.id === selected)?.label ?? 'here';
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 'var(--radius-lg)' }}>
        <LuCheck size={16} color="var(--success)" />
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--success)' }}>Watching at {label}</span>
        <button onClick={() => { setCheckedIn(false); setSelected(''); }} style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--text-muted)' }}>Change</button>
      </div>
    );
  }

  return (
    <>
      <div style={{ background: 'var(--primary)', borderRadius: 'var(--radius-lg)', padding: '1rem', boxShadow: '0 0 0 1px var(--border)' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          📍 Match Presence — Where are you watching?
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          {/* Venue quick picks */}
          {venuesList.slice(0, 3).map(v => (
            <button key={v.id} onClick={() => setSelected(v.id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.45rem 0.8rem', borderRadius: 'var(--radius-lg)',
              fontSize: '12px', fontWeight: 500, transition: 'var(--transition)',
              background: selected === v.id ? 'var(--brand-red)' : 'var(--secondary)',
              color: selected === v.id ? '#fff' : 'var(--text-secondary)',
              border: selected === v.id ? 'none' : '1px solid var(--border)',
              flexShrink: 0,
            }}>
              <LuMapPin size={12} /> {v.name.split(' ')[0]}
            </button>
          ))}

          {/* More venues dropdown */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setOpen(!open)} style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.45rem 0.8rem', borderRadius: 'var(--radius-lg)',
              fontSize: '12px', fontWeight: 500,
              background: 'var(--secondary)', color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}>
              More <LuChevronDown size={12} />
            </button>
            {open && (
              <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 99, background: 'var(--primary)', borderRadius: 'var(--radius)', boxShadow: '0 0 0 1px var(--border)', minWidth: 200, overflow: 'hidden' }}>
                {[...venuesList.slice(3), ...LOCATION_OPTIONS].map(opt => (
                  <button key={opt.id} onClick={() => { setSelected(opt.id); setOpen(false); }} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    width: '100%', padding: '0.6rem 0.9rem', textAlign: 'left',
                    fontSize: '12px', color: selected === opt.id ? 'var(--brand-red)' : 'var(--text-secondary)',
                    background: selected === opt.id ? 'var(--card)' : 'transparent',
                    transition: 'background 0.2s',
                  }}>
                    {'icon' in opt ? opt.icon : <LuMapPin size={12} />} {'label' in opt ? opt.label : (opt as typeof venuesList[0]).name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* At home / friends */}
          {LOCATION_OPTIONS.slice(0, 2).map(opt => (
            <button key={opt.id} onClick={() => setSelected(opt.id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.45rem 0.8rem', borderRadius: 'var(--radius-lg)',
              fontSize: '12px', fontWeight: 500, transition: 'var(--transition)',
              background: selected === opt.id ? 'var(--brand-red)' : 'var(--secondary)',
              color: selected === opt.id ? '#fff' : 'var(--text-secondary)',
              border: selected === opt.id ? 'none' : '1px solid var(--border)',
            }}>
              {opt.icon} {opt.label.split(' ').slice(-1)[0]}
            </button>
          ))}
        </div>

        <button onClick={handleCheckIn} style={{
          width: '100%', padding: '0.65rem',
          background: selected ? 'var(--brand-red)' : 'var(--card)',
          color: selected ? '#fff' : 'var(--text-muted)',
          borderRadius: 'var(--radius)', fontSize: '13px', fontWeight: 600,
          transition: 'var(--transition)',
        }}>
          {selected ? "I'm Watching Here ⚽" : 'Select your location'}
        </button>
      </div>
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </>
  );
}
