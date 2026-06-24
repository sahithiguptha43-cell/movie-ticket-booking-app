import { CheckCircle2, Download, X } from "lucide-react";
import { TicketData } from "./TicketCard";
import TicketCard from "./TicketCard";

interface ConfirmationModalProps {
  ticket: TicketData;
  onClose: () => void;
  onViewTickets: () => void;
}

export default function ConfirmationModal({ ticket, onClose, onViewTickets }: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-gray-900 rounded-3xl border border-white/10 shadow-2xl p-6 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <div className="absolute inset-0 rounded-full bg-green-500/10 animate-ping" />
          </div>
        </div>

        <h3 className="text-white font-bold text-xl mb-1">Booking Confirmed!</h3>
        <p className="text-gray-400 text-sm mb-6">Your tickets have been booked successfully.</p>

        {/* Mini Ticket */}
        <div className="mb-6 text-left">
          <TicketCard ticket={ticket} />
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onViewTickets}
            className="w-full bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white font-bold py-3 rounded-2xl transition-all"
          >
            View My Tickets
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-medium py-3 rounded-2xl transition-colors">
            <Download className="w-4 h-4" />
            Download Ticket
          </button>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-sm transition-colors py-1">
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
