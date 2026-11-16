/* день 4-5: форма запиту та її валідація */

console.log("JavaScript підключено успішно");

/* перевірка одного поля */
function isFilled(field) {
  return field.value.trim() !== "";
}

/* перевірка пошти */
function isValidEmail(value) {
  const pattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value.trim());
}

/* перевірка телефону */
function isValidPhone(value) {
  const pattern = /^\+?\d[\d\s()-]{8,15}$/;
  return pattern.test(value.trim());
}

/* підсвітка поля з помилкою */
function markField(field, hasError) {
  if (hasError) {
    field.classList.add("invalid");
  } else {
    field.classList.remove("invalid");
  }
  return hasError;
}

/* ініціалізація форми */
function initializeModalForm(form) {
  if (!form) {
    return;
  }

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const service = document.getElementById("service");
  const message = document.getElementById("message");
  const clearButton = document.getElementById("clearButton");
  const errorBox = document.getElementById("formError");

  const submitButton = form.querySelector(".submit-button");

  const inputFields = form.querySelectorAll(".form-group input, .form-group select, .form-group textarea");
  const formButtons = form.querySelectorAll(".btn");

  /* фокус і втрата фокусу */
  inputFields.forEach(function (field) {
    field.addEventListener("focus", function () {
      field.classList.add("focused");
    });

    field.addEventListener("blur", function () {
      field.classList.remove("focused");
    });
  });

  /* наведення курсора на кнопки */
  formButtons.forEach(function (button) {
    button.addEventListener("mouseover", function () {
      button.classList.add("hovered");
    });

    button.addEventListener("mouseout", function () {
      button.classList.remove("hovered");
    });
  });

  /* очищення форми */
  clearButton.addEventListener("click", function () {
    console.log("Виконується очищення форми");

    form.reset();
    service.selectedIndex = 0;
    message.value = "";

    inputFields.forEach(function (field) {
      field.classList.remove("invalid");
    });

    errorBox.textContent = "";
    errorBox.classList.remove("visible");
  });

  /* валідація всіх полів */
  function validateForm() {
    let hasError = false;

    hasError = markField(firstName, !isFilled(firstName)) || hasError;
    hasError = markField(lastName, !isFilled(lastName)) || hasError;
    hasError = markField(email, !isValidEmail(email.value)) || hasError;
    hasError = markField(phone, !isValidPhone(phone.value)) || hasError;
    hasError = markField(service, service.value === "") || hasError;
    hasError = markField(message, !isFilled(message)) || hasError;

    return !hasError;
  }

  /* надсилання форми */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      errorBox.textContent = "";
      errorBox.classList.remove("visible");

      alert("Дякуємо! Ваш запит прийнято, адміністратор зв'яжеться з вами найближчим часом.");

      form.reset();
      service.selectedIndex = 0;
    } else {
      errorBox.textContent = "Будь ласка, виправте виділені поля: заповніть усі рядки, вкажіть коректну пошту та телефон і оберіть послугу.";
      errorBox.classList.add("visible");
    }
  });

  console.log("Форму ініціалізовано, кнопка надсилання:", submitButton);
}

/* доступ для main.js */
window.initializeModalForm = initializeModalForm;

/* якщо форма відкрита окремою сторінкою */
document.addEventListener("DOMContentLoaded", function () {
  const standaloneForm = document.getElementById("requestForm");

  if (standaloneForm) {
    initializeModalForm(standaloneForm);
  }
});
