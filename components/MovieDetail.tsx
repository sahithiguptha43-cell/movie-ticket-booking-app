import { X, Star, Clock, Calendar, Globe } from "lucide-react";
import { Movie, ShowTime, showTimes } from "../data/movies";
import { useState } from "react";

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
  onSelectShowtime: (movie: Movie, showtime: ShowTime) => void;
}

const dates = ["Today", "Tomorrow", "Wed 14", "Thu 15", "Fri 16", "Sat 17"];

export default function MovieDetail({ movie, onClose, onSelectShowtime }: MovieDetailProps) {
  const [selectedDate, setSelectedDate] = useState(0);
  const times = showTimes[movie.id] || [];
  const hours = Math.floor(movie.duration / 60);
  const mins = movie.duration % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl">
        {/* Hero */}
        <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-3xl sm:rounded-t-3xl">
          <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                <Star className="w-4 h-4 fill-yellow-400" />
                {movie.imdb}
              </div>
              <span className="text-gray-400">·</span>
              <span className="text-gray-300 text-sm bg-white/10 border border-white/20 px-2 py-0.5 rounded-full">
                {movie.rating}
              </span>
            </div>
            <h2 className="text-white text-2xl font-bold">{movie.title}</h2>
          </div>
        </div>

        <div className="p-6">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 mb-5 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-rose-400" />
              {hours}h {mins}m
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-rose-400" />
              {movie.releaseDate}
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-rose-400" />
              {movie.language}
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-5">
            {movie.genre.map((g) => (
              <span key={g} className="text-xs font-medium text-rose-400 bg-rose-400/10 border border-rose-400/20 px-3 py-1 rounded-full">
                {g}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed mb-6">{movie.description}</p>

          {/* Director & Cast */}
          <div className="mb-6">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Director</p>
            <p className="text-white text-sm font-medium">{movie.director}</p>
          </div>
          <div className="mb-6">
            <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Cast</p>
            <div className="flex flex-wrap gap-2">
              {movie.cast.map((c) => (
                <span key={c} className="text-xs text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Date selector */}
          <div className="mb-4">
            <p className="text-white font-semibold mb-3">Select Date</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {dates.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setSelectedDate(i)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedDate === i
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-900/50"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Showtimes */}
          <div>
            <p className="text-white font-semibold mb-3">Select Showtime</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {times.map((st) => (
                <button
                  key={st.id}
                  onClick={() => onSelectShowtime(movie, st)}
                  className="group bg-white/5 hover:bg-rose-600 border border-white/10 hover:border-rose-500 rounded-xl p-3 text-left transition-all duration-200"
                >
                  <p className="text-white font-bold text-sm">{st.time}</p>
                  <p className="text-gray-400 group-hover:text-rose-100 text-xs mt-0.5">{st.hall}</p>
                  <p className="text-rose-400 group-hover:text-rose-200 text-xs font-medium mt-1">
                    from ${st.price.standard}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
