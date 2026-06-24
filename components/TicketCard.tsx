import { Ticket as TicketIcon, X, QrCode } from "lucide-react";

export interface TicketData {
  id: string;
  movieTitle: string;
  moviePoster: string;
  date: string;
  time: string;
  hall: string;
  seats: string[];
  totalPrice: number;
  seatType: string;
}

interface TicketCardProps {
  ticket: TicketData;
  onRemove?: (id: string) => void;
}

export default function TicketCard({ ticket, onRemove }: TicketCardProps) {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden border border-white/10 flex flex-col sm:flex-row">
      {/* Movie Poster Strip */}
      <div className="relative sm:w-32 h-40 sm:h-auto flex-shrink-0">
        <img src={ticket.moviePoster} alt={ticket.movieTitle} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-800 hidden sm:block" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 relative">
        {onRemove && (
          <button
            onClick={() => onRemove(ticket.id)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-start gap-3 mb-3">
          <div className="bg-rose-600/20 p-2 rounded-lg">
            <TicketIcon className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm leading-tight">{ticket.movieTitle}</h4>
            <p className="text-gray-400 text-xs mt-0.5 capitalize">{ticket.seatType} • {ticket.hall}</p>
          </div>
        </div>

        {/* Dashed divider */}
        <div className="border-t border-dashed border-white/10 my-3" />

        <div className="grid grid-cols-2 gap-y-2 text-xs mb-3">
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-[10px]">Date</p>
            <p className="text-gray-200 font-medium">{ticket.date}</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-[10px]">Time</p>
            <p className="text-gray-200 font-medium">{ticket.time}</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-[10px]">Seats</p>
            <p className="text-gray-200 font-medium">{ticket.seats.sort().join(", ")}</p>
          </div>
          <div>
            <p className="text-gray-500 uppercase tracking-wider text-[10px]">Total</p>
            <p className="text-rose-400 font-bold">${ticket.totalPrice}</p>
          </div>
        </div>

        {/* Barcode placeholder */}
        <div className="flex items-center gap-2 text-gray-600">
          <QrCode className="w-5 h-5" />
          <p className="text-[10px] tracking-widest font-mono">{ticket.id}</p>
        </div>
      </div>
    </div>
  );
}
