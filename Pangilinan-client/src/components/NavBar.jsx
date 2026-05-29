import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' }
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-white-500 bg-red-500 text-white'
      : 'border-transparent text-zinc-500 hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900',
  ].join(' ');

// Custom SVG Logo Component (Enhancement 3)
const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="8" fill="#18181b" />
    <path d="M8 26 L18 10 L28 26" stroke="#b91010" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M12 20 H24" stroke="#b91010" strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="10" r="2" fill="#b91010" />
  </svg>
);

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-zinc-900 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo + Brand Name (Enhancement 3) */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <Logo />
          <div className="flex flex-col leading-none">
            <span className="text-[13px] font-black uppercase tracking-[0.15em] text-zinc-900 group-hover:text-red-600 transition">
              F1 
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-zinc-400">
              FORMULA 1
            </span>
          </div>
        </NavLink>

        {/* Navigation Links (Enhancement 1) */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <NavLink
            to="/auth/signin"
            className="rounded-full bg-zinc-900 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-red-600"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/auth/signup"
            className="rounded-full border-2 border-zinc-900 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-900 transition hover:bg-zinc-50"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile hamburger placeholder */}
        <button className="flex flex-col gap-1.5 p-1 md:hidden" aria-label="Open menu">
          <span className="block h-0.5 w-5 rounded bg-zinc-900" />
          <span className="block h-0.5 w-5 rounded bg-zinc-900" />
          <span className="block h-0.5 w-3 rounded bg-zinc-900" />
        </button>

      </div>
    </header>
  );
};

export default NavBar;
