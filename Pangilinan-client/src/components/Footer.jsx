import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Removed max-w from here so the border/background spans 100% width
    <footer className="w-full border-t-2 border-zinc-900 bg-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">
              F1<span className="text-red-500">HUB</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-600">
              Your ultimate Formula 1 information hub. Explore teams, drivers,
              circuits, and the latest F1 news.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-start md:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Navigation
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/articles"
                    className="text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    Articles
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start md:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Contact
              </p>
              <p className="mt-4 text-sm text-zinc-600">vincepangilinan187@gmail.com</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
           
              </p>
        
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-zinc-200 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
            
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-900">
            
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;