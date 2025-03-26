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

// UPDATE RATES
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
    showPopup("Rates updated successfully!");
}

// LOAD RATES ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
    const storedRates = JSON.parse(localStorage.getItem("exchangeRates")) || {};
    
    document.getElementById("btcRate").value = storedRates.btcRate || "";
    document.getElementById("ethRate").value = storedRates.ethRate || "";
    document.getElementById("usdtRate").value = storedRates.usdtRate || "";
    document.getElementById("amazonRate").value = storedRates.amazonRate || "";
    document.getElementById("steamRate").value = storedRates.steamRate || "";
    document.getElementById("googlePlayRate").value = storedRates.googlePlayRate || "";
    document.getElementById("itunesRate").value = storedRates.itunesRate || "";

    loadSupportMessages();
    loadTransactions();
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
            li.innerHTML = `<strong>${msg.name}:</strong> ${msg.message} 
                            <input type="text" id="reply-${index}" placeholder="Reply...">
                            <button onclick="replyMessage(${index})">Reply</button>
                            <button onclick="deleteMessage(${index})">Delete</button>`;
            messageList.appendChild(li);
        });
    }
}

// REPLY TO CUSTOMER MESSAGE
function replyMessage(index) {
    let messages = JSON.parse(localStorage.getItem("supportMessages")) || [];
    let replyText = document.getElementById(`reply-${index}`).value.trim();

    if (replyText !== "") {
        messages[index].reply = replyText;
        localStorage.setItem("supportMessages", JSON.stringify(messages));
        showPopup("Reply sent!");
        loadSupportMessages();
    } else {
        showPopup("Enter a reply before sending.");
    }
}

// DELETE SUPPORT MESSAGE
function deleteMessage(index) {
    let messages = JSON.parse(localStorage.getItem("supportMessages")) || [];
    messages.splice(index, 1);
    localStorage.setItem("supportMessages", JSON.stringify(messages));
    loadSupportMessages();
}

// LOAD TRANSACTIONS (Pending & Completed)
function loadTransactions() {
    let pending = JSON.parse(localStorage.getItem("pendingTransactions")) || [];
    let completed = JSON.parse(localStorage.getItem("completedTransactions")) || [];
    
    const pendingList = document.getElementById("pendingTransactions");
    const completedList = document.getElementById("completedTransactions");

    // Load pending transactions
    if (pending.length === 0) {
        pendingList.innerHTML = "<li>No pending transactions.</li>";
    } else {
        pendingList.innerHTML = "";
        pending.forEach((txn, index) => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>${txn.user}:</strong> ${txn.amount} ${txn.type} 
                            <button onclick="completeTransaction(${index})">Complete</button>`;
            pendingList.appendChild(li);
        });
    }

    // Load completed transactions
    if (completed.length === 0) {
        completedList.innerHTML = "<li>No completed transactions.</li>";
    } else {
        completedList.innerHTML = "";
        completed.forEach(txn => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>${txn.user}:</strong> ${txn.amount} ${txn.type} <span style="color: green;">(Completed)</span>`;
            completedList.appendChild(li);
        });
    }
}

// MARK TRANSACTION AS COMPLETED
function completeTransaction(index) {
    let pending = JSON.parse(localStorage.getItem("pendingTransactions")) || [];
    let completed = JSON.parse(localStorage.getItem("completedTransactions")) || [];

    let transaction = pending.splice(index, 1)[0]; // Remove from pending and move to completed
    completed.push(transaction);

    localStorage.setItem("pendingTransactions", JSON.stringify(pending));
    localStorage.setItem("completedTransactions", JSON.stringify(completed));

    showPopup("Transaction marked as completed!");
    loadTransactions();
}
