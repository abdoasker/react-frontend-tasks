const API = {
  categories: "https://www.themealdb.com/api/json/v1/1/list.php?c=list",
  searchByName: (q) =>
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      q
    )}`,
  filterByCategory: (c) =>
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
      c
    )}`,
  lookupById: (id) =>
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  random: "https://www.themealdb.com/api/json/v1/1/random.php",
};

const els = {
  categorySelect: document.getElementById("categorySelect"),
  searchInput: document.getElementById("searchInput"),
  grid: document.getElementById("grid"),
  empty: document.getElementById("empty"),
  error: document.getElementById("error"),
  status: document.getElementById("status"),
  resetBtn: document.getElementById("resetBtn"),
  randomBtn: document.getElementById("randomBtn"),
  modal: document.getElementById("mealModal"),
  modalTitle: document.getElementById("modalTitle"),
  modalThumb: document.getElementById("modalThumb"),
  modalMeta: document.getElementById("modalMeta"),
  modalIngredients: document.getElementById("modalIngredients"),
  modalInstructions: document.getElementById("modalInstructions"),
  modalLinks: document.getElementById("modalLinks"),
  closeModal: document.getElementById("closeModal"),
};

let currentMeals = [];
let lastQuery = { category: "", search: "" };

init();

async function init() {
  try {
    await loadCategories();
    els.status.textContent = "Loading meals…";
    await loadMeals();
  } catch (err) {
    showError(err);
  }
}

async function loadCategories() {
  const res = await fetch(API.categories);
  if (!res.ok) throw new Error("Failed to load categories");
  const data = await res.json();
  const list = (data.categories || data.meals || []) // API sometimes returns {meals: [{strCategory:...}]}
    .map((x) => x.strCategory)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  for (const c of list) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    els.categorySelect.appendChild(opt);
  }
  els.status.textContent = "";
}

async function loadMeals() {
  setLoading(true);
  hide(els.empty);
  hide(els.error);
  const cat = els.categorySelect.value.trim();
  const q = els.searchInput.value.trim();
  lastQuery = { category: cat, search: q };

  try {
    let meals = [];
    if (q) {
      meals = await fetchJSON(API.searchByName(q)).then((d) => d.meals || []);
      if (cat) {
        meals = meals.filter((m) => m.strCategory === cat);
      }
    } else if (cat) {
      meals = await fetchJSON(API.filterByCategory(cat)).then(
        (d) => d.meals || []
      );
    } else {
      // default: show some popular categories (e.g., Beef)
      const defaults = ["Beef", "Chicken", "Dessert", "Seafood"];
      const chunks = await Promise.all(
        defaults.map((c) => fetchJSON(API.filterByCategory(c)))
      );
      meals = chunks.flatMap((d) => d.meals || []).slice(0, 24);
    }
    currentMeals = meals;
    renderMeals(meals);
  } catch (err) {
    showError(err);
  } finally {
    setLoading(false);
  }
}

