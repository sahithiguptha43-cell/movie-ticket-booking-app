import { Star, Clock, ChevronRight } from "lucide-react";
import { Movie } from "../data/movies";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const hours = Math.floor(movie.duration / 60);
  const mins = movie.duration % 60;

  return (
    <div
      onClick={() => onClick(movie)}
      className="group relative bg-gray-900 rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-rose-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-900/30"
    >
      {/* Poster */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/10">
          {movie.rating}
        </div>

        {/* IMDB */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-400 text-xs font-bold px-2.5 py-1 rounded-full">
          <Star className="w-3 h-3 fill-yellow-400" />
          {movie.imdb}
        </div>

        {/* Play button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-rose-600/90 backdrop-blur-sm rounded-full p-4">
            <ChevronRight className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-bold text-base mb-1 line-clamp-1">{movie.title}</h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((g) => (
            <span key={g} className="text-xs text-rose-400 bg-rose-400/10 border border-rose-400/20 px-2 py-0.5 rounded-full">
              {g}
            </span>
          ))}
        </div>

        {/* Duration & Book */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <Clock className="w-3.5 h-3.5" />
            {hours}h {mins}m
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(movie);
            }}
            className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
