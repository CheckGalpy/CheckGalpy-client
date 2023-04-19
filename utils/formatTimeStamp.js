export default function formatTimeStamp(date) {
  const currnetYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  const currentDate = date.getDate();
  const currentHour = date.getHours() + 1;
  const currentMinute = date.getMinutes();

  const ampm = currentHour >= 12 ? "오후" : "오전";
  const displayHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
  const displayMinute = currentMinute.toString().padStart(2, "0");

  const timeStampKR =
    currnetYear +
    "년 " +
    currentMonth +
    "월 " +
    currentDate +
    "일,  " +
    ampm +
    " " +
    displayHour +
    ":" +
    displayMinute;

  return timeStampKR;
}
