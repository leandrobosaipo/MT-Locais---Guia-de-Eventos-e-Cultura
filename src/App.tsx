import { MapPin, Info, Instagram, Globe, Navigation, X, Filter, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { locations, Location, tipoLabels } from './data/locations';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Fix Leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filterTipo, setFilterTipo] = useState<string>('all');
  const [filterCidade, setFilterCidade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const cities = useMemo(() => Array.from(new Set(locations.map(l => l.cidade))).sort(), []);
  const tipos = useMemo(() => Array.from(new Set(locations.map(l => l.tipo))).sort(), []);

  const filteredLocations = useMemo(() => {
    return locations.filter(l => {
      const matchesTipo = filterTipo === 'all' || l.tipo === filterTipo;
      const matchesCidade = filterCidade === 'all' || l.cidade === filterCidade;
      const matchesSearch = l.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           l.descricao_curta.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTipo && matchesCidade && matchesSearch;
    });
  }, [filterTipo, filterCidade, searchQuery]);

  const mapCenter: [number, number] = useMemo(() => {
    if (filterCidade !== 'all') {
      const cityLoc = locations.find(l => l.cidade === filterCidade);
      if (cityLoc) return cityLoc.coordinates;
    }
    return [-15.601, -56.097]; // Default Cuiabá
  }, [filterCidade]);

  return (
    <div className="flex h-screen w-full bg-stone-50 font-sans text-stone-900 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 380 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        className="relative h-full bg-white border-r border-stone-200 shadow-xl z-20 flex flex-col"
      >
        <div className="p-6 border-b border-stone-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-emerald-800">MT Locais</h1>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text"
                placeholder="Buscar locais..."
                className="w-full pl-10 pr-4 py-2 bg-stone-100 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1 block">Cidade</label>
                <select 
                  className="w-full p-2 bg-stone-100 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={filterCidade}
                  onChange={(e) => setFilterCidade(e.target.value)}
                >
                  <option value="all">Todas as Cidades</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1 block">Tipo</label>
                <select 
                  className="w-full p-2 bg-stone-100 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={filterTipo}
                  onChange={(e) => setFilterTipo(e.target.value)}
                >
                  <option value="all">Todos os Tipos</option>
                  {tipos.map(t => <option key={t} value={t}>{tipoLabels[t] || t}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <p className="text-xs font-medium text-stone-400 px-2 uppercase tracking-widest">
            {filteredLocations.length} locais encontrados
          </p>
          {filteredLocations.map(loc => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className={cn(
                "w-full text-left p-4 rounded-2xl transition-all border border-transparent hover:border-emerald-100 group",
                selectedLocation?.id === loc.id ? "bg-emerald-50 border-emerald-200 shadow-sm" : "bg-white hover:bg-stone-50"
              )}
            >
              <h3 className="font-bold text-stone-800 group-hover:text-emerald-700 transition-colors">{loc.nome}</h3>
              <p className="text-sm text-stone-500 line-clamp-1">{loc.cidade} • {loc.bairro || 'Centro'}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 bg-stone-200 text-stone-600 rounded-full font-medium uppercase tracking-tighter">
                  {tipoLabels[loc.tipo] || loc.tipo}
                </span>
              </div>
            </button>
          ))}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 relative h-full">
        {/* Toggle Sidebar Button */}
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-30 p-3 bg-white shadow-xl rounded-2xl text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <Filter size={24} />
          </button>
        )}

        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          className="h-full w-full z-10"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView center={mapCenter} zoom={filterCidade === 'all' ? 7 : 13} />
          
          {filteredLocations.map(loc => (
            <Marker 
              key={loc.id} 
              position={loc.coordinates}
              eventHandlers={{
                click: () => setSelectedLocation(loc),
              }}
            >
              <Popup>
                <div className="p-1">
                  <h4 className="font-bold text-emerald-800">{loc.nome}</h4>
                  <p className="text-xs text-stone-500">{tipoLabels[loc.tipo] || loc.tipo}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Details Overlay */}
        <AnimatePresence>
          {selectedLocation && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-40 flex flex-col border-l border-stone-200"
            >
              <div className="relative h-48 bg-emerald-800 overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${selectedLocation.id}/800/400`} 
                  alt={selectedLocation.nome}
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">
                    {tipoLabels[selectedLocation.tipo] || selectedLocation.tipo}
                  </span>
                  <h2 className="text-3xl font-black text-white leading-tight drop-shadow-lg">
                    {selectedLocation.nome}
                  </h2>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <section>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Sobre o Local</h4>
                  <p className="text-stone-600 leading-relaxed text-lg italic font-serif">
                    "{selectedLocation.descricao_curta}"
                  </p>
                </section>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Capacidade</h4>
                    <p className="text-2xl font-black text-emerald-700">
                      {selectedLocation.capacidade > 0 ? selectedLocation.capacidade.toLocaleString() : 'N/A'}
                    </p>
                    <p className="text-[10px] text-stone-400">pessoas</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Relevância</h4>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3].map(star => (
                        <div 
                          key={star}
                          className={cn(
                            "h-2 w-6 rounded-full",
                            star <= (4 - selectedLocation.nivel_relevancia) ? "bg-emerald-500" : "bg-stone-200"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <section className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Localização</h4>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-stone-800">{selectedLocation.endereco}</p>
                      <p className="text-stone-500">{selectedLocation.bairro} • {selectedLocation.cidade}, MT</p>
                      {selectedLocation.cep && <p className="text-stone-400 text-sm">CEP: {selectedLocation.cep}</p>}
                    </div>
                  </div>
                </section>

                <section className="pt-4 border-t border-stone-100">
                  <div className="flex flex-wrap gap-3">
                    {selectedLocation.instagram && (
                      <a 
                        href={`https://instagram.com/${selectedLocation.instagram}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all"
                      >
                        <Instagram size={18} />
                        <span className="text-sm font-medium">@{selectedLocation.instagram}</span>
                      </a>
                    )}
                    {selectedLocation.site && (
                      <a 
                        href={selectedLocation.site} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 transition-all"
                      >
                        <Globe size={18} />
                        <span className="text-sm font-medium">Website</span>
                      </a>
                    )}
                    <a 
                      href={selectedLocation.google_maps} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all"
                    >
                      <Navigation size={18} />
                      <span className="text-sm font-medium">Como Chegar</span>
                    </a>
                  </div>
                </section>

                <footer className="pt-8 text-[10px] text-stone-400 flex items-center gap-2">
                  <Info size={12} />
                  <span>Fonte: {selectedLocation.fonte_verificacao}</span>
                </footer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
