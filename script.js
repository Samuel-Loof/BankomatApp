document.addEventListener("DOMContentLoaded", () => {
  // DOMs
  const showBalanceBtn = document.getElementById("showBalanceBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const balanceAmount = document.getElementById("balanceAmount");
  const balanceModal = document.getElementById("balanceModal");
  const loginBtn = document.getElementById("loginBtn");

  let currentUser = null;

  function showBalanceModal() {
    if (!currentUser) {
      alert("You need to login first!");
    } else {
      balanceModal.classList.add("show"); // Add show to the modal class
    }
  }

  function closeBalanceModal() {
    balanceModal.classList.remove("show");
  }

  showBalanceBtn.addEventListener("click", showBalanceModal);
  closeModalBtn.addEventListener("click", closeBalanceModal);

  const users = [
    { username: "BradPitt", name: "Brad Pitt", password: "123", balance: 1000 },
    { username: "Batman", name: "Bruce", password: "123", balance: 1000 },
  ];

  function login() {
    const usernameInput = document.querySelector(".username").value;
    const passwordInput = document.querySelector(".password").value;

    // Find user by username and password
    const user = users.find(
      (u) => u.username === usernameInput && u.password === passwordInput
    );

    if (!user) {
      alert("Invalid username or password");
    } else {
      currentUser = user;
    }
  }

  loginBtn.addEventListener("click", () => {
    login(); // Call login function when button is clicked

    if (currentUser) {
      document.querySelector(".loginSection").style.display = "none";
    }
  });
});
