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

function sendCryptoSwap() {
        let isValid = validateForm("cryptoForm");
        if (!isValid) return;

        let parms = {
            name: document.getElementById("cryptoName").value,
            email: document.getElementById("cryptoEmail").value,
            cryptoType: document.getElementById("cryptoType").value,
            amount: document.getElementById("cryptoAmount").value,
            bankName: document.getElementById("cryptoBankName").value,
            accountNumber: document.getElementById("cryptoAccountNumber").value
        };

        emailjs.send("service_7j6gvqq", "template_2y372x7", parms)
            .then(function(response) {
                alert("Crypto swap request sent successfully! You will receive a confirmation email.");
                document.getElementById("cryptoForm").reset();
                clearErrors("cryptoForm");
            })
            .catch(function(error) {
                alert("Failed to send request. Please try again.");
                console.error("Error:", error);
            });
    }

    function sendGiftCardSwap() {
        let isValid = validateForm("giftCardForm");
        if (!isValid) return;

        let parms = {
            name: document.getElementById("giftCardName").value,
            email: document.getElementById("giftCardEmail").value,
            giftCardType: document.getElementById("giftCardType").value,
            giftCardValue: document.getElementById("giftCardValue").value,
            giftCardCode: document.getElementById("giftCardCode").value,
            bankName: document.getElementById("giftCardBankName").value,
            accountNumber: document.getElementById("giftCardAccountNumber").value
        };

        emailjs.send("service_7j6gvqq", "template_2y372x7", parms)
            .then(function(response) {
                alert("Gift card swap request sent successfully! You will receive a confirmation email.");
                document.getElementById("giftCardForm").reset();
                clearErrors("giftCardForm");
            })
            .catch(function(error) {
                alert("Failed to send request. Please try again.");
                console.error("Error:", error);
            });
    }

    // Form validation function
    function validateForm(formId) {
        let form = document.getElementById(formId);
        let inputs = form.getElementsByTagName("input");
        let isValid = true;

        clearErrors(formId);

        for (let input of inputs) {
            if (input.hasAttribute("required") && !input.value.trim()) {
                showError(input, "This field is required");
                isValid = false;
            }
            if (input.type === "email" && !validateEmail(input.value)) {
                showError(input, "Enter a valid email");
                isValid = false;
            }
        }

        return isValid;
    }

    // Function to validate email format
    function validateEmail(email) {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Function to show error message near the field
    function showError(input, message) {
        let error = document.createElement("span");
        error.className = "error-message";
        error.style.color = "red";
        error.style.fontSize = "12px";
        error.innerText = message;
        input.parentNode.appendChild(error);
    }

    // Function to clear previous error messages
    function clearErrors(formId) {
        let form = document.getElementById(formId);
        let errors = form.getElementsByClassName("error-message");
        while (errors.length > 0) {
            errors[0].parentNode.removeChild(errors[0]);
        }
    }
