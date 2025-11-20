import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function NavbarMain() {
  return (
    <header className="w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white/95 backdrop-blur-md rounded-b-3xl shadow-md py-3 px-6 flex items-center justify-between">
          <div className="flex items-center gap-16">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold">Cerope</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/home" className={({isActive}) => isActive ? 'text-blue-600 font-semibold' : ''}>Home</NavLink>

              <div className="relative group">
                <button className="flex items-center gap-1">Know My Vibe ▾</button>

                
                <div className="absolute top-full left-0 mt-2 bg-white shadow rounded p-3 hidden group-hover:block">
                  <Link to="/vibe/style" className="block py-1">Style Test</Link>
                  <Link to="/vibe/colors" className="block py-1">Color Profile</Link>
                </div>
              </div>

              <NavLink to="/wardrobe">My Wardrobe</NavLink>
              <NavLink to="/ask-ai">Ask AI Pal</NavLink>
              <NavLink to="/plan">Plan Outfit</NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 rounded-full text-sm font-medium hidden md:inline-block"
              style={{
                background: 'linear-gradient(90deg,#f9f1ff, #dbeafe)',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              Explore More ✨
            </button>

            <div className="w-10 h-10 rounded-full overflow-hidden border-2">
              <img src="/avatars/profile.png" alt="user" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
