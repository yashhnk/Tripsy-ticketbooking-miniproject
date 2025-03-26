document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const savedEmail = localStorage.getItem("savedEmail");
    const savedPass = localStorage.getItem("savedPassword")
    const emailInput = document.getElementById("email");
    const passInput = document.getElementById("password");
    if (savedEmail === emailInput.value && savedPass === passInput.value) {
        alert("Login Successful!");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "homepage.html"; 
    } else {
        alert("Please enter valid credentials.");
    }
    if (localStorage.getItem("isLoggedIn") === "true") {
        window.location.href = "homepage.html"
    }
});

function redirectToSignup() {
    window.location.href = "index.html"; 
}