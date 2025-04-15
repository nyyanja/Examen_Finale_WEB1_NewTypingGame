document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById("theme-toggle");
  const darkIcon = document.getElementById("dark-icon");
  const lightIcon = document.getElementById("light-icon");
  const htmlElement = document.documentElement;

  //ajout du script login de miora
  const signInButton = document.getElementById("signInButton");
  const closeBtn = document.getElementById("closeBtn");
  const modalOverlay = document.getElementById("modalOverlay");
  const loginForm = document.getElementById("loginForm");
  const mainContent = document.getElementById("mainContent");

  // Afficher le modal quand on clique sur SIGN IN
  signInButton.addEventListener("click", function () {
    modalOverlay.style.display = "flex";
    mainContent.classList.add("blur");
  });

  // Fermer le modal quand on clique sur X
  closeBtn.addEventListener("click", function () {
    modalOverlay.style.display = "none";
    mainContent.classList.remove("blur");
  });

  // Fermer le modal quand on clique en dehors du formulaire
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      modalOverlay.style.display = "none";
      mainContent.classList.remove("blur");
    }
  });

  // Empêcher le formulaire de rafraîchir la page à la soumission
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Formulaire soumis");
  });
  //fin du login de miora

  // Function to update the icon
  function updateIcon(theme) {
    if (theme === "light") {
      darkIcon.style.display = "none";
      lightIcon.style.display = "block";
    } else {
      darkIcon.style.display = "block";
      lightIcon.style.display = "none";
    }
  }

  // Check theme on load
  const currentTheme = localStorage.getItem("theme") || "dark";
  htmlElement.setAttribute("data-theme", currentTheme);
  updateIcon(currentTheme);

  // Theme toggle event
  themeToggle.addEventListener("click", function () {
    const currentTheme = htmlElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    htmlElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);

    // Animation for smooth transition
    document.body.classList.add("theme-transition");
    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 1000);
  });

  // Animation for statistics
  animateNumbers();
});

// Number animation function
function animateNumbers() {
  // Word counter animation (+250)
  const wordsTarget = 250;
  const wordsElement = document.getElementById("words-count");
  let wordsCount = 0;

  // Fun percentage animation (100%)
  const funTarget = 100;
  const funElement = document.getElementById("fun-percent");
  let funCount = 0;

  if (!wordsElement || !funElement) {
    console.error("Animation elements not found");
    return;
  }

  const interval = setInterval(() => {
    if (wordsCount < wordsTarget) {
      wordsCount += 5;
      if (wordsCount > wordsTarget) wordsCount = wordsTarget;
      wordsElement.textContent = "+" + wordsCount;
    }

    if (funCount < funTarget) {
      funCount += 2;
      if (funCount > funTarget) funCount = funTarget;
      funElement.textContent = funCount + "%";
    }

    if (wordsCount >= wordsTarget && funCount >= funTarget) {
      clearInterval(interval);
    }
  }, 30);
}
