// Higher-order functions
const transactions = [
  { id: "t1", type: "debit", amount: 150 },
  { id: "t2", type: "credit", amount: 200 },
  { id: "t3", type: "debit", amount: 50 },
  { id: "t4", type: "credit", amount: 300 },
];

const credits = transactions.filter(t => t.type === "credit");
console.log("Credit transactions:", credits);

const amounts = transactions.map(t => t.amount);
console.log("All amounts:", amounts);

const totalDebit = transactions
  .filter(t => t.type === "debit")
  .reduce((sum, t) => sum + t.amount, 0);
console.log("Total debit:", totalDebit);

// One-time notification
setTimeout(() => alert("Welcome to your dashboard!"), 3000);

// Countdown
document.getElementById("start-timer-btn").addEventListener("click", () => {
  let count = 10;
  const display = document.getElementById("timer-display");
  const interval = setInterval(() => {
    count--;
    display.textContent = count;
    if (count <= 0) {
      display.textContent = "Done!";
      clearInterval(interval);
    }
  }, 1000);
});

// Theme preference
function setTheme(theme) {
  if (theme === "dark") document.body.style.backgroundColor = "#333";
  else document.body.style.backgroundColor = "#fff";
}

function saveThemePreference(theme) {
  document.cookie = `theme=${theme}; path=/`;
}

function loadThemePreference() {
  const cookies = document.cookie.split("; ");
  const themeCookie = cookies.find(c => c.startsWith("theme="));
  if (themeCookie) {
    const theme = themeCookie.split("=")[1];
    setTheme(theme);
  }
}

window.addEventListener("load", loadThemePreference);
