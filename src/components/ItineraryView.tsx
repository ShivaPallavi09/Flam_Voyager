import React, { useState } from 'react';
import { RefreshCw, MapPin, Lightbulb, Clock, CheckCircle2 } from 'lucide-react';
import { TripPlan, ActivityItem } from '../types/trip';
import { swapActivityWithAI } from '../services/geminiService';

interface ItineraryViewProps {
  trip: TripPlan;
  onUpdateTrip: (updatedTrip: TripPlan) => void;
  userApiKey?: string;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ trip, onUpdateTrip, userApiKey }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [swappingId, setSwappingId] = useState<string | null>(null);
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});

  const handleSwapActivity = async (dayNumber: number, activity: ActivityItem) => {
    setSwappingId(activity.id);
    try {
      const newActivity = await swapActivityWithAI(trip.destination, activity, userApiKey);
      const updatedDays = trip.days.map((day) => {
        if (day.dayNumber === dayNumber) {
          return {
            ...day,
            activities: day.activities.map((act) => (act.id === activity.id ? newActivity : act))
          };
        }
        return day;
      });

      onUpdateTrip({
        ...trip,
        days: updatedDays
      });
    } catch (err) {
      console.error('Failed to swap activity:', err);
    } finally {
      setSwappingId(null);
    }
  };

  const toggleComplete = (id: string) => {
    setCompletedActivities((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeDayObj = trip.days.find((d) => d.dayNumber === selectedDay) || trip.days[0];

  const categoryBadges: Record<string, string> = {
    Sightseeing: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Food & Dining': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Culture: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    Outdoor: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
    Shopping: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    Nightlife: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  };

  return (
    <div className="space-y-6">
      {/* Day Selector Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {trip.days.map((day) => {
          const isActive = day.dayNumber === selectedDay;
          return (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDay(day.dayNumber)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/10 scale-105'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>Day {day.dayNumber}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>
          );
        })}
      </div>

      {/* Day Title Header */}
      {activeDayObj && (
        <div className="glass-card p-5 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
                Day {activeDayObj.dayNumber} Schedule
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">{activeDayObj.title}</h3>
            <p className="text-xs text-zinc-400 mt-0.5">{activeDayObj.theme}</p>
          </div>
        </div>
      )}

      {/* Timeline Activities List */}
      <div className="relative space-y-4 before:absolute before:inset-0 before:left-5 sm:before:left-7 before:w-0.5 before:bg-zinc-800/80">
        {activeDayObj?.activities.map((act) => {
          const isDone = !!completedActivities[act.id];
          const isSwapping = swappingId === act.id;
          const costVal = act.costINR ?? (act as any).costUSD ?? 0;

          return (
            <div
              key={act.id}
              className={`relative pl-12 sm:pl-16 glass-card p-5 rounded-2xl border transition-all ${
                isDone ? 'border-zinc-800 opacity-60' : 'border-zinc-800/90 hover:border-zinc-700'
              }`}
            >
              {/* Timeline Marker Circle */}
              <button
                onClick={() => toggleComplete(act.id)}
                className={`absolute left-3 sm:left-4 top-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-500 text-zinc-950'
                    : 'bg-zinc-900 border-zinc-600 hover:border-emerald-400 text-transparent'
                }`}
                title="Mark activity as visited"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 bg-emerald-500/10 rounded-md border border-emerald-500/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {act.timeOfDay}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-md border ${
                        categoryBadges[act.category] || 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      {act.category}
                    </span>
                  </div>

                  <h4 className={`text-base font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                    {act.title}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">{act.description}</p>
                </div>

                {/* AI Activity Swapper Trigger */}
                <button
                  onClick={() => handleSwapActivity(activeDayObj.dayNumber, act)}
                  disabled={isSwapping}
                  className="self-start sm:self-auto px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all flex items-center gap-1.5 disabled:opacity-50"
                  title="Swap with AI alternative activity"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSwapping ? 'animate-spin' : ''}`} />
                  <span>{isSwapping ? 'AI Swapping...' : 'Swap Activity'}</span>
                </button>
              </div>

              {/* Meta details (Location, Cost in Rupees ₹, Tips) */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {act.location}
                </span>

                <span className="flex items-center gap-1 text-zinc-300 font-medium">
                  <span className="text-amber-400 font-bold text-sm">₹</span>
                  {costVal === 0 ? 'Free Entry' : `₹${costVal.toLocaleString('en-IN')} / person`}
                </span>

                {act.tips && (
                  <span className="flex items-center gap-1 text-amber-300/90 bg-amber-500/5 px-2 py-0.5 rounded-md border border-amber-500/10">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> {act.tips}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
