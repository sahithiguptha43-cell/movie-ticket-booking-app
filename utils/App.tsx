import { useState, useMemo } from "react";
import { Flame, TrendingUp, Clapperboard, Filter } from "lucide-react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import SeatSelector from "./components/SeatSelector";
import MyTickets from "./components/MyTickets";
import ConfirmationModal from "./components/ConfirmationModal";
import { TicketData } from "./components/TicketCard";
import { SeatType } from "./components/SeatSelector";
import { movies, Movie, ShowTime } from "./data/movies";

const ALL_GENRES = ["All", "Action", "Sci-Fi", "Drama", "Adventure", "Biography", "Crime", "Thriller", "Romance", "Comedy", "Fantasy", "Mystery", "History"];

type Screen = "home" | "detail" | "seats";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<ShowTime | null>(null);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [showMyTickets, setShowMyTickets] = useState(false);
  const [confirmedTicket, setConfirmedTicket] = useState<TicketData | null>(null);

  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesGenre = selectedGenre === "All" || m.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setScreen("detail");
  };

  const handleSelectShowtime = (movie: Movie, showtime: ShowTime) => {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    setScreen("seats");
  };

  const handleConfirmSeats = (seats: string[], seatType: SeatType, totalPrice: number) => {
    if (!selectedMovie || !selectedShowtime) return;

    const today = new Date();
    const dateStr = today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

    const newTicket: TicketData = {
      id: `CNB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      movieTitle: selectedMovie.title,
      moviePoster: selectedMovie.poster,
      date: dateStr,
      time: selectedShowtime.time,
      hall: selectedShowtime.hall,
      seats,
      totalPrice,
      seatType,
    };

    setTickets((prev) => [newTicket, ...prev]);
    setConfirmedTicket(newTicket);
    setScreen("home");
    setSelectedMovie(null);
    setSelectedShowtime(null);
  };

  const handleCloseDetail = () => {
    setScreen("home");
    setSelectedMovie(null);
  };

  const handleCloseSeats = () => {
    setScreen("detail");
    setSelectedShowtime(null);
  };

  const handleRemoveTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
        ticketCount={tickets.length}
        onCartClick={() => setShowMyTickets(true)}
      />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Banner */}
        <div className="relative h-72 sm:h-80 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/7991266/pexels-photo-7991266.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
            alt="Cinema"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-6 sm:px-12 lg:px-20 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-rose-400 text-sm font-semibold uppercase tracking-widest">Now Showing</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-3">
                Book Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                  Perfect Seat
                </span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base max-w-md">
                Discover the latest blockbusters, choose your seats, and enjoy the ultimate cinema experience.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Genre Filter */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-4 h-4 text-rose-400" />
              <span className="text-gray-400 text-sm font-medium">Filter by genre</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {ALL_GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedGenre === genre
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-900/50"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-white/10"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Now Showing Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-rose-600/20 border border-rose-500/30 px-3 py-1.5 rounded-full">
                <Flame className="w-4 h-4 text-rose-400" />
                <span className="text-rose-300 text-sm font-semibold">Now Showing</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-rose-500/30 to-transparent" />
            </div>

            {filteredMovies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Clapperboard className="w-12 h-12 text-gray-700 mb-4" />
                <p className="text-gray-400 font-medium">No movies found</p>
                <p className="text-gray-600 text-sm mt-1">Try a different search or genre</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
                ))}
              </div>
            )}
          </section>

          {/* Coming Soon placeholder */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 px-3 py-1.5 rounded-full">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                <span className="text-violet-300 text-sm font-semibold">Coming Soon</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-violet-500/30 to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Gladiator II", date: "Nov 22, 2024", genre: "Action / Epic", img: "https://images.pexels.com/photos/8263354/pexels-photo-8263354.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600" },
                { title: "Wicked", date: "Nov 22, 2024", genre: "Musical / Fantasy", img: "https://images.pexels.com/photos/7991320/pexels-photo-7991320.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600" },
                { title: "Moana 2", date: "Nov 27, 2024", genre: "Animation / Adventure", img: "https://images.pexels.com/photos/806880/pexels-photo-806880.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=600" },
              ].map((item) => (
                <div key={item.title} className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-1">{item.genre}</p>
                    <h4 className="text-white font-bold text-base">{item.title}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">{item.date}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-violet-600/80 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Soon
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/5 py-8 px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="bg-gradient-to-br from-rose-500 to-orange-500 p-1.5 rounded-lg">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg">
              Cine<span className="text-rose-400">Book</span>
            </span>
          </div>
          <p className="text-gray-600 text-sm">© 2024 CineBook. Book smarter, watch better.</p>
        </footer>
      </main>

      {/* Overlays */}
      {screen === "detail" && selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={handleCloseDetail}
          onSelectShowtime={handleSelectShowtime}
        />
      )}

      {screen === "seats" && selectedMovie && selectedShowtime && (
        <SeatSelector
          movie={selectedMovie}
          showtime={selectedShowtime}
          onClose={handleCloseSeats}
          onConfirm={handleConfirmSeats}
        />
      )}

      {showMyTickets && (
        <MyTickets
          tickets={tickets}
          onClose={() => setShowMyTickets(false)}
          onRemove={handleRemoveTicket}
        />
      )}

      {confirmedTicket && (
        <ConfirmationModal
          ticket={confirmedTicket}
          onClose={() => setConfirmedTicket(null)}
          onViewTickets={() => {
            setConfirmedTicket(null);
            setShowMyTickets(true);
          }}
        />
      )}
    </div>
  );
}
