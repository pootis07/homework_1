// Week 5: load cooking tips from the Express API and handle all UI states.
const tipsList = document.getElementById("tips-list");
const tipsStatus = document.getElementById("tips-status");
const API_BASE_URL = "http://localhost:3000";

async function loadCookingTips() {
  if (!tipsList || !tipsStatus) return;
  tipsStatus.textContent = "Loading cooking tips…";
  tipsList.replaceChildren();
  try {
    const response = await fetch(`${API_BASE_URL}/api/tips`);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const tips = await response.json();
    if (!Array.isArray(tips)) throw new Error("The tips data must be a JSON array.");
    if (tips.length === 0) {
      tipsStatus.textContent = "No cooking tips are available right now.";
      return;
    }
    tips.forEach((tip) => {
      const item = document.createElement("li");
      item.textContent = tip.text;
      tipsList.appendChild(item);
    });
    tipsStatus.textContent = "Cooking tips loaded successfully.";
  } catch (error) {
    tipsStatus.textContent = "Sorry, cooking tips could not be loaded. Please try again later.";
    console.error("Could not load cooking tips:", error);
  }
}
loadCookingTips();

// Week 3: validate the feedback form when it is present on this page.
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
    document.querySelectorAll(".error-message").forEach((message) => { message.textContent = ""; });
    document.getElementById("form-success").textContent = "";
    if (name.length < 2) {
      document.getElementById("name-error").textContent = "Please enter a name with at least 2 characters.";
      isValid = false;
    }
    if (ageValue === "" || !Number.isInteger(age) || age < 1 || age > 120) {
      document.getElementById("age-error").textContent = "Please enter a whole-number age between 1 and 120.";
      isValid = false;
    }
    if (complaint.length < 5) {
      document.getElementById("complaint-error").textContent = "Please enter at least 5 characters of feedback.";
      isValid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("email-error").textContent = "Please enter a valid email address.";
      isValid = false;
    }
    if (isValid) {
      document.getElementById("form-success").textContent = "Thank you! Your form is valid.";
      feedbackForm.reset();
    }
  });
}
