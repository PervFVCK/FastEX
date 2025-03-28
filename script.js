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
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    // Validate fields
    if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields.");
        return; // Stop function if validation fails
    }

    // Validate email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    let params = { name, email, message };

    emailjs.send("service_7j6gvqq", "template_2hs3cki", params)
        .then(response => {
            console.log("Email sent:", response);
            alert("Email sent successfully!");
        })
        .catch(error => {
            console.error("Error sending email:", error);
            alert("Failed to send email. Please try again.");
        });
}

    function showNotification(message, isSuccess = true) {
    let notification = document.getElementById("notification");
    let notificationText = document.getElementById("notification-text");

    notificationText.textContent = message;
    notification.style.backgroundColor = isSuccess ? "#28a745" : "#dc3545"; // Green for success, Red for failure
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000); // Hide after 3 seconds
}

function sendCryptoSwap() {
    let name = document.getElementById("cryptoName");
    let email = document.getElementById("cryptoEmail");
    let cryptoType = document.getElementById("cryptoType");
    let amount = document.getElementById("cryptoAmount");
    let bankName = document.getElementById("cryptoBankName");
    let accountNumber = document.getElementById("cryptoAccountNumber");

    // Reset previous error styles
    [name, email, cryptoType, amount, bankName, accountNumber].forEach(field => field.style.border = "");

    // Validate required fields
    if (!name.value.trim()) return showError(name, "Please enter your name.");
    if (!email.value.trim()) return showError(email, "Please enter your email.");
    if (!cryptoType.value) return showError(cryptoType, "Please select a cryptocurrency.");
    if (!amount.value.trim()) return showError(amount, "Please enter an amount.");
    if (!bankName.value.trim()) return showError(bankName, "Please enter your bank name.");
    if (!accountNumber.value.trim()) return showError(accountNumber, "Please enter your account number.");

    // Validate email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) return showError(email, "Please enter a valid email address.");

    let params = {
        name: name.value.trim(),
        email: email.value.trim(),
        cryptoType: cryptoType.value,
        amount: amount.value.trim(),
        bankName: bankName.value.trim(),
        accountNumber: accountNumber.value.trim()
    };

    emailjs.send("service_7j6gvqq", "template_2y372x7", params)
        .then(response => {
            console.log("Email sent:", response);
            showNotification("Email sent successfully!");
            document.getElementById("cryptoForm").reset();
        })
        .catch(error => {
            console.error("Error sending email:", error);
            showNotification("Failed to send email. Please try again.", false);
        });
}

function sendGiftCardSwap() {
    let name = document.getElementById("giftCardName");
    let email = document.getElementById("giftCardEmail");
    let giftCardType = document.getElementById("giftCardType");
    let giftCardValue = document.getElementById("giftCardValue");
    let giftCardCode = document.getElementById("giftCardCode");
    let bankName = document.getElementById("giftCardBankName");
    let accountNumber = document.getElementById("giftCardAccountNumber");

    // Reset previous error styles
    [name, email, giftCardType, giftCardValue, bankName, accountNumber].forEach(field => field.style.border = "");

    // Validate required fields
    if (!name.value.trim()) return showError(name, "Please enter your name.");
    if (!email.value.trim()) return showError(email, "Please enter your email.");
    if (!giftCardType.value) return showError(giftCardType, "Please select a gift card type.");
    if (!giftCardValue.value.trim()) return showError(giftCardValue, "Please enter the gift card value.");
    if (!bankName.value.trim()) return showError(bankName, "Please enter your bank name.");
    if (!accountNumber.value.trim()) return showError(accountNumber, "Please enter your account number.");

    // Validate email format
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) return showError(email, "Please enter a valid email address.");

    let params = {
        name: name.value.trim(),
        email: email.value.trim(),
        giftCardType: giftCardType.value,
        giftCardValue: giftCardValue.value.trim(),
        giftCardCode: giftCardCode.value.trim(),
        bankName: bankName.value.trim(),
        accountNumber: accountNumber.value.trim()
    };

    emailjs.send("service_7j6gvqq", "template_2y372x7", params)
        .then(response => {
            console.log("Email sent:", response);
            showNotification("Email sent successfully!");
            document.getElementById("giftCardForm").reset();
        })
        .catch(error => {
            console.error("Error sending email:", error);
            showNotification("Failed to send email. Please try again.", false);
        });
}

// Helper function to highlight the error field and show animated message
function showError(field, message) {
    field.style.border = "2px solid red";  // Highlight field in red
    field.focus();
    showNotification(message, false);
}
