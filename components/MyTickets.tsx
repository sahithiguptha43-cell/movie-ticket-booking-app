import { X, Ticket } from "lucide-react";
import TicketCard, { TicketData } from "./TicketCard";

interface MyTicketsProps {
  tickets: TicketData[];
  onClose: () => void;
  onRemove: (id: string) => void;
}

export default function MyTickets({ tickets, onClose, onRemove }: MyTicketsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-900 rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-white/10 flex items-center justify-between p-5 z-10">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-rose-400" />
            <h2 className="text-white font-bold text-lg">My Tickets</h2>
            {tickets.length > 0 && (
              <span className="bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {tickets.length}
              </span>
            )}
          </div>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-white/5 rounded-full p-6 mb-4">
                <Ticket className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-gray-400 font-medium">No tickets yet</p>
              <p className="text-gray-600 text-sm mt-1">Book a movie to see your tickets here</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} onRemove={onRemove} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
