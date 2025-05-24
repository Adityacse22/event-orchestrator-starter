
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  attendees: number;
  budget: number;
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
  respondedAt?: string;
  dietaryRestrictions?: string;
  plusOne: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  minThreshold: number;
  location: string;
  lastUpdated: string;
  status: 'available' | 'low-stock' | 'out-of-stock';
  supplier?: string;
  costPerUnit: number;
  unit: string;
}

export interface Guest {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  invitedAt: string;
  status: 'invited' | 'confirmed' | 'declined';
}

// Mock Events Data
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Conference 2024',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders, innovative workshops, and networking opportunities.',
    date: '2024-06-15',
    time: '09:00 AM',
    location: 'Convention Center, Downtown',
    capacity: 500,
    attendees: 324,
    budget: 50000,
    status: 'published',
    createdBy: 'John Doe',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'
  },
  {
    id: '2',
    title: 'Summer Team Building Retreat',
    description: 'A fun-filled weekend retreat to strengthen team bonds and boost morale with outdoor activities and team challenges.',
    date: '2024-07-20',
    time: '10:00 AM',
    location: 'Mountain Resort, Lake Tahoe',
    capacity: 50,
    attendees: 42,
    budget: 15000,
    status: 'published',
    createdBy: 'Sarah Smith',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=400&fit=crop'
  },
  {
    id: '3',
    title: 'Product Launch Event',
    description: 'Exclusive launch event for our latest product line with live demos, presentations, and media coverage.',
    date: '2024-08-10',
    time: '06:00 PM',
    location: 'Grand Ballroom, City Hotel',
    capacity: 200,
    attendees: 0,
    budget: 25000,
    status: 'draft',
    createdBy: 'Mike Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop'
  }
];

// Mock RSVPs Data
export const mockRSVPs: RSVP[] = [
  {
    id: '1',
    eventId: '1',
    guestName: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'accepted',
    respondedAt: '2024-05-15T10:30:00Z',
    dietaryRestrictions: 'Vegetarian',
    plusOne: true
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
    eventId: '1',
    guestName: 'Carol Williams',
    email: 'carol@example.com',
    status: 'declined',
    respondedAt: '2024-05-20T14:15:00Z',
    plusOne: false
  },
  {
    id: '4',
    eventId: '2',
    guestName: 'David Brown',
    email: 'david@example.com',
    status: 'accepted',
    respondedAt: '2024-05-18T09:45:00Z',
    dietaryRestrictions: 'Gluten-free',
    plusOne: true
  },
  {
    id: '5',
    eventId: '2',
    guestName: 'Eva Davis',
    email: 'eva@example.com',
    status: 'accepted',
    respondedAt: '2024-05-22T16:20:00Z',
    plusOne: false
  }
];

// Mock Inventory Data
export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Folding Chairs',
    category: 'Furniture',
    quantity: 150,
    minThreshold: 50,
    location: 'Warehouse A',
    lastUpdated: '2024-05-20',
    status: 'available',
    supplier: 'Office Supplies Co.',
    costPerUnit: 25.99,
    unit: 'piece'
  },
  {
    id: '2',
    name: 'Sound System',
    category: 'Audio/Visual',
    quantity: 5,
    minThreshold: 2,
    location: 'AV Room',
    lastUpdated: '2024-05-18',
    status: 'available',
    supplier: 'Tech Audio Ltd.',
    costPerUnit: 850.00,
    unit: 'set'
  },
  {
    id: '3',
    name: 'Projectors',
    category: 'Audio/Visual',
    quantity: 8,
    minThreshold: 3,
    location: 'AV Room',
    lastUpdated: '2024-05-19',
    status: 'available',
    supplier: 'Visual Tech Inc.',
    costPerUnit: 1200.00,
    unit: 'piece'
  },
  {
    id: '4',
    name: 'Table Linens',
    category: 'Decor',
    quantity: 25,
    minThreshold: 10,
    location: 'Storage Room B',
    lastUpdated: '2024-05-17',
    status: 'available',
    supplier: 'Event Decor Plus',
    costPerUnit: 15.50,
    unit: 'piece'
  },
  {
    id: '5',
    name: 'Catering Supplies',
    category: 'Kitchen',
    quantity: 2,
    minThreshold: 5,
    location: 'Kitchen Storage',
    lastUpdated: '2024-05-21',
    status: 'low-stock',
    supplier: 'Food Service Pro',
    costPerUnit: 450.00,
    unit: 'set'
  }
];

// Mock Guests Data
export const mockGuests: Guest[] = [
  {
    id: '1',
    eventId: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1-555-0101',
    invitedAt: '2024-05-10T08:00:00Z',
    status: 'confirmed'
  },
  {
    id: '2',
    eventId: '1',
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '+1-555-0102',
    invitedAt: '2024-05-10T08:00:00Z',
    status: 'invited'
  },
  {
    id: '3',
    eventId: '2',
    name: 'Carol Williams',
    email: 'carol@example.com',
    invitedAt: '2024-05-12T10:00:00Z',
    status: 'confirmed'
  }
];
