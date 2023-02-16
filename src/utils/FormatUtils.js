// format dateTime exif data
export function formatDateTime(dateTimeStr) {
  let [dateString, timeString] = dateTimeStr.split(" ");
  let [year, month, day] = dateString.split(":").map(Number);
  let [hours, minutes, seconds] = timeString.split(":").map(Number);
  
  let date = new Date(year, month - 1, day);
  let time = new Date();
  time.setHours(hours, minutes, seconds);
  
  let hours12 = (hours % 12) || 12;
  let amPm = hours < 12 ? "AM" : "PM";
  let timeString12 = hours12 + ":" + minutes + " " + amPm;
  
  let formattedDate = date.toDateString();
  let formattedTime = timeString12;

  return (formattedDate + "|" + formattedTime);
}