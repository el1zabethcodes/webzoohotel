/* день 6-8: ефекти та події на jQuery */

$(document).ready(function () {

  console.log("jQuery підключено успішно");

  /* вибір елементів */
  const $cards = $(".news-card");
  const $pageTitle = $("#pageTitle");
  const $buttons = $(".read-more");
  const $extraInfo = $("#extraInfo").hide();

  console.log("Карток:", $cards.length);
  console.log("Кнопок «Читати далі»:", $buttons.length);
  console.log("Заголовок сторінки:", $pageTitle.text());
  console.log("Для порівняння, querySelectorAll:", document.querySelectorAll(".news-card").length);

  /* підказка про обрану новину */
  function updateHint() {
    const $selected = $(".news-card.selected");

    if ($selected.length === 0) {
      $("#selectionHint").text("Натисніть на картку, щоб обрати новину.");
    } else {
      $("#selectionHint").html("Обрана новина: <strong>" + $selected.find(".card-title").text() + "</strong>");
    }
  }

  /* повідомлення про оновлення стрічки */
  $("#statusMessage").stop(true, true).fadeIn(250).delay(2200).fadeOut(350);

  /* розгортання картки */
  function toggleCard($card) {
    const $full = $card.find(".news-full");
    const willShow = !$full.is(":visible");

    /* згортаємо решту карток */
    $(".news-card").not($card).removeClass("selected");
    $(".news-card").not($card).find(".news-full").stop(true, true).fadeOut(200);
    $(".news-card").not($card).find(".read-more").text("Читати далі");

    $card.toggleClass("selected");
    $full.stop(true, true).fadeToggle(300);
    $card.find(".read-more").text(willShow ? "Згорнути" : "Читати далі");
    updateHint();
  }

  /* клік по картці */
  $cards
    .off("click.news")
    .on("click.news", function (event) {
      if ($(event.target).closest("a").length > 0) {
        return;
      }

      toggleCard($(this));
    });

  /* наведення курсора */
  $cards
    .off("mouseenter.news mouseleave.news")
    .on("mouseenter.news", function () {
      $(this).addClass("hovered");
    })
    .on("mouseleave.news", function () {
      $(this).removeClass("hovered");
    });

  /* кнопка «Читати далі» */
  $buttons
    .off("click.news")
    .on("click.news", function (event) {
      event.preventDefault();
      event.stopPropagation();

      toggleCard($(this).closest(".news-card"));
    });

  /* додатковий блок */
  $("#toggleInfo")
    .off("click.news")
    .on("click.news", function () {
      const willShow = !$extraInfo.is(":visible");

      $extraInfo.stop(true, true).fadeToggle(300);
      $(this).text(willShow ? "Сховати подробиці" : "Детальніше про стрічку");
    });

  updateHint();
});
