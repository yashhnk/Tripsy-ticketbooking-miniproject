document.addEventListener("DOMContentLoaded", function () {
    const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));

    if (bookingDetails) {
        document.getElementById("departure").textContent = bookingDetails.from;
        document.getElementById("destination").textContent = bookingDetails.to;
        document.getElementById("date").textContent = bookingDetails.date;
        document.getElementById("time").textContent = bookingDetails.time;
        document.getElementById("seatNumber").textContent = bookingDetails.seat;
        document.getElementById("price").textContent = bookingDetails.price;
        document.getElementById("meals").textContent = bookingDetails.meals;
        document.getElementById("bookingID").textContent = `TRP${Math.floor(10000 + Math.random() * 90000)}`;
    }
});

function downloadTicket() {
    alert("Your ticket is being downloaded!");
}

function goToHome() {
    window.location.href = "homepage.html";
}