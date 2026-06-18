'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

function MiniCalendar({ selectedDate, onSelect, onClose }) {
  const [viewDate, setViewDate] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthName = viewDate.toLocaleString('default', {
    month: 'long',
  });

  const today = new Date();

  // Monday-first calendar
  const firstDay =
    (new Date(year, month, 1).getDay() + 6) % 7;

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    const isSelected =
      date.toDateString() ===
      selectedDate.toDateString();

    const isToday =
      date.toDateString() === today.toDateString();

    days.push(
      <button
        key={day}
        onClick={() => {
          onSelect(date);
          onClose();
        }}
        className={`
          h-9 w-9 rounded-lg text-sm transition-colors
          flex items-center justify-center
          ${
            isSelected
              ? 'bg-white text-black font-semibold'
              : isToday
              ? 'border border-zinc-700 text-white'
              : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
          }
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div
      className="
        absolute right-0 top-14 z-50
        w-72 rounded-2xl
        border border-zinc-800
        bg-zinc-950
        p-4
        shadow-2xl
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() =>
            setViewDate(
              new Date(year, month - 1, 1)
            )
          }
          className="rounded-lg p-2 hover:bg-zinc-800"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="font-medium">
          {monthName} {year}
        </div>

        <button
          onClick={() =>
            setViewDate(
              new Date(year, month + 1, 1)
            )
          }
          className="rounded-lg p-2 hover:bg-zinc-800"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-center text-xs text-zinc-500">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(
          (d, i) => (
            <div key={i}>{d}</div>
          )
        )}
      </div>

      <div className="grid grid-cols-7 place-items-center gap-y-1">
        {days}
      </div>

      <button
        onClick={() => {
          onSelect(new Date());
          onClose();
        }}
        className="
          mt-4 w-full rounded-xl
          bg-zinc-900 py-2 text-sm
          hover:bg-zinc-800
        "
      >
        Today
      </button>
    </div>
  );
}

export default function CalendarButton() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClick
    );

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClick
      );
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="
          flex h-12 w-12 flex-col
          items-center justify-center
          rounded-xl
          border border-zinc-800
          bg-zinc-900
          transition-colors
          hover:bg-zinc-800
        "
      >
        <CalendarIcon className="mb-0.5 h-3.5 w-3.5 text-zinc-500" />

        <span className="text-xs font-semibold text-white">
          {selectedDate.getDate()}
        </span>
      </button>

      {open && (
        <MiniCalendar
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}