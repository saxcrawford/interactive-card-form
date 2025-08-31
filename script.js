const form = document.getElementById("form-information");
const cardName = form.elements["card-name"];
const cardholderName = document.querySelector(".card-front-name");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let fullName = cardName.value;
  cardholderName.innerHTML = fullName.toUpperCase();
});
