
import axios from 'axios';
import { Event, RSVP, InventoryItem, Guest } from '@/data/mockData';
import { mockEvents, mockRSVPs, mockInventory, mockGuests } from '@/data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Create axios instance
const api = axios.create({
  baseURL: '/api', // This would be your actual API base URL
  timeout: 10000,
});

export class EventAPI {
  static async getEvents(): Promise<Event[]> {
    await delay(800); // Simulate network delay
    return mockEvents;
  }

  static async getEvent(id: string): Promise<Event | null> {
    await delay(500);
    return mockEvents.find(event => event.id === id) || null;
  }

  static async createEvent(eventData: Omit<Event, 'id'>): Promise<Event> {
    await delay(1000);
    const newEvent: Event = {
      ...eventData,
      id: Date.now().toString(),
    };
    mockEvents.push(newEvent);
    return newEvent;
  }

  static async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
    await delay(800);
    const index = mockEvents.findIndex(event => event.id === id);
    if (index === -1) throw new Error('Event not found');
    
    mockEvents[index] = { ...mockEvents[index], ...eventData };
    return mockEvents[index];
  }

  static async deleteEvent(id: string): Promise<void> {
    await delay(600);
    const index = mockEvents.findIndex(event => event.id === id);
    if (index === -1) throw new Error('Event not found');
    
    mockEvents.splice(index, 1);
  }
}

export class RSVPAPI {
  static async getRSVPs(eventId: string): Promise<RSVP[]> {
    await delay(600);
    return mockRSVPs.filter(rsvp => rsvp.eventId === eventId);
  }

  static async createRSVP(rsvpData: Omit<RSVP, 'id'>): Promise<RSVP> {
    await delay(800);
    const newRSVP: RSVP = {
      ...rsvpData,
      id: Date.now().toString(),
    };
    mockRSVPs.push(newRSVP);
    return newRSVP;
  }

  static async updateRSVP(id: string, status: RSVP['status']): Promise<RSVP> {
    await delay(500);
    const index = mockRSVPs.findIndex(rsvp => rsvp.id === id);
    if (index === -1) throw new Error('RSVP not found');
    
    mockRSVPs[index] = { 
      ...mockRSVPs[index], 
      status,
      respondedAt: new Date().toISOString()
    };
    return mockRSVPs[index];
  }
}

export class InventoryAPI {
  static async getInventory(): Promise<InventoryItem[]> {
    await delay(700);
    return mockInventory;
  }

  static async updateInventoryItem(id: string, data: Partial<InventoryItem>): Promise<InventoryItem> {
    await delay(600);
    const index = mockInventory.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Inventory item not found');
    
    mockInventory[index] = { 
      ...mockInventory[index], 
      ...data,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    return mockInventory[index];
  }

  static async addInventoryItem(itemData: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    await delay(800);
    const newItem: InventoryItem = {
      ...itemData,
      id: Date.now().toString(),
    };
    mockInventory.push(newItem);
    return newItem;
  }
}

export class GuestAPI {
  static async getGuests(eventId: string): Promise<Guest[]> {
    await delay(500);
    return mockGuests.filter(guest => guest.eventId === eventId);
  }

  static async inviteGuest(guestData: Omit<Guest, 'id'>): Promise<Guest> {
    await delay(700);
    const newGuest: Guest = {
      ...guestData,
      id: Date.now().toString(),
    };
    mockGuests.push(newGuest);
    return newGuest;
  }
}
