document.addEventListener("DOMContentLoaded", () => {
  // DOM references
  const loginBtn = document.getElementById("loginBtn");
  const loginSection = document.querySelector(".loginSection");
  const showBalanceBtn = document.getElementById("showBalanceBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Application state
  let currentUser = null;
  let atmSection = null;
  let inputField = null;
  let balanceModal = null;

  let welcomeMessage = document.createElement("h3");
  welcomeMessage.classList.add("welcomeHeading");
  welcomeMessage.textContent = "Welcome to your bank";
  document.body.prepend(welcomeMessage);

  // User data
  const users = [
    { username: "BradPitt", name: "Brad Pitt", password: "123", balance: 1000 },
    { username: "Batman", name: "Bruce", password: "123", balance: 1000 },
  ];

  const usernameInput = document.querySelector(".username");
  const passwordInput = document.querySelector(".password");

  // Login function
  function login() {
    const username = usernameInput.value;
    const password = passwordInput.value;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      currentUser = user;

      logoutBtn.classList.add("show");

      // Update welcome message
      welcomeMessage.textContent = `Welcome to your bank, ${user.name}`;

      // Append welcome message if not already in DOM
      if (!document.body.contains(welcomeMessage)) {
        document.body.prepend(welcomeMessage); // adds at top of body
      }

      return user;
    }
  }

  // Trigger login on Enter key
  [usernameInput, passwordInput].forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        loginBtn.click(); // simulate button click
      }
    });
  });

  // Handle login button click
  loginBtn.addEventListener("click", () => {
    const user = login();
    if (user) {
      currentUser = user;
      document.querySelector(".atm-screen").classList.remove("hidden");
      document.querySelector(".login-form").classList.add("hidden");
      logoutBtn.classList.add("show");
    } else {
      alert("Invalid username or password!");
    }
  });

  // Create modal for balance display
  function createModal() {
    if (balanceModal) return;

    balanceModal = document.createElement("div");
    balanceModal.classList.add("modal");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const title = document.createElement("h2");
    title.textContent = "Account Info";
    modalContent.appendChild(title);

    const info = document.createElement("div");
    info.id = "balanceInfo";
    modalContent.appendChild(info);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.classList.add("close-btn");
    closeBtn.addEventListener("click", () =>
      balanceModal.classList.remove("show")
    );
    modalContent.appendChild(closeBtn);

    balanceModal.appendChild(modalContent);
    document.body.appendChild(balanceModal);
  }

  // Show balance modal
  function showBalanceModal() {
    if (!currentUser) return alert("You need to login first!");
    createModal();

    const info = document.getElementById("balanceInfo");
    info.textContent = `Your balance is ${currentUser.balance}kr`;

    balanceModal.classList.add("show");
  }

  // Logout function
  function logout() {
    currentUser = null;
    if (atmSection) {
      atmSection.remove();
      atmSection = null;
    }
    loginSection.style.display = "block";
    // Clear input fields
    document.querySelector(".username").value = "";
    document.querySelector(".password").value = "";
  }

  // Login event listener
  loginBtn.addEventListener("click", () => {
    const user = login();
    if (!user) return alert("Invalid username or password");
    currentUser = user;

    loginSection.style.display = "none";

    // Create ATM section
    atmSection = document.createElement("div");
    atmSection.classList.add("atmSection");

    // Create input field
    inputField = document.createElement("input");
    inputField.type = "text";
    inputField.placeholder = "Enter amount";
    inputField.readOnly = true;
    atmSection.appendChild(inputField);

    // Create keypad container
    const keypad = document.createElement("div");
    keypad.classList.add("keypad");

    // Create number buttons (1-9)
    for (let i = 1; i <= 9; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.addEventListener("click", () => (inputField.value += i));
      keypad.appendChild(btn);
    }

    // Add zero button to keypad
    const zeroBtn = document.createElement("button");
    zeroBtn.textContent = "0";
    zeroBtn.addEventListener("click", () => (inputField.value += "0"));
    keypad.appendChild(zeroBtn);

    // Add keypad to ATM section
    atmSection.appendChild(keypad);

    // Create action buttons
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear";
    clearBtn.classList.add("action-btn");
    clearBtn.addEventListener("click", () => (inputField.value = ""));

    const withdrawBtn = document.createElement("button");
    withdrawBtn.textContent = "Withdraw";
    withdrawBtn.classList.add("action-btn");
    withdrawBtn.addEventListener("click", () => {
      const amount = Math.floor(Number(inputField.value));
      if (isNaN(amount) || amount <= 0) return alert("Invalid amount!");
      if (amount > currentUser.balance) return alert("Insufficient funds!");
      currentUser.balance -= amount;
      alert(`Success! New balance: ${currentUser.balance}kr`);
      inputField.value = "";
    });

    const depositBtn = document.createElement("button");
    depositBtn.textContent = "Deposit";
    depositBtn.classList.add("action-btn");
    depositBtn.addEventListener("click", () => {
      const amount = Math.floor(Number(inputField.value));
      if (isNaN(amount) || amount <= 0) return alert("Invalid amount!");
      currentUser.balance += amount;
      alert(`Success! New balance: ${currentUser.balance}kr`);
      inputField.value = "";
    });

    // Create action buttons container
    const actionButtons = document.createElement("div");
    actionButtons.classList.add("action-buttons");

    actionButtons.appendChild(clearBtn);
    actionButtons.appendChild(withdrawBtn);
    actionButtons.appendChild(depositBtn);

    // Add action buttons to ATM section
    atmSection.appendChild(actionButtons);

    // Add ATM section to body
    document.body.appendChild(atmSection);
  });

  // Event listeners
  showBalanceBtn.addEventListener("click", showBalanceModal);
  logoutBtn.addEventListener("click", logout);
});
