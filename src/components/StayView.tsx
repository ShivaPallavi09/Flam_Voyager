import React from 'react';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { TripPlan } from '../types/trip';

interface StayViewProps {
  trip: TripPlan;
}

export const StayView: React.FC<StayViewProps> = ({ trip }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Curated Accommodations</h3>
          <p className="text-xs text-zinc-400">Hand-picked stays matching your {trip.travelStyle} vibe</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trip.hotels.map((hotel, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-3xl border border-zinc-800/90 hover:border-zinc-700 transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-300 rounded-md border border-amber-500/20">
                  {hotel.type}
                </span>
                <h4 className="text-lg font-bold text-white mt-1.5">{hotel.name}</h4>
                <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {hotel.locationArea}
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-extrabold text-white">${hotel.pricePerNightUSD}</div>
                <div className="text-[10px] text-zinc-400">per night</div>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{hotel.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 w-max px-2.5 py-1 rounded-xl border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{hotel.rating} / 5.0</span>
            </div>

            {/* Amenities Tag Cloud */}
            <div className="pt-3 border-t border-zinc-800/80">
              <span className="text-[11px] font-semibold text-zinc-400 block mb-2">Featured Amenities</span>
              <div className="flex flex-wrap gap-1.5">
                {hotel.amenities.map((amenity, aIdx) => (
                  <span
                    key={aIdx}
                    className="px-2.5 py-1 text-[11px] font-medium bg-zinc-900 text-zinc-300 rounded-lg border border-zinc-800 flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
