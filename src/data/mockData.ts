
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  capacity: number;
  budget: number;
  attendees: number;
  status: 'draft' | 'published' | 'completed';
  createdBy: string;
  imageUrl?: string;
}

export interface RSVP {
  id: string;
  eventId: string;
  guestName: string;
  email: string;
  status: 'pending' | 'accepted' | 'declined';
  dietaryRestrictions?: string;
  plusOne: boolean;
  respondedAt?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  supplier?: string;
  status: 'available' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rsvpStatus: 'pending' | 'accepted' | 'declined';
  eventId: string;
}

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Company Retreat',
    description: 'A weekend getaway for team building and strategic planning.',
    date: '2024-06-15',
    time: '09:00',
    location: 'Mountain Resort, Colorado',
    category: 'corporate',
    capacity: 100,
    budget: 15000,
    attendees: 85,
    status: 'published',
    createdBy: 'John Doe',
    imageUrl: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Product Launch Event',
    description: 'Introducing our latest product line to stakeholders and media.',
    date: '2024-06-22',
    time: '18:00',
    location: 'Convention Center, San Francisco',
    category: 'conference',
    capacity: 200,
    budget: 25000,
    attendees: 150,
    status: 'published',
    createdBy: 'Sarah Wilson',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Team Building Workshop',
    description: 'Interactive workshops to improve team collaboration.',
    date: '2024-07-05',
    time: '10:00',
    location: 'Office Conference Room',
    category: 'workshop',
    capacity: 50,
    budget: 5000,
    attendees: 35,
    status: 'draft',
    createdBy: 'Mike Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop'
  }
];

export const mockRSVPs: RSVP[] = [
  {
    id: '1',
    eventId: '1',
    guestName: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'accepted',
    dietaryRestrictions: 'Vegetarian',
    plusOne: true,
    respondedAt: '2024-05-20T10:30:00Z'
  },
  {
    id: '2',
    eventId: '1',
    guestName: 'Bob Smith',
    email: 'bob@example.com',
    status: 'pending',
    plusOne: false
  },
  {
    id: '3',
    eventId: '2',
    guestName: 'Carol Davis',
    email: 'carol@example.com',
    status: 'declined',
    respondedAt: '2024-05-18T14:15:00Z'
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Round Tables',
    category: 'Furniture',
    quantity: 20,
    unit: 'pieces',
    costPerUnit: 25,
    supplier: 'Event Rentals Co.',
    status: 'available',
    lastUpdated: '2024-05-20'
  },
  {
    id: '2',
    name: 'Projectors',
    category: 'Electronics',
    quantity: 3,
    unit: 'pieces',
    costPerUnit: 150,
    supplier: 'Tech Solutions',
    status: 'low-stock',
    lastUpdated: '2024-05-19'
  },
  {
    id: '3',
    name: 'Catering Supplies',
    category: 'Catering',
    quantity: 0,
    unit: 'sets',
    costPerUnit: 45,
    supplier: 'Premium Catering',
    status: 'out-of-stock',
    lastUpdated: '2024-05-21'
  }
];

export const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1-555-0123',
    rsvpStatus: 'accepted',
    eventId: '1'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1-555-0124',
    rsvpStatus: 'pending',
    eventId: '1'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    rsvpStatus: 'declined',
    eventId: '2'
  }
];
