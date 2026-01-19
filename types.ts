export interface Coordinate {
  x: number;
  y: number;
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  status: 'available' | 'busy' | 'offline';
  rating: number;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  addressName: string; // The text name of the location
  location: Coordinate; // Map coordinates
  assignedDriverId: string | null;
  status: 'pending' | 'assigned' | 'completed';
  addedVia: 'manual' | 'rpa';
  timestamp: string;
}

export type ViewState = 'dashboard' | 'customers' | 'settings';
