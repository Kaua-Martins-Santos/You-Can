import { Outlet, NavLink } from 'react-router-dom';
import { Home, CalendarCheck, Dumbbell, Camera, Scale, Settings } from 'lucide-react';

export function AppLayout() {
  const navItems = [
    { to: '/', icon: Home, label: 'Dash' },
    { to: '/daily', icon: CalendarCheck, label: 'Diário' },
    { to: '/weekly', icon: Scale, label: 'Peso' },
    { to: '/workout', icon: Dumbbell, label: 'Treino' },
    { to: '/photos', icon: Camera, label: 'Fotos' },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-darker text-gray-100">
      <header className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="font-bold text-lg tracking-wide text-accent">Tracker Premium</h1>
        <NavLink to="/settings" className="text-gray-400 hover:text-white transition">
          <Settings size={20} />
        </NavLink>
      </header>

      <main className="flex-1 overflow-y-auto p-4 pb-24">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full bg-dark/95 backdrop-blur-md border-t border-gray-800 pb-safe z-50">
        <ul className="flex justify-around items-center p-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-gray-500'
                  }`
                }
              >
                <Icon size={24} strokeWidth={1.5} />
                <span className="text-[10px] font-medium">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}