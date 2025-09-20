// =============================
// Task 1: Create User Profiles
// =============================
function createUserProfile({ name = "Anonymous", preferences: { theme = "light" } = {} } = {}) {
  return `Hello ${name}! Your theme is ${theme}.`;
}

const user1 = { name: "Ahmed", preferences: { theme: "dark" } };
const user2 = { name: "Salma" };
const user3 = {};

const task1Results = [
  createUserProfile(user1),
  createUserProfile(user2),
  createUserProfile(user3),
].join("\n");

document.getElementById("task1-output").textContent = task1Results;


// =================================
// Task 2: Manage Unique Roles & User
// =================================

// Part 1: Unique Roles
function getUniqueRoles(roles) {
  return [...new Set(roles)];
}

const userRoles = ["admin", "editor", "viewer", "editor", "admin"];
const uniqueRoles = getUniqueRoles(userRoles);

// Part 2: User Database
const users = [
  { id: "u1", name: "Nour", email: "nour@example.com" },
  { id: "u2", name: "Karim", email: "karim@example.com" },
];

const usersMap = new Map(users.map(user => [user.id, user]));

function findUserById(id) {
  return usersMap.get(id);
}

const foundUser = findUserById("u2");

document.getElementById("task2-output").textContent =
  "Unique Roles: " + JSON.stringify(uniqueRoles) + "\n" +
  "User u2: " + JSON.stringify(foundUser, null, 2);


// =================================
// Task 3: Safely Update Configuration
// =================================
function updateTheme(config, newTheme) {
  return {
    ...config,
    settings: {
      ...config.settings,
      theme: newTheme,
    },
  };
}

const originalConfig = {
  user: "Admin",
  settings: {
    theme: "dark",
    notifications: {
      email: true,
    },
  },
};

const newConfig = updateTheme(originalConfig, "light");

document.getElementById("task3-output").textContent =
  "NewConfig Theme: " + newConfig.settings.theme + "\n" +
  "OriginalConfig Theme: " + originalConfig.settings.theme;


// =============================
// Task 4: Destructuring
// =============================
function processData({
  user: {
    name,
    address: { city, postal = "00000" },
  },
  items: [
    { name: item1Name, price: item1Price },
    { name: item2Name = "Item 2", price: item2Price = 0 } = {},
  ],
}) {
  return `User ${name} from ${city} bought ${item1Name} for ${item1Price} and ${item2Name} for ${item2Price}.`;
}

const data = {
  id: 1,
  user: {
    name: "Ali",
    address: {
      city: "Cairo",
      postal: "12345",
    },
  },
  items: [
    { id: "i1", name: "Item 1", price: 100 },
    { id: "i2", name: "Item 2", price: 200 },
  ],
};

document.getElementById("task4-output").textContent = processData(data);
