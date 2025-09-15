document.querySelectorAll(".toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.parentElement;
    const isRead = card.getAttribute("data-read") === "true";

    if (isRead) {
      btn.textContent = "Not read";
      btn.classList.remove("read");
      btn.classList.add("not-read");
      card.setAttribute("data-read", "false");
    } else {
      btn.textContent = "Read";
      btn.classList.remove("not-read");
      btn.classList.add("read");
      card.setAttribute("data-read", "true");
    }
  });
});


