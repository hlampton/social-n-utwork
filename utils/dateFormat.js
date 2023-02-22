// Utility function to add date suffixes (st, nd, rd, th)
const addDateSuffix = date => {
  const suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];
  const lastDigit = date % 10;
  const suffix = lastDigit <=  ordinalSuffixes.length ? suffixes[lastDigit] : suffixes[0];
  return `${date}${suffix}`;
};

// Format timestamp with given options
module.exports = (timestamp, options = {}) => {
  const { monthLength = 'short', dateSuffix = true } = options;

  const months = monthLength === 'short' ? 
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] :
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dateObj = new Date(timestamp);

  const formattedMonth = months[dateObj.getMonth()];
  const formattedDayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
  const formattedYear = dateObj.getFullYear();
  const formattedHours = dateObj.getHours() % 12 || 12;
  const formattedMinutes = dateObj.getMinutes().toString().padStart(2, "0");
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  const formattedTimeStamp = `${formattedMonth} ${formattedDayOfMonth}, ${formattedYear} at ${formattedHours}:${formattedMinutes} ${periodOfDay}`;

  return formattedTimeStamp;
};
