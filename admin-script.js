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
    showPopup("Exchange rates updated successfully!");
}

// LOAD RATES ON ADMIN PAGE LOAD
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
            li.innerHTML = `<strong>${msg.name}:</strong> ${msg.message} 
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

document.addEventListener("DOMContentLoaded", loadSupportMessages);
