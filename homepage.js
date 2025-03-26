
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "signin.html";
}
document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "signin.html"; 
});
document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    document.querySelectorAll("input[type='date']").forEach(dateInput => {
        dateInput.setAttribute("min", formattedDate);
    });

    const track = document.querySelector(".offers-track");
    let currentPosition = 0;
    const speed = 0.8;

    function autoScroll() {
        currentPosition -= speed;
        if (currentPosition <= -track.scrollWidth / 2) {
            currentPosition = 0;
        }
        track.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(autoScroll);
    }

    autoScroll();
});
function searchTransport(type) {
    const from = document.getElementById(`${type}-from`).value.trim();
    const to = document.getElementById(`${type}-to`).value.trim();
    const date = document.getElementById(`${type}-date`).value.trim();

    if (!from || !to || !date) {
        alert("Please fill in all fields.");
        return;
    }
    const formattedFrom = encodeURIComponent(from.toLowerCase());
    const formattedTo = encodeURIComponent(to.toLowerCase());
    const formattedDate = encodeURIComponent(date);
    window.location.href = `searchresult.html?from=${formattedFrom}&to=${formattedTo}&date=${formattedDate}&type=${type}`;
}
function copyCoupon(code) {
    navigator.clipboard.writeText(code).then(() => {
        alert(`Coupon code ${code} copied to clipboard!`);
    }).catch(err => {
        console.error("Failed to copy coupon:", err);
    });
}