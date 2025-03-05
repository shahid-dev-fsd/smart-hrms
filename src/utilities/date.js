// Utility functions to calculate date ranges in YYYY-MM-DD format
const getToday = () => {
  const today = new Date();
  const start = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const end = today.toISOString().split("T")[0]; // YYYY-MM-DD
  return { start, end };
};

const getYesterday = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const start = yesterday.toISOString().split("T")[0]; // YYYY-MM-DD
  const end = yesterday.toISOString().split("T")[0]; // YYYY-MM-DD
  return { start, end };
};

const getThisWeek = () => {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 6)
  );
  const start = startOfWeek.toISOString().split("T")[0]; // YYYY-MM-DD
  const end = endOfWeek.toISOString().split("T")[0]; // YYYY-MM-DD
  return { start, end };
};

const getThisMonth = () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const start = startOfMonth.toISOString().split("T")[0]; // YYYY-MM-DD
  const end = endOfMonth.toISOString().split("T")[0]; // YYYY-MM-DD
  return { start, end };
};

const getLastWeek = () => {
  const today = new Date();
  const startOfLastWeek = new Date(
    today.setDate(today.getDate() - today.getDay() - 7)
  );
  const endOfLastWeek = new Date(
    today.setDate(today.getDate() - today.getDay() - 1)
  );
  const start = startOfLastWeek.toISOString().split("T")[0]; // YYYY-MM-DD
  const end = endOfLastWeek.toISOString().split("T")[0]; // YYYY-MM-DD
  return { start, end };
};

const getLastMonth = () => {
  const today = new Date();
  const startOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  const start = startOfLastMonth.toISOString().split("T")[0]; // YYYY-MM-DD
  const end = endOfLastMonth.toISOString().split("T")[0]; // YYYY-MM-DD
  return { start, end };
};

module.exports = {
  getToday,
  getYesterday,
  getThisWeek,
  getThisMonth,
  getLastWeek,
  getLastMonth,
};
