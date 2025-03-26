document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    localStorage.setItem("savedEmail", email);
    localStorage.setItem("savedPassword", password);

    alert("Sign-Up Successful!");
    window.location.href = "signin.html";
});

function redirectToLogin() {
    window.location.href = "signin.html";
}
