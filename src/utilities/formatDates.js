


export function formatTimestamp(timestamp, returnValue) {
    const date = new Date(timestamp);
    
    const now = new Date();
    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
    
    const timeOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    const timeStr = date.toLocaleTimeString(undefined, timeOptions); // e.g., 9:20 AM
    
    if(returnValue === 'time') {
        return timeStr
    } else if (returnValue === 'date') {
        if (isToday) {
            return `Today`;
        } else {
            const dateOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            };
            const dateStr = date.toLocaleDateString(undefined, dateOptions); // e.g., Mar 16, 2024
            return `${dateStr}`;
        }
    }
}


export function formatDateToLabel(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
  
    // Check if the date is today
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  
    if (isToday) return "Today";
  
    const month = date.toLocaleString("default", { month: "short" }); // e.g., "Feb"
    const day = date.getDate();
  
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };
  
    return `${month} ${day}${getOrdinal(day)}`;
}


export function formatSmartDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
  
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
  
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
  
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();
  
    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';
  
    const options = {
      day: 'numeric',
      month: 'long',
      ...(date.getFullYear() !== now.getFullYear() && { year: 'numeric' }),
    };
  
    return date.toLocaleDateString('en-US', options);
}
  





