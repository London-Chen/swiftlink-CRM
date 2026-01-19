import { Customer, Driver } from './types';

export const MOCK_DRIVERS: Driver[] = [
  { id: 'd1', name: 'John Smith', avatar: 'https://picsum.photos/seed/d1/200', status: 'available', rating: 4.8 },
  { id: 'd2', name: 'Sarah Connor', avatar: 'https://picsum.photos/seed/d2/200', status: 'busy', rating: 4.9 },
  { id: 'd3', name: 'Mike Ross', avatar: 'https://picsum.photos/seed/d3/200', status: 'available', rating: 4.5 },
  { id: 'd4', name: 'Jessica Pearson', avatar: 'https://picsum.photos/seed/d4/200', status: 'offline', rating: 5.0 },
  { id: 'd5', name: 'Louis Litt', avatar: 'https://picsum.photos/seed/d5/200', status: 'available', rating: 4.2 },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Alice Johnson',
    company: 'TechFlow Inc.',
    addressName: 'Downtown Innovation Hub',
    location: { x: 45, y: 30 },
    assignedDriverId: 'd1',
    status: 'assigned',
    addedVia: 'manual',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'c2',
    name: 'Bob Williams',
    company: 'Logistics Pro',
    addressName: 'North Industrial Park',
    location: { x: 12, y: 88 },
    assignedDriverId: 'd2',
    status: 'completed',
    addedVia: 'manual',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const MOCK_RPA_DATA = [
  { name: 'Global Corp HQ', company: 'Global Corp', address: '100 Financial Dist', x: 55, y: 20, driver: 'd3' },
  { name: 'Fresh Market', company: 'Eat Fresh Ltd', address: '22 Market St', x: 80, y: 60, driver: 'd1' },
  { name: 'Construct Site A', company: 'BuildIt Now', address: 'Plot 404, West End', x: 20, y: 45, driver: 'd5' },
  { name: 'City Hospital', company: 'HealthPlus', address: 'Emergency Entrance', x: 35, y: 75, driver: 'd1' },
  { name: 'University Campus', company: 'State Uni', address: 'Main Gate', x: 90, y: 10, driver: 'd3' },
  { name: 'Tech Startups', company: 'Incubator X', address: 'Suite 500', x: 60, y: 60, driver: 'd5' },
];