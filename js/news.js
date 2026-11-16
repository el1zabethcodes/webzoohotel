/* день 6-8: логіка сторінки новин без jQuery */

document.addEventListener("DOMContentLoaded", function () {

  /* рік у підвалі */
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* дата оновлення стрічки */
  const status = document.getElementById("statusMessage");
  const dates = document.querySelectorAll(".news-item time[datetime]");

  if (status && dates.length > 0) {
    let newest = null;

    dates.forEach(function (item) {
      const current = new Date(item.getAttribute("datetime"));

      if (newest === null || current > newest) {
        newest = current;
      }
    });

    const months = [
      "січня", "лютого", "березня", "квітня", "травня", "червня",
      "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"
    ];

    const formatted = newest.getDate() + " " + months[newest.getMonth()] +
      " " + newest.getFullYear() + " року";

    status.textContent = "Стрічку новин оновлено " + formatted + ".";
  }

  /* фільтр за категоріями */
  const buttons = document.querySelectorAll(".filter-button");
  const items = document.querySelectorAll(".news-item");
  const counter = document.getElementById("newsCount");

  function showCount(visible, category) {
    if (!counter) {
      return;
    }

    if (category === "all") {
      counter.textContent = "Показано всі публікації: " + visible + ".";
    } else {
      counter.textContent = "Показано публікацій у категорії: " + visible + ".";
    }
  }

  function applyFilter(category) {
    let visible = 0;

    items.forEach(function (item) {
      const match = category === "all" || item.dataset.category === category;
      item.classList.toggle("is-hidden", !match);

      if (match) {
        visible = visible + 1;
      }
    });

    showCount(visible, category);
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach(function (other) {
        other.classList.remove("is-active");
      });

      button.classList.add("is-active");
      applyFilter(button.dataset.category);
    });
  });

  applyFilter("all");
});
