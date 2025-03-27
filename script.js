document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("23FmtaZ8HQsRcgUQ_"); // Initialize EmailJS with your public key

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
            sendEmail(form);
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
            sendEmail(form);
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
                sendEmail(chatForm);
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

// EMAILJS FUNCTION
function sendEmail(form) {
    const formData = new FormData(form);
    const emailParams = {};

    formData.forEach((value, key) => {
        emailParams[key] = value;
    });

    emailjs.send("service_7j6gvqq", "template_iebj59i", emailParams)
        .then(response => {
            alert("Your request has been submitted successfully! Check your email for confirmation.");
            form.reset();
        })
        .catch(error => {
            console.error("EmailJS Error:", error);
            alert("An error occurred while sending your request.");
        });
}
