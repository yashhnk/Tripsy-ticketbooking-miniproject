const { useState, useEffect } = React;

function Testimonials() {
    const reviews = [
        { name: "Ayush", rating: "⭐⭐⭐⭐⭐", comment: "Amazing experience! Highly recommend." },
        { name: "Mrunal", rating: "⭐⭐⭐⭐", comment: "Smooth booking process and great service." },
        { name: "Yash", rating: "⭐⭐⭐⭐⭐", comment: "Best travel website I've used!" },
        { name: "Nikhil", rating: "⭐⭐⭐⭐⭐", comment: "Cheapest price you can get!" }
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        }, 3000); // Auto-cycle every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="testimonial-container">
            <h2>What Our Users Say</h2>
            <div className="testimonial">
                <p>{reviews[index].comment}</p>
                <h3>{reviews[index].name}</h3>
                <span>{reviews[index].rating}</span>
            </div>
            <div className="testimonial-buttons">
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("testimonial-section")).render(<Testimonials />);
