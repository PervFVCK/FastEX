// CHAT SUPPORT TOGGLE
const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");

chatToggle.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
});
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

// SWAP SUBMISSION CONFIRMATION
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".swap-form").forEach(form => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            showPopup("Your swap request has been submitted successfully! Wait for confirmation.");
        });
    });
});

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

// ADMIN RATE UPDATE SIMULATION (CAN BE CHANGED MANUALLY)
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('btcRate').textContent = "₦850,000 per BTC";
    document.getElementById('ethRate').textContent = "₦300,000 per ETH";
    document.getElementById('usdtRate').textContent = "₦1,250 per USDT";
    document.getElementById('amazonRate').textContent = "₦72,000 per $100";
    document.getElementById('steamRate').textContent = "₦66,000 per $100";
    document.getElementById('googlePlayRate').textContent = "₦70,000 per $100";
    document.getElementById('itunesRate').textContent = "₦71,000 per $100";
    
    showPopup("Rates updated successfully!");
});
