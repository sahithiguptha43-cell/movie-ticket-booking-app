import { useState, useMemo } from "react";
import { X, Monitor } from "lucide-react";
import { Movie, ShowTime, generateSeats } from "../data/movies";

export type SeatType = "standard" | "premium" | "vip";

interface SeatSelectorProps {
  movie: Movie;
  showtime: ShowTime;
  onClose: () => void;
  onConfirm: (seats: string[], seatType: SeatType, totalPrice: number) => void;
}

const seatTypeConfig: Record<SeatType, { label: string; color: string; rows: string[] }> = {
  vip: { label: "VIP", color: "bg-yellow-400", rows: ["A", "B"] },
  premium: { label: "Premium", color: "bg-violet-500", rows: ["C", "D", "E"] },
  standard: { label: "Standard", color: "bg-teal-500", rows: ["F", "G", "H"] },
};

export default function SeatSelector({ movie, showtime, onClose, onConfirm }: SeatSelectorProps) {
  const { rows, seatsPerRow, takenSeats } = useMemo(() => generateSeats(), []);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const getSeatType = (row: string): SeatType => {
    if (["A", "B"].includes(row)) return "vip";
    if (["C", "D", "E"].includes(row)) return "premium";
    return "standard";
  };

  const getSeatPrice = (row: string) => {
    const type = getSeatType(row);
    return showtime.price[type];
  };

  const toggleSeat = (seatId: string) => {
    if (takenSeats.has(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((s) => s !== seatId) : [...prev, seatId]
    );
  };

  const totalPrice = selectedSeats.reduce((sum, seatId) => {
    const row = seatId.replace(/\d+/g, "");
    return sum + getSeatPrice(row);
  }, 0);

  const handleConfirm = () => {
    if (selectedSeats.length === 0) return;
    // determine dominant seat type
    const types = selectedSeats.map((s) => getSeatType(s.replace(/\d+/g, "")));
    const type = types[0];
    onConfirm(selectedSeats, type, totalPrice);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto bg-gray-900 rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h3 className="text-white font-bold text-lg">{movie.title}</h3>
            <p className="text-gray-400 text-sm">{showtime.time} · {showtime.hall}</p>
          </div>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {/* Screen */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full mb-2 opacity-70" />
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Monitor className="w-3.5 h-3.5" />
              SCREEN
            </div>
          </div>

          {/* Seat Grid */}
          <div className="overflow-x-auto">
            <div className="flex flex-col gap-2 min-w-fit mx-auto w-fit">
              {rows.map((row) => {
                const seatType = getSeatType(row);
                const dotColor = seatTypeConfig[seatType].color;
                return (
                  <div key={row} className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs w-4 text-center font-mono">{row}</span>
                    <div className="flex gap-1.5">
                      {Array.from({ length: seatsPerRow }, (_, i) => {
                        const seatId = `${row}${i + 1}`;
                        const taken = takenSeats.has(seatId);
                        const selected = selectedSeats.includes(seatId);
                        return (
                          <button
                            key={seatId}
                            onClick={() => toggleSeat(seatId)}
                            disabled={taken}
                            title={seatId}
                            className={`w-7 h-7 rounded-md text-xs font-medium transition-all duration-150 ${
                              taken
                                ? "bg-gray-700 cursor-not-allowed opacity-40"
                                : selected
                                ? `${dotColor} text-white scale-105 shadow-lg`
                                : "bg-gray-800 hover:bg-gray-700 text-gray-400 border border-white/10 hover:border-white/30"
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>
                    {/* gap in the middle */}
                    <span className="text-gray-500 text-xs w-4 text-center font-mono">{row}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-800 border border-white/10" />
              <span className="text-gray-400 text-xs">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-700 opacity-40" />
              <span className="text-gray-400 text-xs">Taken</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-teal-500" />
              <span className="text-gray-400 text-xs">Standard (${showtime.price.standard})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-violet-500" />
              <span className="text-gray-400 text-xs">Premium (${showtime.price.premium})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-yellow-400" />
              <span className="text-gray-400 text-xs">VIP (${showtime.price.vip})</span>
            </div>
          </div>

          {/* Summary */}
          {selectedSeats.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Selected seats</span>
                <span className="text-white font-medium text-sm">{selectedSeats.sort().join(", ")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Total</span>
                <span className="text-rose-400 font-bold text-xl">${totalPrice}</span>
              </div>
            </div>
          )}

          {/* Confirm */}
          <button
            onClick={handleConfirm}
            disabled={selectedSeats.length === 0}
            className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 ${
              selectedSeats.length > 0
                ? "bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white shadow-lg shadow-rose-900/40"
                : "bg-gray-800 text-gray-600 cursor-not-allowed"
            }`}
          >
            {selectedSeats.length === 0
              ? "Select your seats"
              : `Confirm ${selectedSeats.length} seat${selectedSeats.length > 1 ? "s" : ""} · $${totalPrice}`}
          </button>
        </div>
      </div>
    </div>
  );
}
