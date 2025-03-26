document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const bookingDetails = {
        type: params.get("type") || "Travel",
        name: params.get("name") || "Not Specified",
        from: params.get("from") || "Not Specified",
        to: params.get("to") || "Not Specified",
        date: params.get("date") || "Not Specified",
        time: params.get("time") || "Not Specified",
        duration: params.get("duration") || "Not Specified",
        price: params.get("price") || "0",
        meals: params.get("meals") || "No Meal Selected",
        seat: `S-${Math.floor(1 + Math.random() * 40)}`,
        bookingID: `TRP${Math.floor(10000 + Math.random() * 90000)}`
    };
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    document.getElementById("transport-type").textContent = bookingDetails.type;
    document.getElementById("from").textContent = bookingDetails.from;
    document.getElementById("to").textContent = bookingDetails.to;
    document.getElementById("date").textContent = bookingDetails.date;
    document.getElementById("time").textContent = bookingDetails.time;
    document.getElementById("seatNumber").textContent = bookingDetails.seat;
    document.getElementById("price").textContent = bookingDetails.price;
    document.getElementById("meals").textContent = bookingDetails.meals;
    document.getElementById("bookingID").textContent = bookingDetails.bookingID; 
    const payNowButton = document.getElementById("pay-now");
    payNowButton.innerText = `Pay ${bookingDetails.price}`;
    payNowButton.disabled = true; 

    let selectedPaymentMethod = null;
    document.querySelectorAll(".pay-btn").forEach(button => {
        button.addEventListener("click", function () {
            selectedPaymentMethod = this.getAttribute("data-method");
            document.querySelectorAll(".pay-btn").forEach(btn => btn.classList.remove("selected"));
            this.classList.add("selected");
            payNowButton.disabled = false;
        });
    });
    payNowButton.addEventListener("click", function () {
        if (!selectedPaymentMethod) return;
        document.getElementById("confirmation").classList.remove("hidden");
        setTimeout(() => {
            window.location.href = "booking-confirmation.html";
        }, 2000);
    });
});