function renderMeals(meals) {
  els.grid.innerHTML = "";
  if (!meals || meals.length === 0) {
    hide(els.grid);
    show(els.empty);
    return;
  }
  show(els.grid);
  hide(els.empty);

  for (const m of meals) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
          <div class="thumb">
            <img loading="lazy" src="${m.strMealThumb}" alt="${escapeHtml(
      m.strMeal
    )}"/>
            ${
              m.strCategory
                ? `<span class="badge">${escapeHtml(m.strCategory)}</span>`
                : ""
            }
          </div>
          <div class="content">
            <h3 class="title">${escapeHtml(m.strMeal)}</h3>
            <p class="muted">${m.strArea ? escapeHtml(m.strArea) : "—"}</p>
            <div class="actions">
              <button class="primary" data-id="${m.idMeal}">View</button>
              <button class="ghost" data-id="${
                m.idMeal
              }" data-copy>Copy Link</button>
            </div>
          </div>
        `;
    card
      .querySelector("button.primary")
      .addEventListener("click", () => openMeal(m.idMeal));
    card
      .querySelector("[data-copy]")
      .addEventListener("click", () => copyMealLink(m.idMeal));
    els.grid.appendChild(card);
  }
}

async function openMeal(id) {
  const data = await fetchJSON(API.lookupById(id));
  const meal = (data.meals || [])[0];
  if (!meal) return;
  els.modalTitle.textContent = meal.strMeal;
  els.modalThumb.src = meal.strMealThumb;
  els.modalThumb.alt = meal.strMeal;
  els.modalMeta.textContent = `${meal.strCategory || ""} ${
    meal.strArea ? "• " + meal.strArea : ""
  }`.trim();

  // collect ingredients
  const ings = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim())
      ings.push(`${ing}${meas && meas.trim() ? " — " + meas : ""}`);
  }
  els.modalIngredients.innerHTML = ings
    .map((x) => `<span class="chip">${escapeHtml(x)}</span>`)
    .join("");
  els.modalInstructions.textContent = meal.strInstructions || "";

  els.modalLinks.innerHTML = "";
  if (meal.strSource) {
    const a = document.createElement("a");
    a.href = meal.strSource;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Source";
    a.style.color = "var(--accent)";
    a.style.marginRight = "1rem";
    els.modalLinks.appendChild(a);
  }
  if (meal.strYoutube) {
    const a = document.createElement("a");
    a.href = meal.strYoutube;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "YouTube";
    a.style.color = "var(--accent-2)";
    els.modalLinks.appendChild(a);
  }

  els.modal.showModal();
}

function copyMealLink(id) {
  const url = `https://www.themealdb.com/meal/${id}`; // not official but helpful
  navigator.clipboard
    ?.writeText(url)
    .then(() => {
      toast("Link copied!");
    })
    .catch(() => {
      toast("Copy failed", true);
    });
}

function toast(msg, isErr = false) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.position = "fixed";
  t.style.bottom = "20px";
  t.style.left = "50%";
  t.style.transform = "translateX(-50%)";
  t.style.padding = "10px 14px";
  t.style.background = isErr ? "var(--danger)" : "rgba(34,211,238,.9)";
  t.style.color = isErr ? "#fff" : "#001018";
  t.style.borderRadius = "10px";
  t.style.fontWeight = "700";
  t.style.zIndex = "9999";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1500);
}

function setLoading(v) {
  els.status.hidden = !v;
  els.status.textContent = v ? "Loading…" : "";
  if (v) {
    hide(els.grid);
    hide(els.empty);
    hide(els.error);
  }
}

function showError(err) {
  console.error(err);
  els.error.hidden = false;
  els.status.textContent = "";
  hide(els.grid);
  hide(els.empty);
}

function hide(el) {
  el.hidden = true;
}
function show(el) {
  el.hidden = false;
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

function escapeHtml(str = "") {
  return str.replace(
    /[&<>"']/g,
    (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        m
      ])
  );
}

// Events
els.categorySelect.addEventListener("change", loadMeals);

// Debounced search
let t;
els.searchInput.addEventListener("input", () => {
  clearTimeout(t);
  t = setTimeout(loadMeals, 350);
});

els.resetBtn.addEventListener("click", () => {
  els.categorySelect.value = "";
  els.searchInput.value = "";
  loadMeals();
});

els.randomBtn.addEventListener("click", async () => {
  setLoading(true);
  try {
    const data = await fetchJSON(API.random);
    const meal = (data.meals || [])[0];
    if (meal) {
      // ensure category appears on the badge when rendering from search/random
      meal.strArea = meal.strArea || "";
      currentMeals = [meal];
      renderMeals(currentMeals);
    }
  } catch (err) {
    showError(err);
  } finally {
    setLoading(false);
  }
});

// Modal close
els.closeModal.addEventListener("click", () => els.modal.close());
els.modal.addEventListener("click", (e) => {
  if (e.target === els.modal) els.modal.close();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && els.modal.open) els.modal.close();
});
