/* інтерактивність головної сторінки */

document.addEventListener("DOMContentLoaded", function () {

  /* модальне вікно */
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  const closeModalButton = document.getElementById("closeModal");
  const openButtons = document.querySelectorAll("#openModalButton, #openModalButtonBottom");

  let formLoaded = false;

  /* завантаження форми через fetch */
  async function loadForm() {
    if (formLoaded) {
      return;
    }

    modalBody.innerHTML = "<p class='modal-loading'>Завантаження форми…</p>";

    try {
      const response = await fetch("modal-form.html");

      if (!response.ok) {
        throw new Error("Помилка завантаження форми: " + response.status);
      }

      const html = await response.text();
      modalBody.innerHTML = html;
      formLoaded = true;

      const form = modalBody.querySelector("#requestForm");

      if (typeof window.initializeModalForm === "function") {
        window.initializeModalForm(form);
      }
    } catch (error) {
      console.error(error);
      modalBody.innerHTML = "<p class='modal-loading'>Не вдалося завантажити форму. Спробуйте пізніше.</p>";
    }
  }

  function openModal() {
    modal.classList.add("active");
    document.body.classList.add("modal-open");
    loadForm();
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  openButtons.forEach(function (button) {
    button.addEventListener("click", openModal);
  });

  closeModalButton.addEventListener("click", closeModal);

  /* клік по затемненню */
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  /* клавіша Escape */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  /* випадаюче меню */
  const menuButton = document.getElementById("servicesMenuButton");
  const menu = document.getElementById("servicesMenu");
  const menuItems = menu.querySelectorAll("a");

  function closeMenu() {
    menu.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  }

  menuButton.addEventListener("click", function (event) {
    event.stopPropagation();
    menu.classList.toggle("active");
    menuButton.setAttribute("aria-expanded", menu.classList.contains("active") ? "true" : "false");
  });

  menuItems.forEach(function (item) {
    item.addEventListener("click", closeMenu);
  });

  /* клік поза меню */
  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
      closeMenu();
    }
  });

  /* поява блоків при прокручуванні */
  const animatedElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  animatedElements.forEach(function (element) {
    observer.observe(element);
  });

});
