// DOMs
const showBalanceBtn = document.getElementById("showBalanceBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const balanceAmount = document.getElementById("balanceAmount");
const balanceModal = document.getElementById("balanceModal");

function showBalanceModal() {
  balanceModal.classList.add("show"); // Add show to the modal class
}

function closeBalanceModal() {
  balanceModal.classList.remove("show");
}

showBalanceBtn.addEventListener("click", showBalanceModal);
closeModalBtn.addEventListener("click", closeBalanceModal);
