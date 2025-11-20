

export default function NavbarAuth() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 mt-0.5">
      <div className="max-w-7xl mx-auto px-6  ">
        <div className="bg-white/95 backdrop-blur-md mt-2.5 rounded-b-3xl shadow-md py-3 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">Cerope</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 rounded-full text-sm font-medium"
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
