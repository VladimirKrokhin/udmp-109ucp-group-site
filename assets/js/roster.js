/* roster.js — список студентов группы.
   Одна строка = один человек = одна папка в team/<slug>.

   Как добавить себя:
   1) скопируйте папку team/_template в team/<фамилия латиницей>;
   2) заполните свою карточку (инструкция — team/_template/ЗАПОЛНЕНИЕ-КАРТОЧКИ.md);
   3) допишите себя в список ниже по образцу.

   photo — путь к файлу фото ОТ КОРНЯ сайта,
   например "assets/img/krokhin.svg" или "team/ivanov/photo.jpg".
   Без фото напишите "" — покажутся инициалы. */

window.GROUP_ROSTER = [
  {
    slug: "krokhin",
    name: "Крохин Владимир",
    role: "Fullstack-разработчик (Python + Vue)",
    tag: "Python · Vue · Frappe",
    photo: "assets/img/krokhin.svg"
  },
  {
    slug: "bereznyov",
    name: "Березнёв Дмитрий Алексеевич",
    role: "Fullstack-разработчик",
    tag: "Python · JavaScript · Git",
    photo: ""
  }
];

/* Дальше — служебный код: рисует карточки состава там, где есть [data-roster]. */
(function () {
  "use strict";

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function siteRoot() {
    var meta = document.querySelector('meta[name="site-root"]');
    return meta ? (meta.getAttribute("content") || "") : "";
  }

  function initials(name) {
    var parts = String(name || "").trim().split(/\s+/);
    return parts.slice(0, 2).map(function (part) {
      return part.charAt(0).toUpperCase();
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var grids = document.querySelectorAll("[data-roster]");
    if (!grids.length || !Array.isArray(window.GROUP_ROSTER)) return;

    var root = siteRoot();

    grids.forEach(function (grid) {
      var limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
      var list = limit > 0 ? window.GROUP_ROSTER.slice(0, limit)
                           : window.GROUP_ROSTER;

      grid.innerHTML = list.map(function (student) {
        var photo = student.photo
          ? '<img class="member__photo" src="' + esc(root + student.photo) +
            '" alt="Фото: ' + esc(student.name) + '">'
          : '<div class="member__photo member__photo--empty" aria-hidden="true">' +
            esc(initials(student.name)) + "</div>";

        return '<article class="member">' + photo +
          '<h3 class="member__name">' + esc(student.name) + "</h3>" +
          '<p class="member__role">' + esc(student.role || "") + "</p>" +
          (student.tag ? '<p class="member__tag">' + esc(student.tag) + "</p>" : "") +
          '<a class="member__link" href="' + esc(root + "team/" + student.slug + "/") +
          '">Карточка →</a>' +
          "</article>";
      }).join("");
    });
  });
})();
