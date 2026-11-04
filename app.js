// Week 3: JavaScript, arrays, DOM manipulation, and form validation.

// 1. Dynamic list: create list items from a JavaScript array.
const cookingTips = [
  "Read the full recipe before you start.",
  "Prepare and measure your ingredients first.",
  "Keep your cooking area clean and organized.",
  "Taste your food before serving."
];

const tipsList = document.getElementById("tips-list");

if (tipsList) {
  cookingTips.forEach(function (tip) {
    const listItem = document.createElement("li");
    listItem.textContent = tip;
    tipsList.appendChild(listItem);
  });
}

// 2. Form validation: show a clear message for each invalid field.
const feedbackForm = document.getElementById("feedback-form");

if (feedbackForm) {
  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const ageValue = document.getElementById("age").value.trim();
    const complaint = document.getElementById("complaint").value.trim();
    const email = document.getElementById("email").value.trim();

    const age = Number(ageValue);
    let isValid = true;

    // Clear old messages before checking again.
    document.querySelectorAll(".error-message").forEach(function (message) {
      message.textContent = "";
    });
    document.getElementById("form-success").textContent = "";

    if (name.length < 2) {
      document.getElementById("name-error").textContent =
        "Please enter a name with at least 2 characters.";
      isValid = false;
    }

    if (ageValue === "" || !Number.isInteger(age) || age < 1 || age > 120) {
      document.getElementById("age-error").textContent =
        "Please enter a whole-number age between 1 and 120.";
      isValid = false;
    }

    if (complaint.length < 5) {
      document.getElementById("complaint-error").textContent =
        "Please enter at least 5 characters of feedback.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email address.";
      isValid = false;
    }

    if (isValid) {
      document.getElementById("form-success").textContent =
        "Thank you! Your form is valid.";
      feedbackForm.reset();
    }
  });
}
