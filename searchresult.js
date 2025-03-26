document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from");
    const to = params.get("to");
    const date = params.get("date");
    const type = params.get("type");

    if (!from || !to || !date) {
        document.getElementById("search-results").innerHTML = "<p>No search details found. Please try again.</p>";
        return;
    }
    const formatText = (text) => text.replace(/\b\w/g, char => char.toUpperCase());

    document.getElementById("search-summary").innerText = 
        `Showing results for: ${formatText(from)} to ${formatText(to)} on ${date}`;
if(type === 'flight') {
    const flights = {
        "chennai-bangalore": [
            { airline: "IndiGo", time: "08:30 AM", duration: "1 hr 30 mins", price: "₹2500", meals: "Yes" },
            { airline: "Air India", time: "11:45 AM", duration: "1 hr 30 mins", price: "₹2700", meals: "Yes"},
            { airline: "SpiceJet", time: "04:15 PM", duration: "1 hr 30 mins", price: "₹2400", meals: "No"}
        ],
        "bangalore-chennai": [
            { airline: "Vistara", time: "07:00 AM", duration: "1 hr 30 mins", price: "₹2600", meals: "Yes"},
            { airline: "IndiGo", time: "12:30 PM", duration: "1 hr 30 mins", price: "₹2500" , meals: "No"},
            { airline: "GoFirst", time: "06:00 PM", duration: "1 hr 30 mins", price: "₹2300" , meals: "No"}
        ],
        "delhi-mumbai": [
            { airline: "IndiGo", time: "09:30 AM", duration: "2 hr 10 mins", price: "₹5000", meals: "Yes"},
            { airline: "SpiceJet", time: "01:15 PM", duration: "2 hr 15 mins", price: "₹5200" , meals: "No"},
            { airline: "Vistara", time: "06:45 PM", duration: "2 hr 5 mins", price: "₹5100" , meals: "Yes"}
        ],
        "mumbai-delhi": [
            { airline: "Air India", time: "07:00 AM", duration: "2 hr 20 mins", price: "₹5300" , meals: "No"},
            { airline: "IndiGo", time: "10:30 AM", duration: "2 hr 15 mins", price: "₹5000" , meals: "Yes"},
            { airline: "GoFirst", time: "04:00 PM", duration: "2 hr 10 mins", price: "₹4900" , meals: "Yes"}
        ],
        "chennai-delhi": [
            { airline: "Air India", time: "06:00 AM", duration: "2 hr 45 mins", price: "₹5500" , meals: "Yes"},
            { airline: "IndiGo", time: "10:30 AM", duration: "2 hr 40 mins", price: "₹5300" , meals: "Yes"},
            { airline: "SpiceJet", time: "03:00 PM", duration: "2 hr 50 mins", price: "₹5400" , meals: "Yes"}
        ],
        "delhi-chennai": [
            { airline: "Vistara", time: "08:00 AM", duration: "2 hr 50 mins", price: "₹5600" , meals: "No"},
            { airline: "GoFirst", time: "01:00 PM", duration: "2 hr 45 mins", price: "₹5500" , meals: "Yes"},
            { airline: "IndiGo", time: "06:30 PM", duration: "2 hr 40 mins", price: "₹5300" , meals: "Yes"}
        ],
        "bangalore-delhi": [
            { airline: "IndiGo", time: "07:30 AM", duration: "2 hr 30 mins", price: "₹5200" , meals: "Yes"},
            { airline: "SpiceJet", time: "12:45 PM", duration: "2 hr 35 mins", price: "₹5400" , meals: "Yes"},
            { airline: "Vistara", time: "05:30 PM", duration: "2 hr 25 mins", price: "₹5100" , meals: "Yes"}
        ],
        "delhi-bangalore": [
            { airline: "Air India", time: "06:15 AM", duration: "2 hr 35 mins", price: "₹5300" , meals: "Yes"},
            { airline: "GoFirst", time: "11:00 AM", duration: "2 hr 40 mins", price: "₹5200" , meals: "Yes"},
            { airline: "IndiGo", time: "04:45 PM", duration: "2 hr 30 mins", price: "₹5000" , meals: "No"}
        ],
        "mumbai-chennai": [
            { airline: "SpiceJet", time: "09:00 AM", duration: "2 hr 10 mins", price: "₹4700" , meals: "Yes"},
            { airline: "Air India", time: "02:00 PM", duration: "2 hr 15 mins", price: "₹4800" , meals: "No"},
            { airline: "IndiGo", time: "07:00 PM", duration: "2 hr 5 mins", price: "₹4600" , meals: "Yes"}
        ],
        "chennai-mumbai": [
            { airline: "GoFirst", time: "08:30 AM", duration: "2 hr 15 mins", price: "₹4900" , meals: "No"},
            { airline: "IndiGo", time: "01:15 PM", duration: "2 hr 10 mins", price: "₹4700" , meals: "Yes"},
            { airline: "Vistara", time: "06:30 PM", duration: "2 hr 20 mins", price: "₹4600" , meals: "No"},
        ],
        "mumbai-bangalore": [
            { airline: "Vistara", time: "07:45 AM", duration: "1 hr 45 mins", price: "₹3200" , meals: "Yes"},
            { airline: "IndiGo", time: "01:00 PM", duration: "1 hr 40 mins", price: "₹3100" , meals: "No"},
            { airline: "GoFirst", time: "05:45 PM", duration: "1 hr 50 mins", price: "₹3000" , meals: "No"}
        ],
        "bangalore-mumbai": [
            { airline: "Air India", time: "06:30 AM", duration: "1 hr 50 mins", price: "₹3300" , meals: "Yes"},
            { airline: "SpiceJet", time: "11:30 AM", duration: "1 hr 45 mins", price: "₹3200" , meals: "No"},
            { airline: "IndiGo", time: "04:30 PM", duration: "1 hr 40 mins", price: "₹3100" , meals: "Yes"}
        ]
    };
    const routeKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const availableFlights = flights[routeKey];

    const resultsContainer = document.getElementById("flight-results");
    resultsContainer.innerHTML = "";

    if (availableFlights) {
        availableFlights.forEach(flight => {
            const flightDiv = document.createElement("div");
            flightDiv.classList.add("flight-card");
            flightDiv.innerHTML = `
                <p><strong>${flight.airline}</strong></p>
                <p>Departure Time: ${flight.time}</p>
                <p>Duration: ${flight.duration}</p>
                <p>Price: ${flight.price}</p>
                <p>Meals Available: ${flight.meals}</p>
                <button onclick="bookNow('${flight.airline}', '${from}', '${to}', '${date}', '${flight.time}', '${flight.duration}', '${flight.price}', '${flight.meals}')">
                    Book Now
                </button>
            `;
            resultsContainer.appendChild(flightDiv);
        });
    } else {
        resultsContainer.innerHTML = "<p>No flights found for the selected route.</p>";
    }
}
else if(type === 'bus') {
    const bus = {
        "chennai-bangalore": [
        { company: "KSRTC Airavat", time: "06:00 AM", duration: "6 hr", price: "₹900", meals: "No" },
        { company: "SRS Travels", time: "08:30 AM", duration: "6 hr 30 mins", price: "₹850", meals: "No" },
        { company: "VRL Travels", time: "10:00 PM", duration: "6 hr 15 mins", price: "₹950", meals: "No" }
    ],
    "bangalore-chennai": [
        { company: "KSRTC Airavat", time: "07:00 AM", duration: "6 hr", price: "₹900", meals: "No" },
        { company: "SRS Travels", time: "02:00 PM", duration: "6 hr 30 mins", price: "₹850", meals: "No" },
        { company: "VRL Travels", time: "11:00 PM", duration: "6 hr 15 mins", price: "₹950", meals: "No" }
    ],
    "delhi-mumbai": [
        { company: "Rajdhani Travels", time: "05:00 PM", duration: "22 hr", price: "₹2200", meals: "No" },
        { company: "Intercity Travels", time: "06:30 PM", duration: "23 hr", price: "₹2100", meals: "No" },
        { company: "Sharma Travels", time: "09:00 PM", duration: "22 hr 30 mins", price: "₹2300", meals: "No" }
    ],
    "mumbai-delhi": [
        { company: "Rajdhani Travels", time: "04:30 PM", duration: "22 hr", price: "₹2200", meals: "No" },
        { company: "Intercity Travels", time: "07:00 PM", duration: "23 hr", price: "₹2100", meals: "No" },
        { company: "Sharma Travels", time: "09:30 PM", duration: "22 hr 30 mins", price: "₹2300", meals: "No" }
    ],
    "chennai-delhi": [
        { company: "KPN Travels", time: "06:00 AM", duration: "34 hr", price: "₹3500", meals: "No" },
        { company: "Parveen Travels", time: "05:30 PM", duration: "35 hr", price: "₹3400", meals: "No" },
        { company: "SRM Travels", time: "08:00 PM", duration: "34 hr 30 mins", price: "₹3600", meals: "No" }
    ],
    "delhi-chennai": [
        { company: "KPN Travels", time: "07:00 AM", duration: "34 hr", price: "₹3500", meals: "No" },
        { company: "Parveen Travels", time: "06:00 PM", duration: "35 hr", price: "₹3400", meals: "No" },
        { company: "SRM Travels", time: "09:00 PM", duration: "34 hr 30 mins", price: "₹3600", meals: "No" }
    ],
    "bangalore-delhi": [
        { company: "SRS Travels", time: "06:30 AM", duration: "38 hr", price: "₹3200", meals: "No" },
        { company: "VRL Travels", time: "07:00 PM", duration: "39 hr", price: "₹3100", meals: "No" },
        { company: "National Travels", time: "10:00 PM", duration: "38 hr 30 mins", price: "₹3300", meals: "No" }
    ],
    "delhi-bangalore": [
        { company: "SRS Travels", time: "07:30 AM", duration: "38 hr", price: "₹3200", meals: "No" },
        { company: "VRL Travels", time: "06:00 PM", duration: "39 hr", price: "₹3100", meals: "No" },
        { company: "National Travels", time: "11:00 PM", duration: "38 hr 30 mins", price: "₹3300", meals: "No" }
    ],
    "mumbai-chennai": [
        { company: "Neeta Travels", time: "09:00 AM", duration: "22 hr", price: "₹2500", meals: "No" },
        { company: "VRL Travels", time: "05:00 PM", duration: "23 hr", price: "₹2400", meals: "No" },
        { company: "KPN Travels", time: "10:30 PM", duration: "22 hr 45 mins", price: "₹2600", meals: "No" }
    ],
    "chennai-mumbai": [
        { company: "Neeta Travels", time: "08:00 AM", duration: "22 hr", price: "₹2500", meals: "No" },
        { company: "VRL Travels", time: "06:00 PM", duration: "23 hr", price: "₹2400", meals: "No" },
        { company: "KPN Travels", time: "11:00 PM", duration: "22 hr 45 mins", price: "₹2600", meals: "No" }
    ],
    "mumbai-bangalore": [
        { company: "SRS Travels", time: "07:30 AM", duration: "15 hr", price: "₹1800", meals: "No" },
        { company: "VRL Travels", time: "06:30 PM", duration: "14 hr 45 mins", price: "₹1750", meals: "No" },
        { company: "National Travels", time: "09:00 PM", duration: "15 hr 30 mins", price: "₹1850", meals: "No" }
    ],
    "bangalore-mumbai": [
        { company: "SRS Travels", time: "07:00 AM", duration: "15 hr", price: "₹1800", meals: "No" },
        { company: "VRL Travels", time: "05:30 PM", duration: "14 hr 45 mins", price: "₹1750", meals: "No" },
        { company: "National Travels", time: "10:00 PM", duration: "15 hr 30 mins", price: "₹1850", meals: "No" }
    ]
    };
    const routeKeyBuses = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const availableBus = bus[routeKeyBuses];

    const resultsContainerBus = document.getElementById("bus-results");
    resultsContainerBus.innerHTML = "";

    if (availableBus) {
        availableBus.forEach(bus => {
            const busDiv = document.createElement("div");
            busDiv.classList.add("bus-card");
            busDiv.innerHTML = `
                <p><strong>${bus.company}</strong></p>
                <p>Departure Time: ${bus.time}</p>
                <p>Duration: ${bus.duration}</p>
                <p>Price: ${bus.price}</p>
                <p>Meals Available: ${bus.meals}</p>
                <button onclick="bookNow('${bus.company}', '${from}', '${to}', '${date}', '${bus.time}', '${bus.duration}', '${bus.price}', '${bus.meals}')">
                    Book Now
                </button>
            `;
            resultsContainerBus.appendChild(busDiv);
        });
    } else {
        resultsContainerBus.innerHTML = "<p>No buses found for the selected route.</p>";
    }
}
else if(type === 'train') {
    const trains = {
        "chennai-bangalore": [
        { operator: "Shatabdi Express", time: "06:00 AM", duration: "5 hr 55 mins", price: "₹1500", meals: "Yes" },
        { operator: "Brindavan Express", time: "07:50 AM", duration: "6 hr 30 mins", price: "₹1200", meals: "No"},
        { operator: "Lalbagh Express", time: "03:30 PM", duration: "6 hr 15 mins", price: "₹1100", meals: "No"}
    ],
    "bangalore-chennai": [
        { operator: "Shatabdi Express", time: "06:00 AM", duration: "5 hr 55 mins", price: "₹1500", meals: "Yes"},
        { operator: "Brindavan Express", time: "02:40 PM", duration: "6 hr 30 mins", price: "₹1200", meals: "No"},
        { operator: "Lalbagh Express", time: "06:20 PM", duration: "6 hr 15 mins", price: "₹1100", meals: "No"}
    ],
    "delhi-mumbai": [
        { operator: "Rajdhani Express", time: "04:25 PM", duration: "15 hr 30 mins", price: "₹3500", meals: "Yes"},
        { operator: "August Kranti Rajdhani", time: "05:15 PM", duration: "16 hr", price: "₹3400", meals: "Yes"},
        { operator: "Mumbai Central Duronto", time: "11:25 PM", duration: "17 hr 10 mins", price: "₹3200", meals: "Yes"}
    ],
    "mumbai-delhi": [
        { operator: "Rajdhani Express", time: "04:35 PM", duration: "15 hr 30 mins", price: "₹3500", meals: "Yes"},
        { operator: "August Kranti Rajdhani", time: "05:40 PM", duration: "16 hr", price: "₹3400", meals: "Yes"},
        { operator: "Mumbai Central Duronto", time: "11:05 PM", duration: "17 hr 10 mins", price: "₹3200", meals: "Yes"}
    ],
    "chennai-delhi": [
        { operator: "Tamil Nadu Express", time: "10:00 PM", duration: "33 hr", price: "₹2800", meals: "No"},
        { operator: "Grand Trunk Express", time: "07:15 PM", duration: "34 hr 10 mins", price: "₹2700", meals: "No"},
        { operator: "Rajdhani Express", time: "06:05 AM", duration: "28 hr", price: "₹3500", meals: "Yes"}
    ],
    "delhi-chennai": [
        { operator: "Tamil Nadu Express", time: "10:30 PM", duration: "33 hr", price: "₹2800", meals: "No"},
        { operator: "Grand Trunk Express", time: "06:40 PM", duration: "34 hr 10 mins", price: "₹2700", meals: "No"},
        { operator: "Rajdhani Express", time: "03:55 PM", duration: "28 hr", price: "₹3500", meals: "Yes"}
    ],
    "bangalore-delhi": [
        { operator: "Karnataka Express", time: "07:20 PM", duration: "40 hr 25 mins", price: "₹3000", meals: "No"},
        { operator: "Rajdhani Express", time: "08:00 PM", duration: "33 hr 10 mins", price: "₹3800", meals: "Yes"},
        { operator: "Duronto Express", time: "11:40 AM", duration: "32 hr 45 mins", price: "₹3500", meals: "Yes"}
    ],
    "delhi-bangalore": [
        { operator: "Karnataka Express", time: "08:20 PM", duration: "40 hr 25 mins", price: "₹3000", meals: "No"},
        { operator: "Rajdhani Express", time: "07:50 PM", duration: "33 hr 10 mins", price: "₹3800", meals: "Yes"},
        { operator: "Duronto Express", time: "11:15 PM", duration: "32 hr 45 mins", price: "₹3500", meals: "Yes"}
    ],
    "mumbai-chennai": [
        { operator: "Chennai Express", time: "08:30 AM", duration: "24 hr 10 mins", price: "₹2500", meals: "No"},
        { operator: "Mumbai Mail", time: "11:45 AM", duration: "26 hr 15 mins", price: "₹2400", meals: "No"},
        { operator: "Chennai Duronto", time: "09:30 PM", duration: "22 hr", price: "₹3200", meals: "Yes"}
    ],
    "chennai-mumbai": [
        { operator: "Chennai Express", time: "01:10 PM", duration: "24 hr 10 mins", price: "₹2500", meals: "No"},
        { operator: "Mumbai Mail", time: "08:10 PM", duration: "26 hr 15 mins", price: "₹2400", meals: "No"},
        { operator: "Chennai Duronto", time: "06:30 AM", duration: "22 hr", price: "₹3200", meals: "Yes"}
    ],
    "mumbai-bangalore": [
        { operator: "Udyan Express", time: "08:10 PM", duration: "22 hr 15 mins", price: "₹2200", meals: "No"},
        { operator: "Karnataka Express", time: "07:20 PM", duration: "20 hr 45 mins", price: "₹2400", meals: "No"},
        { operator: "Mumbai Duronto", time: "11:40 AM", duration: "16 hr 30 mins", price: "₹3000", meals: "Yes"}
    ],
    "bangalore-mumbai": [
        { operator: "Udyan Express", time: "08:20 PM", duration: "22 hr 15 mins", price: "₹2200", meals: "No"},
        { operator: "Karnataka Express", time: "08:20 PM", duration: "20 hr 45 mins", price: "₹2400", meals: "No"},
        { operator: "Mumbai Duronto", time: "11:15 PM", duration: "16 hr 30 mins", price: "₹3000", meals: "Yes"}
    ]   
    };
    const routeKeyTrains = `${from.toLowerCase()}-${to.toLowerCase()}`;
    const availableTrains = trains[routeKeyTrains];

    const resultsContainerTrains = document.getElementById("train-results");
    resultsContainerTrains.innerHTML = "";

    if (availableTrains) {
        availableTrains.forEach(trains => {
            const trainsDiv = document.createElement("div");
            trainsDiv.classList.add("trains-card");
            trainsDiv.innerHTML = `
                <p><strong>${trains.operator}</strong></p>
                <p>Departure Time: ${trains.time}</p>
                <p>Duration: ${trains.duration}</p>
                <p>Price: ${trains.price}</p>
                <p>Meals Available: ${trains.meals}</p>
                <button onclick="bookNow('${trains.operator}', '${from}', '${to}', '${date}', '${trains.time}', '${trains.duration}', '${trains.price}', '${trains.meals}')">
                    Book Now
                </button>
            `;
            resultsContainerTrains.appendChild(trainsDiv);
        });
    } else {
        resultsContainerTrains.innerHTML = "<p>No trains found for the selected route.</p>";
    }
}
});
function bookNow(name, from, to, date, time, duration, price, meals) {
    const url = `payment.html?name=${name}&from=${from}&to=${to}&date=${date}&time=${time}&duration=${duration}&price=${price}&meals=${meals}`;
    window.location.href = url;
}
