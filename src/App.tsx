import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar, Users, DollarSign, Download,
  MapPin, Clock, Hotel as HotelIcon, PackageCheck
} from 'lucide-react';
import { Header } from './components/Header';
import { ApiKeyModal } from './components/ApiKeyModal';
import { TripForm } from './components/TripForm';
import { ItineraryView } from './components/ItineraryView';
import { BudgetView } from './components/BudgetView';
import { StayView } from './components/StayView';
import { PackingView } from './components/PackingView';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorBanner } from './components/ErrorBanner';
import { TripPlan, TripFormInputs } from './types/trip';
import { generateTripWithAI, getStoredApiKey } from './services/geminiService';
import { MOCK_TOKYO_TRIP } from './services/mockData';

type ActiveTab = 'itinerary' | 'budget' | 'stays' | 'packing';

export function App() {
  const [currentTrip, setCurrentTrip] = useState<TripPlan | null>(MOCK_TOKYO_TRIP);
  const [activeTab, setActiveTab] = useState<ActiveTab>('itinerary');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(!!getStoredApiKey());
  const [lastFormInputs, setLastFormInputs] = useState<TripFormInputs | null>(null);

  useEffect(() => {
    setHasApiKey(!!getStoredApiKey());
  }, []);

  const handleGenerateTrip = async (inputs: TripFormInputs) => {
    setLastFormInputs(inputs);
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const generatedPlan = await generateTripWithAI(inputs);
      setCurrentTrip(generatedPlan);
      setActiveTab('itinerary');

      // Trigger celebration effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      console.error('Trip generation error:', err);
      setErrorMsg(err?.message || 'Failed to generate trip plan. Please check your network or API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportJSON = () => {
    if (!currentTrip) return;
    const blob = new Blob([JSON.stringify(currentTrip, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTrip.destination.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_itinerary.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header */}
      <Header
        hasApiKey={hasApiKey}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onSelectPreset={(inputs) => handleGenerateTrip(inputs)}
        onReset={() => setCurrentTrip(MOCK_TOKYO_TRIP)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Configurator Form Column */}
          <div className="lg:col-span-4">
            <TripForm
              onSubmit={handleGenerateTrip}
              isLoading={isLoading}
              initialValues={lastFormInputs || undefined}
            />
          </div>

          {/* Dynamic Content Workspace Column */}
          <div className="lg:col-span-8 space-y-6">
            {isLoading ? (
              <LoadingSkeleton />
            ) : errorMsg ? (
              <ErrorBanner
                message={errorMsg}
                onRetry={() => lastFormInputs && handleGenerateTrip(lastFormInputs)}
                onUseMock={() => {
                  setErrorMsg(null);
                  setCurrentTrip(MOCK_TOKYO_TRIP);
                }}
              />
            ) : currentTrip ? (
              <div className="space-y-6">
                {/* Hero Header Card */}
                <div className="relative overflow-hidden glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 shadow-2xl">
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-300 rounded-xl border border-amber-500/30">
                          {currentTrip.travelStyle} Vibe
                        </span>
                        <span className="text-xs text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {currentTrip.destination}
                        </span>
                      </div>

                      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {currentTrip.tripTitle}
                      </h1>
                      <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                        {currentTrip.overview}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                      <button
                        onClick={handleExportJSON}
                        className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-amber-300 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md"
                        title="Export Itinerary JSON"
                      >
                        <Download className="w-4 h-4" /> Export JSON
                      </button>

                      <div className="flex items-center gap-3 text-xs text-zinc-400">
                        <span className="flex items-center gap-1 font-semibold text-zinc-200">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {currentTrip.durationDays} Days
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-zinc-200">
                          <Users className="w-3.5 h-3.5 text-emerald-400" /> {currentTrip.travelersCount} Guests
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard View Tabs */}
                <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3 overflow-x-auto scrollbar-none">
                  {[
                    { id: 'itinerary', label: 'Day-by-Day Timeline', icon: Clock },
                    { id: 'budget', label: 'Budget Analytics', icon: DollarSign },
                    { id: 'stays', label: 'Stays & Stays', icon: HotelIcon },
                    { id: 'packing', label: 'Prep Checklist', icon: PackageCheck }
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id as ActiveTab)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                        activeTab === id
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Views */}
                {activeTab === 'itinerary' && (
                  <ItineraryView
                    trip={currentTrip}
                    onUpdateTrip={setCurrentTrip}
                    userApiKey={getStoredApiKey() || undefined}
                  />
                )}

                {activeTab === 'budget' && <BudgetView trip={currentTrip} />}

                {activeTab === 'stays' && <StayView trip={currentTrip} />}

                {activeTab === 'packing' && (
                  <PackingView trip={currentTrip} onUpdateTrip={setCurrentTrip} />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </main>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={() => setHasApiKey(!!getStoredApiKey())}
      />
    </div>
  );
}
export default App;
