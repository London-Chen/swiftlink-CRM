import React, { useState } from 'react';
import { X, Save, User, MapPin as MapPinIcon, Truck, Search, Navigation } from 'lucide-react';
import { Driver, Coordinate, Customer } from '../types';
import { LocationPicker } from './LocationPicker';
import { MOCK_DRIVERS } from '../constants';

interface ManualEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
}

export const ManualEntryModal: React.FC<ManualEntryModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [addressName, setAddressName] = useState('');
  const [location, setLocation] = useState<Coordinate | undefined>(undefined);
  const [driverId, setDriverId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) {
      alert("Please pinpoint the location on the map before saving.");
      return;
    }

    const newCustomer: Customer = {
      id: `c-${Date.now()}`,
      name,
      company,
      addressName,
      location,
      assignedDriverId: driverId || null,
      status: driverId ? 'assigned' : 'pending',
      addedVia: 'manual',
      timestamp: new Date().toISOString(),
    };

    onSave(newCustomer);
    onClose();
    // Reset form
    setName('');
    setCompany('');
    setAddressName('');
    setLocation(undefined);
    setDriverId('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="text-lg font-bold text-gray-800">New Customer Entry</h3>
            <p className="text-sm text-gray-500">Manually input customer details and assign coordinates.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" /> Basic Info
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company <span className="text-red-500">*</span></label>
                <input 
                  required
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g. Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>

            {/* Driver Selection */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4" /> Logistics
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Driver</label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                >
                  <option value="">-- Select a driver --</option>
                  {MOCK_DRIVERS.map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} ({driver.status})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Select available driver based on region.</p>
              </div>
            </div>
          </div>

          {/* Map Location */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <MapPinIcon className="w-4 h-4" /> Location Details
            </h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address / Street Name <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <input
                  required
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="e.g. 123 Industrial Ave"
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    // Generate random coordinates to simulate geocoding
                    const randomX = Math.random() * 60 + 20; // Keep within 20-80% range
                    const randomY = Math.random() * 60 + 20; // Keep within 20-80% range
                    setLocation({ x: randomX, y: randomY });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg border border-blue-600 transition-colors flex items-center gap-2 text-sm font-medium whitespace-nowrap"
                  title="Search and auto-locate address on map"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Click Search to automatically locate and pin the address on the map.</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Location Preview</label>
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                  onClick={() => alert("Simulating Navigation View opening...")}
                >
                  <Navigation className="w-3 h-3" />
                  Open Navigation View
                </button>
              </div>

              <LocationPicker value={location} onChange={setLocation} readOnly={true} />

              {location && (
                <div className="bg-green-50 border border-green-200 rounded p-2 mt-2 flex items-start gap-2">
                  <div className="mt-0.5 text-green-600">
                    <MapPinIcon className="w-3 h-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-green-800">
                      <strong>Location found:</strong> GPS coordinates have been automatically generated for "{addressName}".
                    </p>
                    <p className="text-xs text-green-700 mt-1 font-mono">
                      Lat: {location.y.toFixed(6)}, Lng: {location.x.toFixed(6)}
                    </p>
                  </div>
                </div>
              )}

              {!location && (
                <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-2 flex items-start gap-2">
                  <div className="mt-0.5 text-blue-600">
                    <Search className="w-3 h-3" />
                  </div>
                  <p className="text-xs text-blue-800">
                    <strong>Auto-location:</strong> Enter the address above and click Search to automatically generate GPS coordinates.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 shadow-sm"
            >
              <Save className="w-4 h-4" />
              Save Record
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};