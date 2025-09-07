const form = document.getElementById("form-information");
const continueButton = document.querySelector(".continue-button");

function showError(elementID, errorID) {
    const element = document.getElementById(elementID);
    const error = document.getElementById(errorID);

    if (element && error) {
        element.classList.add("error");
        error.classList.add("show");
    }
}

function hideError(elementID, errorID) {
    const element = document.getElementById(elementID);
    const error = document.getElementById(errorID);

    if (element && error) {
        element.classList.remove("error");
        error.classList.remove("show");
    }
}

function validateField(elementID, errorID, isRequired = true) {
    const element = document.getElementById(elementID);
    const value = element.value;

    if (value === "" && isRequired) {
        showError(elementID, errorID);
        return false;
    }

    hideError(elementID, errorID);
    return true;
}

function validateCardNumber(elementID, errorID) {
    const element = document.getElementById(elementID);
    const value = element.value;

    if (value.toString().length > 19 || value.toString().length < 19) {
        showError(elementID, errorID);
        return false;
    } else {
        hideError(elementID, errorID);
        return true;
    }
}

document.getElementById('card-name').addEventListener('input', () => {
    document.querySelector(".card-front-name").textContent = form.elements["card-name"].value || "JANE APPLESEED";
});
document.getElementById('card-number').addEventListener('input', () => {
    document.querySelector(".card-front-digits").textContent = form.elements["card-number"].value.replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ").trim().substring(0, 19);
});
document.getElementById('card-exp-date-month').addEventListener('input', () => {
    document.querySelector(".card-front-date-first").textContent = `${form.elements["card-exp-date-month"].value.toString().padStart(2, '0').substring(0, 2)}`;
});
document.getElementById('card-exp-date-year').addEventListener('input', () => {
    document.querySelector(".card-front-date-last").textContent = `${form.elements["card-exp-date-year"].value.substring(0, 2)}`;
});
document.getElementById('card-cvc').addEventListener('input', () => {
    document.querySelector(".card-back-num").textContent = form.elements["card-cvc"].value.substring(0, 3);
});

// Form Submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateField("card-name", "card-name-error", true);
    const isNumberValid = validateCardNumber("card-number", "card-number-error");
    const isDateMonthValid = validateField("card-exp-date-month", "card-date-error-month", true);
    const isDateYearValid = validateField("card-exp-date-year", "card-date-error-year", true);
    const isCVCValid = validateField("card-cvc", "card-cvc-error", true);

    if (isNameValid && isNumberValid && isDateMonthValid && isDateYearValid && isCVCValid) {
        document.querySelector(".form-section").style.display = "none";
        document.querySelector(".completed-section").style.display = "flex";
    }
});

const inputs = document.querySelectorAll("input, textarea");
inputs.forEach((input) => {
    input.addEventListener("input", function () {
        const elementID = this.id;
        const errorId = elementID + "Error";
        if (this.value.trim() !== "") {
            hideError(elementID, errorId);
        }
    });
});

const cardNumberInput = document.getElementById("card-number");
if (cardNumberInput) {
    cardNumberInput.oninput = () => {
        cardNumberInput.value = cardNumberInput.value
            .replace(/\D/g, "")
            .replace(/(.{4})/g, "$1 ").trim().substring(0, 19);
    };
}

const cardMonthInput = document.getElementById("card-exp-date-month");
if (cardMonthInput) {
    cardMonthInput.oninput = () => {
        cardMonthInput.value = cardMonthInput.value
            .replace(/\D/g, "").trim().substring(0, 2);
    };

    cardMonthInput.addEventListener('blur', (e) => {
        let value = parseInt(e.target.value);
        if (!isNaN(value)) {
            e.target.value = value.toString().padStart(2, '0');
        }
    });
}

const cardYearInput = document.getElementById("card-exp-date-year");
if (cardYearInput) {
    cardYearInput.oninput = () => {
        cardYearInput.value = cardYearInput.value
            .replace(/\D/g, "").trim().substring(0, 2);
    };
}

const cardCVCInput = document.getElementById("card-cvc");
if (cardCVCInput) {
    cardCVCInput.oninput = () => {
        cardCVCInput.value = cardCVCInput.value
            .replace(/\D/g, "").trim().substring(0, 3);
    };
}

if (form.elements["card-name"].value !== "" ||
    form.elements["card-number"].value !== "" ||
    form.elements["card-exp-date-month"].value !== "" ||
    form.elements["card-exp-date-year"].value !== "" ||
    form.elements["card-cvc"].value !== "") {

    if (window.performance.getEntriesByType("navigation")[0].type === "reload") {
        if (confirm("This will reset your form. Continue?")) {
            form.reset();
        }
    }
}

continueButton.addEventListener('click', (e) => {
    form.reset();
    document.querySelector(".card-front-name").textContent = "JANE APPLESEED";
    document.querySelector(".card-front-digits").textContent = "0000 0000 0000 0000";
    document.querySelector(".card-front-date-first").textContent = "00";
    document.querySelector(".card-front-date-last").textContent = "00";
    document.querySelector(".card-back-num").textContent = "000";
    document.querySelector(".form-section").style.display = "block";
    document.querySelector(".completed-section").style.display = "none";
});