// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Chat Box Toggle
document.getElementById("chatToggle").addEventListener("click", function() {
    let chatBox = document.getElementById("chatBox");
    chatBox.classList.toggle("hidden");
});
