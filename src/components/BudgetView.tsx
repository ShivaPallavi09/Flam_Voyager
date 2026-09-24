import React, { useState } from 'react';
import { Users, PieChart, Hotel, Utensils, Compass, Car } from 'lucide-react';
import { TripPlan } from '../types/trip';

interface BudgetViewProps {
  trip: TripPlan;
}

export const BudgetView: React.FC<BudgetViewProps> = ({ trip }) => {
  const [scaleTravelers, setScaleTravelers] = useState<number>(trip.travelersCount);

  const baseBudget = trip.estimatedBudgetINR ?? (trip as any).estimatedBudgetUSD ?? 150000;
  const ratio = scaleTravelers / (trip.travelersCount || 1);
  const scaledTotal = Math.round(baseBudget * ratio);
  const scaledPerPerson = Math.round(scaledTotal / scaleTravelers);

  const categories = [
    {
      name: 'Accommodation',
      amount: Math.round((trip.budgetBreakdown?.accommodation || 0) * ratio),
      icon: Hotel,
      color: 'from-amber-500 to-yellow-400',
      textColor: 'text-amber-400'
    },
    {
      name: 'Food & Dining',
      amount: Math.round((trip.budgetBreakdown?.food || 0) * ratio),
      icon: Utensils,
      color: 'from-emerald-500 to-teal-400',
      textColor: 'text-emerald-400'
    },
    {
      name: 'Activities & Tickets',
      amount: Math.round((trip.budgetBreakdown?.activities || 0) * ratio),
      icon: Compass,
      color: 'from-rose-500 to-pink-400',
      textColor: 'text-rose-400'
    },
    {
      name: 'Local Transport',
      amount: Math.round((trip.budgetBreakdown?.transport || 0) * ratio),
      icon: Car,
      color: 'from-violet-500 to-purple-400',
      textColor: 'text-violet-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Estimated Total</span>
            <div className="text-2xl font-extrabold text-white mt-1">₹{scaledTotal.toLocaleString('en-IN')}</div>
            <span className="text-[11px] text-zinc-400">Total estimated expenses (INR)</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 font-bold text-xl flex items-center justify-center">
            ₹
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Per Person Cost</span>
            <div className="text-2xl font-extrabold text-white mt-1">₹{scaledPerPerson.toLocaleString('en-IN')}</div>
            <span className="text-[11px] text-zinc-400">Based on {scaleTravelers} traveler(s)</span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Daily Avg / Person</span>
            <div className="text-2xl font-extrabold text-white mt-1">
              ₹{Math.round(scaledPerPerson / (trip.durationDays || 1)).toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-zinc-400">Across {trip.durationDays} day(s)</span>
          </div>
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
            <PieChart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Interactive Companion Scaler */}
      <div className="glass-panel p-6 rounded-3xl border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Dynamic Group Cost Scaler</h3>
          </div>
          <span className="px-3 py-1 text-xs font-extrabold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 rounded-xl">
            {scaleTravelers} Traveler{scaleTravelers > 1 ? 's' : ''}
          </span>
        </div>

        <p className="text-xs text-zinc-400">
          Slide to interactively adjust group size and recalculate real-time budget distribution in Indian Rupees.
        </p>

        <input
          type="range"
          min={1}
          max={10}
          value={scaleTravelers}
          onChange={(e) => setScaleTravelers(Number(e.target.value))}
          className="w-full accent-emerald-400 cursor-pointer"
        />
      </div>

      {/* Category Expense Breakdown */}
      <div className="glass-card p-6 rounded-3xl border border-zinc-800 space-y-5">
        <h3 className="text-base font-bold text-white">Category Allocation Breakdown (INR)</h3>

        <div className="space-y-4">
          {categories.map((cat) => {
            const percentage = scaledTotal > 0 ? Math.round((cat.amount / scaledTotal) * 100) : 0;
            const Icon = cat.icon;

            return (
              <div key={cat.name} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-2 text-zinc-200">
                    <Icon className={`w-4 h-4 ${cat.textColor}`} /> {cat.name}
                  </span>
                  <span className="text-zinc-300">
                    ₹{cat.amount.toLocaleString('en-IN')} ({percentage}%)
                  </span>
                </div>

                <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className={`h-full bg-gradient-to-r ${cat.color} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
