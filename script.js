// CHAT SUPPORT TOGGLE
document.addEventListener("DOMContentLoaded", () => {
    const chatToggle = document.getElementById("chatToggle");
    const chatBox = document.getElementById("chatBox");

    if (chatToggle && chatBox) {
        chatToggle.addEventListener("click", () => {
            chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
        });
    }

    loadExchangeRates();
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

// GIFT CARD UPLOAD CONFIRMATION & SAVE TRANSACTION
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".giftcard-form").forEach(form => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const transaction = {
                type: "Gift Card",
                status: "Pending",
                timestamp: new Date().toISOString()
            };
            saveTransaction(transaction);
            showPopup("Gift card submitted! We'll verify and process your request.");
        });
    });
});

// BANK DETAILS SUBMISSION CONFIRMATION
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".bank-form").forEach(form => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            showPopup("Your bank details have been saved! Payment will be processed soon.");
        });
    });
});

// CHAT MESSAGE FUNCTIONALITY (Stores messages in localStorage)
document.addEventListener("DOMContentLoaded", () => {
    const chatForm = document.getElementById("chatForm");
    const chatMessageInput = document.getElementById("chatMessage");

    if (chatForm) {
        chatForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const message = chatMessageInput.value.trim();
            if (message !== "") {
                saveChatMessage("Customer", message);
                showPopup("Your message has been sent! Expect a response soon.");
                chatMessageInput.value = "";
            } else {
                showPopup("Please enter a message before sending.");
            }
        });
    }
});

// STORE CHAT MESSAGES
function saveChatMessage(sender, message) {
    let messages = JSON.parse(localStorage.getItem("supportMessages")) || [];
    messages.push({ sender, message, timestamp: new Date().toISOString() });
    localStorage.setItem("supportMessages", JSON.stringify(messages));
}

// STORE TRANSACTIONS
function saveTransaction(transaction) {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// LOAD EXCHANGE RATES FROM LOCAL STORAGE
function loadExchangeRates() {
    const rates = JSON.parse(localStorage.getItem("exchangeRates")) || {};

    const rateElements = {
        btcRate: document.getElementById("btcRate"),
        ethRate: document.getElementById("ethRate"),
        usdtRate: document.getElementById("usdtRate"),
        amazonRate: document.getElementById("amazonRate"),
        steamRate: document.getElementById("steamRate"),
        googlePlayRate: document.getElementById("googlePlayRate"),
        itunesRate: document.getElementById("itunesRate")
    };

    Object.keys(rateElements).forEach(key => {
        if (rateElements[key]) {
            rateElements[key].textContent = rates[key] ? `₦${rates[key]}` : "Rate not set";
        }
    });
}

function sendMail() {
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_jp4gq5l", "template_mg9won", parms)
        .then(function(response) {
            alert("Email sent. You will receive a confirmation mail.");
        })
        .catch(function(error) {
            alert("Failed to send email. Please try again.");
            console.error("Error:", error);
        });
}
