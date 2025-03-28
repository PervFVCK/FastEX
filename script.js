
    document.addEventListener("DOMContentLoaded", () => {
    const chatToggle = document.getElementById("chatToggle");
    const chatBox = document.getElementById("chatBox");

    if (chatToggle && chatBox) {
        chatToggle.addEventListener("click", () => {
            chatBox.classList.toggle("hidden");
        });
    }
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
            alert("Message sent successfully! You'll get a response via email.");
        })
        .catch(error => {
            console.error("Error sending email:", error);
            alert("Failed to send message. Please try again.");
        });
}

// Helper function to highlight the error field
function showError(field, message) {
    field.style.border = "2px solid red";  
    field.focus();
    alert(message);
}

/// Function to show the animated pop-up
function showPopup(message, success = true) {
    let popup = document.createElement("div");
    popup.innerText = message;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.padding = "20px";
    popup.style.fontSize = "20px";
    popup.style.color = "#fff";
    popup.style.backgroundColor = success ? "green" : "red";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    popup.style.cursor = "pointer";
    popup.style.zIndex = "1000";
    
    // Close pop-up on click
    popup.onclick = function () {
        document.body.removeChild(popup);
    };

    document.body.appendChild(popup);
}

// Function to send crypto swap email and update SheetDB
function sendCryptoSwap() {
    let name = document.getElementById("cryptoName");
    let email = document.getElementById("cryptoEmail");
    let cryptoType = document.getElementById("cryptoType");
    let amount = document.getElementById("cryptoAmount");
    let bankName = document.getElementById("cryptoBankName");
    let accountNumber = document.getElementById("cryptoAccountNumber");

    [name, email, cryptoType, amount, bankName, accountNumber].forEach(field => field.style.border = "");

    if (!name.value.trim()) return showError(name, "Please enter your name.");
    if (!email.value.trim()) return showError(email, "Please enter your email.");
    if (!cryptoType.value) return showError(cryptoType, "Please select a cryptocurrency.");
    if (!amount.value.trim()) return showError(amount, "Please enter an amount.");
    if (!bankName.value.trim()) return showError(bankName, "Please enter your bank name.");
    if (!accountNumber.value.trim()) return showError(accountNumber, "Please enter your account number.");

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

    // Send email via EmailJS
    emailjs.send("service_7j6gvqq", "template_2y372x7", params)
        .then(response => {
            showPopup("Request Sent! You will receive a confirmation email.", true);
            document.getElementById("cryptoForm").reset();
        })
        .catch(error => {
            showPopup("Error Occurred! Please try again", false);
            console.error("Error sending email:", error);
        });

    // Update Google Sheet via SheetDB
    let sheetData = {
        "Date": new Date().toISOString().split('T')[0],
        "Name": name.value.trim(),
        "Email": email.value.trim(),
        "Crypto Type": cryptoType.value,
        "Amount": amount.value.trim(),
        "Bank Name": bankName.value.trim(),
        "Account Number": accountNumber.value.trim()
    };

    fetch("https://sheetdb.io/api/v1/bzeh6nxauqyqb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetData)
    }).catch(error => console.error("Error updating Google Sheet:", error));
}

// Function to send gift card swap email and update SheetDB
function sendGiftCardSwap() {
    let name = document.getElementById("giftCardName");
    let email = document.getElementById("giftCardEmail");
    let giftCardType = document.getElementById("giftCardType");
    let giftCardValue = document.getElementById("giftCardValue");
    let giftCardCode = document.getElementById("giftCardCode");
    let bankName = document.getElementById("giftCardBankName");
    let accountNumber = document.getElementById("giftCardAccountNumber");

    [name, email, giftCardType, giftCardValue, bankName, accountNumber].forEach(field => field.style.border = "");

    if (!name.value.trim()) return showError(name, "Please enter your name.");
    if (!email.value.trim()) return showError(email, "Please enter your email.");
    if (!giftCardType.value) return showError(giftCardType, "Please select a gift card type.");
    if (!giftCardValue.value.trim()) return showError(giftCardValue, "Please enter the gift card value.");
    if (!bankName.value.trim()) return showError(bankName, "Please enter your bank name.");
    if (!accountNumber.value.trim()) return showError(accountNumber, "Please enter your account number.");

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

    // Send email via EmailJS
    emailjs.send("service_7j6gvqq", "template_2y372x7", params)
        .then(response => {
            showPopup("Request Sent! You will receive a confirmation email.", true);
            document.getElementById("giftCardForm").reset();
        })
        .catch(error => {
            showPopup("Error Occurred! Please try again", false);
            console.error("Error sending email:", error);
        });

    // Update Google Sheet via SheetDB
    let sheetData = {
        "Date": new Date().toISOString().split('T')[0],
        "Name": name.value.trim(),
        "Email": email.value.trim(),
        "Crypto Type": giftCardType.value, // Same column as Crypto Type
        "Amount": giftCardValue.value.trim(),
        "Bank Name": bankName.value.trim(),
        "Account Number": accountNumber.value.trim()
    };

    fetch("https://sheetdb.io/api/v1/bzeh6nxauqyqb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sheetData)
    }).catch(error => console.error("Error updating Google Sheet:", error));
}

// Helper function to highlight the error field
function showError(field, message) {
    field.style.border = "2px solid red";  
    field.focus();
    alert(message);
}
