// export const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return `${date.getDate()} ${date.toLocaleDateString("en-US", {
//     month: "short",
//   })} ${date.getFullYear()}`;
// };
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() is zero-indexed
  const day = date.getDate();

  // Format the month and day to ensure they are always two digits
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // Return the date in YYYY-MM-DD format
  return `${year}-${formattedMonth}-${formattedDay}`;
};
export const getCurrentMonth = () => {};
