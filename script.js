// CHAT SUPPORT TOGGLE
document.addEventListener("DOMContentLoaded", () => {
    const chatToggle = document.getElementById("chatToggle");
    const chatBox = document.getElementById("chatBox");

    if (chatToggle && chatBox) {
        chatToggle.addEventListener("click", () => {
            chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
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

// GIFT CARD UPLOAD CONFIRMATION
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".giftcard-form").forEach(form => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
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

// CHAT MESSAGE SENT CONFIRMATION
function sendMessage() {
    const message = document.getElementById("chatMessage").value.trim();
    if (message !== "") {
        showPopup("Your message has been sent! Expect a response soon.");
        document.getElementById("chatMessage").value = "";
    } else {
        showPopup("Please enter a message before sending.");
    }
}

// LOAD EXCHANGE RATES FROM ADMIN PANEL
document.addEventListener("DOMContentLoaded", () => {
    function getRate(key, defaultValue) {
        return localStorage.getItem(key) ? `₦${localStorage.getItem(key)}` : defaultValue;
    }

    document.getElementById("btcRate").textContent = getRate("btcRate", "Rate not set");
    document.getElementById("ethRate").textContent = getRate("ethRate", "Rate not set");
    document.getElementById("usdtRate").textContent = getRate("usdtRate", "Rate not set");
    document.getElementById("amazonRate").textContent = getRate("amazonRate", "Rate not set");
    document.getElementById("steamRate").textContent = getRate("steamRate", "Rate not set");
    document.getElementById("googlePlayRate").textContent = getRate("googlePlayRate", "Rate not set");
    document.getElementById("itunesRate").textContent = getRate("itunesRate", "Rate not set");
});
