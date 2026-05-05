import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const CustomerMap = ({ customers = [], isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-pulse h-[500px]">
        <div className="h-4 bg-gray-50 rounded w-1/4 mb-6" />
        <div className="h-full bg-gray-50/50 rounded-2xl" />
      </div>
    );
  }

  // Default center (Jakarta)
  const center = [-6.2088, 106.8456];

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm group hover:border-blue-900/20 transition-all flex flex-col h-[600px]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="font-black text-gray-900 text-lg tracking-tight">Customer Distribution Map</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Sebaran Pelanggan Berdasarkan Area</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-6 pr-6 border-r border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-900" />
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Personal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Corporate</span>
              </div>
           </div>
           <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-[10px] font-black text-gray-900 uppercase tracking-widest outline-none focus:border-blue-900 transition-all">
              <option>Semua Area</option>
              <option>Jakarta Pusat</option>
              <option>Jakarta Selatan</option>
              <option>Tangerang</option>
           </select>
        </div>
      </div>

      <div className="flex-1 rounded-[24px] overflow-hidden border border-gray-100 shadow-inner z-0">
        <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {customers.filter(c => c.lat && c.lng).map((customer) => (
            <CircleMarker 
              key={customer.id} 
              center={[parseFloat(customer.lat), parseFloat(customer.lng)]}
              radius={8}
              pathOptions={{ 
                fillColor: customer.type === 'corporate' ? '#F97316' : '#1E3A8A',
                fillOpacity: 0.8,
                color: 'white',
                weight: 2
              }}
            >
              <Popup>
                <div className="p-1">
                  <h4 className="font-black text-gray-900 text-sm mb-1">{customer.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{customer.company || 'Personal'}</p>
                  <div className="mt-2 pt-2 border-t border-gray-100 text-[10px] font-black text-blue-900 uppercase">
                    Lihat Detail →
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Legend:</span>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
               <div className="w-2 h-2 rounded-full bg-blue-900" />
               <span className="text-[9px] font-black text-gray-900">1-10</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
               <div className="w-2 h-2 rounded-full bg-blue-700" />
               <span className="text-[9px] font-black text-gray-900">11-30</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
               <div className="w-2 h-2 rounded-full bg-blue-500" />
               <span className="text-[9px] font-black text-gray-900">&gt; 30</span>
            </div>
         </div>
         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total: {customers.length} Nodes</span>
      </div>
    </div>
  );
};

export default CustomerMap;
