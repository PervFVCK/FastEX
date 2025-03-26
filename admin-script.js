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
    const btcRate = document.getElementById("btcRate").value;
    const ethRate = document.getElementById("ethRate").value;
    const usdtRate = document.getElementById("usdtRate").value;
    const amazonRate = document.getElementById("amazonRate").value;
    const steamRate = document.getElementById("steamRate").value;
    const googlePlayRate = document.getElementById("googlePlayRate").value;
    const itunesRate = document.getElementById("itunesRate").value;

    localStorage.setItem("btcRate", btcRate);
    localStorage.setItem("ethRate", ethRate);
    localStorage.setItem("usdtRate", usdtRate);
    localStorage.setItem("amazonRate", amazonRate);
    localStorage.setItem("steamRate", steamRate);
    localStorage.setItem("googlePlayRate", googlePlayRate);
    localStorage.setItem("itunesRate", itunesRate);

    showPopup("Rates updated successfully!");
}

// LOAD RATES ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btcRate").value = localStorage.getItem("btcRate") || "";
    document.getElementById("ethRate").value = localStorage.getItem("ethRate") || "";
    document.getElementById("usdtRate").value = localStorage.getItem("usdtRate") || "";
    document.getElementById("amazonRate").value = localStorage.getItem("amazonRate") || "";
    document.getElementById("steamRate").value = localStorage.getItem("steamRate") || "";
    document.getElementById("googlePlayRate").value = localStorage.getItem("googlePlayRate") || "";
    document.getElementById("itunesRate").value = localStorage.getItem("itunesRate") || "";
});

// CUSTOMER SUPPORT MESSAGES (SIMULATED)
document.addEventListener("DOMContentLoaded", () => {
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
});

function deleteMessage(index) {
    let messages = JSON.parse(localStorage.getItem("supportMessages")) || [];
    messages.splice(index, 1);
    localStorage.setItem("supportMessages", JSON.stringify(messages));
    location.reload();
}
