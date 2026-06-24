import { Film, Search, User, Ticket } from "lucide-react";

interface NavbarProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  ticketCount: number;
  onCartClick: () => void;
}

export default function Navbar({ onSearch, searchQuery, ticketCount, onCartClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-rose-500 to-orange-500 p-1.5 rounded-lg">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Cine<span className="text-rose-400">Book</span>
            </span>
          </div>

          {/* Search */}
          <div className="hidden sm:flex items-center flex-1 max-w-xs mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-gray-400 rounded-full pl-10 pr-4 py-2 text-sm outline-none border border-white/10 focus:border-rose-500 transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">My Tickets</span>
              {ticketCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {ticketCount}
                </span>
              )}
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
