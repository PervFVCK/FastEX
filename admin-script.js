// DARK MODE TOGGLE
document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    showPopup("Dark mode toggled!");
});

// POPUP FUNCTION
function showPopup(message) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.textContent = message;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// UPDATE EXCHANGE RATES
function updateRates() {
    const rates = {
        btcRate: document.getElementById("btcRate").value,
        ethRate: document.getElementById("ethRate").value,
        usdtRate: document.getElementById("usdtRate").value,
        amazonRate: document.getElementById("amazonRate").value,
        steamRate: document.getElementById("steamRate").value,
        googlePlayRate: document.getElementById("googlePlayRate").value,
        itunesRate: document.getElementById("itunesRate").value
    };

    localStorage.setItem("exchangeRates", JSON.stringify(rates));
    showPopup("Exchange rates updated successfully!");
}

// LOAD EXCHANGE RATES ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
    const storedRates = JSON.parse(localStorage.getItem("exchangeRates")) || {};
    
    document.getElementById("btcRate").value = storedRates.btcRate || "";
    document.getElementById("ethRate").value = storedRates.ethRate || "";
    document.getElementById("usdtRate").value = storedRates.usdtRate || "";
    document.getElementById("amazonRate").value = storedRates.amazonRate || "";
    document.getElementById("steamRate").value = storedRates.steamRate || "";
    document.getElementById("googlePlayRate").value = storedRates.googlePlayRate || "";
    document.getElementById("itunesRate").value = storedRates.itunesRate || "";
});

// LOAD CUSTOMER SUPPORT MESSAGES
function loadSupportMessages() {
    let messages = JSON.parse(localStorage.getItem("supportMessages")) || [];
    const messageList = document.getElementById("supportMessages");

    if (messages.length === 0) {
        messageList.innerHTML = "<li>No messages yet.</li>";
    } else {
        messageList.innerHTML = "";
        messages.forEach((msg, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>${msg.sender}:</strong> ${msg.message} 
                            <button onclick="deleteMessage(${index})">Delete</button>`;
            messageList.appendChild(li);
        });
    }
}

// DELETE SUPPORT MESSAGE
function deleteMessage(index) {
    let messages = JSON.parse(localStorage.getItem("supportMessages")) || [];
    messages.splice(index, 1);
    localStorage.setItem("supportMessages", JSON.stringify(messages));
    loadSupportMessages();
}

// LOAD TRANSACTIONS
function loadTransactions() {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const transactionList = document.getElementById("transactions");

    if (transactions.length === 0) {
        transactionList.innerHTML = "<li>No transactions yet.</li>";
    } else {
        transactionList.innerHTML = "";
        transactions.forEach((tx, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>Type:</strong> ${tx.type} - <strong>Status:</strong> ${tx.status} 
                            <button onclick="markCompleted(${index})">Mark Completed</button>`;
            transactionList.appendChild(li);
        });
    }
}

// MARK TRANSACTION AS COMPLETED
function markCompleted(index) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    if (transactions[index]) {
        transactions[index].status = "Completed";
        localStorage.setItem("transactions", JSON.stringify(transactions));
        loadTransactions();
        showPopup("Transaction marked as completed.");
    }
}

// LOAD ALL DATA ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
    loadSupportMessages();
    loadTransactions();
});
