import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2, PackageCheck } from 'lucide-react';
import { TripPlan, PackingItem } from '../types/trip';

interface PackingViewProps {
  trip: TripPlan;
  onUpdateTrip: (updatedTrip: TripPlan) => void;
}

export const PackingView: React.FC<PackingViewProps> = ({ trip, onUpdateTrip }) => {
  const [newItemText, setNewItemText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PackingItem['category']>('Essentials');

  const items = trip.packingChecklist || [];
  const packedCount = items.filter((i) => i.isPacked).length;
  const progressPercent = items.length > 0 ? Math.round((packedCount / items.length) * 100) : 0;

  const toggleItem = (id: string) => {
    const updated = items.map((item) => (item.id === id ? { ...item, isPacked: !item.isPacked } : item));
    onUpdateTrip({ ...trip, packingChecklist: updated });
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    onUpdateTrip({ ...trip, packingChecklist: updated });
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: PackingItem = {
      id: `custom-pack-${Date.now()}`,
      category: selectedCategory,
      item: newItemText.trim(),
      isPacked: false
    };

    onUpdateTrip({
      ...trip,
      packingChecklist: [...items, newItem]
    });
    setNewItemText('');
  };

  const categories: Array<PackingItem['category']> = ['Essentials', 'Clothing', 'Gear & Tech', 'Health & Toiletries'];

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <div className="glass-card p-6 rounded-3xl border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Smart Packing & Preparation Checklist</h3>
              <p className="text-xs text-zinc-400">Track items packed for {trip.destination}</p>
            </div>
          </div>

          <span className="text-sm font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
            {packedCount} / {items.length} Packed ({progressPercent}%)
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Add Item Form */}
      <form onSubmit={handleAddItem} className="glass-panel p-4 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row gap-2">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as PackingItem['category'])}
          className="px-3 py-2 bg-zinc-900 border border-zinc-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add custom packing item..."
          className="flex-1 px-3.5 py-2 bg-zinc-900/90 border border-zinc-700/80 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </form>

      {/* Categorized Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const categoryItems = items.filter((i) => i.category === cat);
          if (categoryItems.length === 0) return null;

          return (
            <div key={cat} className="glass-card p-5 rounded-2xl border border-zinc-800 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 border-b border-zinc-800/80 pb-2">
                {cat}
              </h4>

              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      item.isPacked
                        ? 'bg-zinc-900/40 border-zinc-800/50 opacity-60'
                        : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="flex items-center gap-2.5 text-left text-xs font-medium text-zinc-200"
                    >
                      {item.isPacked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-zinc-500 shrink-0" />
                      )}
                      <span className={item.isPacked ? 'line-through text-zinc-400' : ''}>{item.item}</span>
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-zinc-500 hover:text-rose-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
