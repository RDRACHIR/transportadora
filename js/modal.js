var cerrar = document.querySelectorAll(".close")[0];
var abrir = document.querySelectorAll("#abrir")[0];
var modal = document.querySelectorAll(".modal")[0];
var modalC = document.querySelectorAll(".modal-container")[0];

abrir.addEventListener("click", function (e) {
  e.preventDefault();
  modalC.style.opacity = "1";
  modalC.style.visibility = "visible";
  modal.classList.toggle("modal-close");
});

cerrar.addEventListener("click", function () {
  modal.classList.toggle("modal-close");
  setTimeout(function () {
    modalC.style.opacity = "0";
    modalC.style.visibility = "hidden";
  }, 600);
});

window.addEventListener("click", function (e) {
  if (e.target == modalC) {
    modal.classList.toggle("modal-close");
    setTimeout(function () {
      modalC.style.opacity = "0";
      modalC.style.visibility = "hidden";
    }, 600);
  }
});
