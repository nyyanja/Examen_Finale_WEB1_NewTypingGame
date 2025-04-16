document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById("theme-toggle");
  const darkIcon = document.getElementById("dark-icon");
  const lightIcon = document.getElementById("light-icon");
  const htmlElement = document.documentElement;

  //Login Functionality
  const signInButton = document.getElementById("signInButton");
  const closeBtn = document.getElementById("closeBtn");
  const modalOverlay = document.getElementById("modalOverlay");
  const loginForm = document.getElementById("loginForm");
  const mainContent = document.getElementById("mainContent");

  // Display modal when SIGN IN is clicked
  signInButton.addEventListener("click", function () {
    modalOverlay.style.display = "flex";
    mainContent.classList.add("blur");
  });

  // Close modal when X is clicked
  closeBtn.addEventListener("click", function () {
    modalOverlay.style.display = "none";
    mainContent.classList.remove("blur"); 
  });

  // Close modal when clicked outside the form
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      modalOverlay.style.display = "none";
      mainContent.classList.remove("blur"); 
    }
  });

  //form filling
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("errorMessage");
    let button = document.getElementById("sign-in");

    let userMail = "NeonTyper@gmail.com";
    let userPassword = "123456";

    if (email == userMail && password == userPassword) {
      let dots = "";
      let count = 0;

      button.disabled = true;
      let loadingDot = setInterval(() => {
        count = (count + 1) % 4;
        dots = ".".repeat(count);
        button.innerText = dots;
      }, 500);

      setTimeout(() => {
        clearInterval(loadingDot);
        window.location.href = "assests/game.html";
      }, 4000);
    } else {
      errorMessage.style.display = "flex";
      setTimeout(() => {
        button.textContent = "Login";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
      }, 100);
    }
  });

  document.getElementById("email").addEventListener("input", () => {
    document.getElementById("errorMessage").style.display = "none";
  });

  document.getElementById("password").addEventListener("input", () => {
    document.getElementById("errorMessage").style.display = "none";
  });

  //keyboard Functionality
  const rows = {
    row1: "QWERTYUIOP",
    row2: "ASDFGHJKL",
    row3: "ZXCVBNM",
    row4: " ",
  };

  const keyboardLayout = {};

  for (let row in rows) {
    const container = document.getElementById(row);
    for (let char of rows[row]) {
      const key = document.createElement("div");
      key.className = "key";
      key.textContent = char === " " ? "⎵" : char;
      container.appendChild(key);
      keyboardLayout[char] = key;
    }
  }

  const text = `WELCOME TO NEONTYPER TEST YOUR SPEED, CHALLENGE YOUR FRIENDS, AND TYPE LIKE A PRO — WELCOME TO NEONTYPER, WHERE TYPING BECOMES A THRILLING RACE!`;

  let i = 0;

  function simulateTyping() {
    if (i < text.length) {
      const char = text[i].toUpperCase();
      if (keyboardLayout[char]) {
        const key = keyboardLayout[char];
        key.classList.add("active");
        setTimeout(() => key.classList.remove("active"), 300);
      }
      i++;
      setTimeout(simulateTyping, 100);
    } else {
      setTimeout(() => {
        i = 0;
        simulateTyping();
      }, 1500);
    }
  }
  simulateTyping();
  
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
