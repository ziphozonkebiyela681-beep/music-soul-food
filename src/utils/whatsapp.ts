export interface ReservationDetails {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seatingArea: string;
  occasion: string;
  notes: string;
  preSelectedDishes?: Array<{ name: string; price: string; quantity: number }>;
}

export function formatBookingSummary(details: ReservationDetails): string {
  const parts: string[] = [
    `TABLE RESERVATION SUMMARY — SOUL FOOD & MUSIC`,
    `Direct Booking Phone: 068 888 666`,
    `Location: 289 Fox Street, Maboneng Lifestyle Centre, Ground Floor`,
    `----------------------------------------------------`,
    `Guest Name: ${details.name || 'Not specified'}`,
    `Contact Phone: ${details.phone || 'Not specified'}`,
    `Party Size: ${details.guests} ${details.guests === 1 ? 'Guest' : 'Guests'}`,
    `Reservation Date: ${details.date}`,
    `Time of Arrival: ${details.time}`,
    `Seating Preference: ${details.seatingArea}`,
  ];

  if (details.occasion && details.occasion !== 'Casual Dining') {
    parts.push(`Occasion: ${details.occasion}`);
  }

  if (details.notes && details.notes.trim()) {
    parts.push(`Special Notes / Requests: ${details.notes.trim()}`);
  }

  if (details.preSelectedDishes && details.preSelectedDishes.length > 0) {
    parts.push(`----------------------------------------------------`);
    parts.push(`Pre-selected Menu Wishlist:`);
    details.preSelectedDishes.forEach((item) => {
      parts.push(`  • ${item.quantity}x ${item.name} (${item.price})`);
    });
  }

  parts.push(`----------------------------------------------------`);
  parts.push(`Ready to quote when calling 068 888 666.`);

  return parts.join('\n');
}
