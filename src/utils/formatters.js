// Formatting helpers for Indian Rupee currency, relative timestamps, and campus pickup slots

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

export const formatTimeAgo = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
};

export const generatePickupSlots = () => {
  // Generate 8 upcoming 10-minute pickup slots based on current time
  const slots = [];
  const now = new Date();
  
  // Round up to next 10-minute boundary + 10 mins prep
  const startMinute = Math.ceil((now.getMinutes() + 10) / 10) * 10;
  const startTime = new Date(now);
  startTime.setMinutes(startMinute);
  startTime.setSeconds(0);

  for (let i = 0; i < 8; i++) {
    const slotStart = new Date(startTime.getTime() + i * 10 * 60 * 1000);
    const slotEnd = new Date(slotStart.getTime() + 10 * 60 * 1000);

    const formatTime = (d) => {
      let hours = d.getHours();
      const minutes = d.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
      return `${hours}:${minutes} ${ampm}`;
    };

    const label = `${formatTime(slotStart)} - ${formatTime(slotEnd)}`;
    slots.push({
      id: `slot-${i}`,
      label,
      isNext: i === 0
    });
  }

  return slots;
};
