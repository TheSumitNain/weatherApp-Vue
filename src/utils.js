export function convertTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

export function getWindDirection(degree) {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based, so add 1

  // Format with leading zeros
  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
}


export function getWeekday(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  const options = { weekday: 'short' }; // Full weekday name
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}