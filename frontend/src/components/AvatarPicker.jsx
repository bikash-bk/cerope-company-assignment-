import React, { useState } from 'react';

const defaultAvatars = [
  'avatar1.png','avatar2.png','avatar3.png','avatar4.png','avatar5.png','avatar6.png',
  'avatar7.png','avatar8.png','avatar9.png','avatar10.png'
];

export default function AvatarPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = value;

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="input flex items-center justify-between"
        >
          <span>{selected ? selected.replace('.png','') : 'Select Profile Picture'}</span>
          <span>▾</span>
        </button>
        <div className="w-20 h-20 rounded-full overflow-hidden border-2">
          <img src={selected ? `/avatars/${selected}` : '/avatars/default.png'} alt="avatar" />
        </div>
      </div>

      {open && (
        <div className="absolute z-40 bg-white shadow-md rounded p-3 mt-2">
          <div className="grid grid-cols-5 gap-3">
            {defaultAvatars.map(a => (
              <button key={a} onClick={() => { onChange(a); setOpen(false);} } className={`p-1 rounded ${value === a ? 'ring-2 ring-indigo-400' : ''}`}>
                <img src={`/avatars/${a}`} alt={a} className="w-12 h-12 rounded-full" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
