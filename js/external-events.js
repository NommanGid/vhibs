// External Events Page JavaScript

// Sample external events data (in production, this would come from a backend API)
const externalEventsData = [
    {
        id: 1,
        title: "Summer Music Festival",
        brand: "Live Nation",
        type: "music",
        description: "Experience the ultimate summer music festival featuring top artists from around the world. Three days of non-stop music, food, and entertainment.",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
        logo: "https://via.placeholder.com/40",
        location: "Central Park, New York",
        date: "2024-07-15",
        time: "2:00 PM",
        originalPrice: 150,
        discountedPrice: 120,
        category: "music"
    },
    {
        id: 2,
        title: "Contemporary Art Exhibition",
        brand: "MoMA",
        type: "art",
        description: "Explore groundbreaking contemporary art from emerging and established artists. This exclusive exhibition features works never before seen in the US.",
        image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
        logo: "https://via.placeholder.com/40",
        location: "MoMA, New York",
        date: "2024-06-20",
        time: "10:00 AM",
        originalPrice: 45,
        discountedPrice: 36,
        category: "art"
    },
    {
        id: 3,
        title: "Food & Wine Festival",
        brand: "Culinary Events",
        type: "food",
        description: "Indulge in exquisite cuisine from world-renowned chefs paired with premium wines. A culinary journey you won't forget.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
        logo: "https://via.placeholder.com/40",
        location: "Brooklyn Bridge Park",
        date: "2024-08-05",
        time: "12:00 PM",
        originalPrice: 85,
        discountedPrice: 68,
        category: "food"
    },
    {
        id: 4,
        title: "Fashion Week Afterparty",
        brand: "Vogue",
        type: "fashion",
        description: "Join the exclusive afterparty following New York Fashion Week. Network with industry leaders and celebrate in style.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        logo: "https://via.placeholder.com/40",
        location: "The Plaza Hotel",
        date: "2024-09-10",
        time: "9:00 PM",
        originalPrice: 200,
        discountedPrice: 160,
        category: "fashion"
    },
    {
        id: 5,
        title: "Jazz Night Live",
        brand: "Blue Note",
        type: "music",
        description: "An intimate evening of world-class jazz performances featuring Grammy-winning artists in the legendary Blue Note venue.",
        image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800",
        logo: "https://via.placeholder.com/40",
        location: "Blue Note, NYC",
        date: "2024-07-22",
        time: "8:00 PM",
        originalPrice: 75,
        discountedPrice: 60,
        category: "music"
    },
    {
        id: 6,
        title: "Street Art Tour",
        brand: "Urban Arts",
        type: "art",
        description: "Discover the vibrant street art scene with guided tours through Brooklyn's most iconic murals and graffiti spots.",
        image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800",
        logo: "https://via.placeholder.com/40",
        location: "Brooklyn, NY",
        date: "2024-06-30",
        time: "11:00 AM",
        originalPrice: 35,
        discountedPrice: 28,
        category: "art"
    }
];

// DOM Elements
const externalEventsList = document.getElementById('externalEventsList');
const filterButtons = document.querySelectorAll('.filter-btn');
const ticketModal = document.getElementById('ticketModal');
const ticketForm = document.getElementById('ticketForm');
const eventDetails = document.getElementById('eventDetails');
const ticketQuantity = document.getElementById('ticketQuantity');
const totalPrice = document.getElementById('totalPrice');

let selectedEvent = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderEvents(externalEventsData);
    setupFilters();
    setupModal();
    setupTicketForm();
});

// Render events
function renderEvents(events) {
    externalEventsList.innerHTML = '';

    events.forEach(event => {
        const card = createEventCard(event);
        externalEventsList.appendChild(card);
    });
}

// Create event card
function createEventCard(event) {
    const discount = Math.round(((event.originalPrice - event.discountedPrice) / event.originalPrice) * 100);

    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <div class="event-image">
            <img src="${event.image}" alt="${event.title}">
            <span class="event-badge">${event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
            <span class="discount-badge">${discount}% OFF</span>
        </div>
        <div class="event-content">
            <div class="event-header">
                <div class="event-brand">
                    <img src="${event.logo}" alt="${event.brand}">
                    <span>${event.brand}</span>
                </div>
            </div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <div class="event-details">
                <div class="event-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(event.date)}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-clock"></i>
                    <span>${event.time}</span>
                </div>
            </div>
            <div class="event-price">
                <span class="original-price">$${event.originalPrice}</span>
                <span class="discounted-price">$${event.discountedPrice}</span>
            </div>
            <div class="event-actions">
                <button class="buy-btn" onclick="openTicketModal(${event.id})">Buy Tickets</button>
                <button class="info-btn" onclick="showEventInfo(${event.id})">
                    <i class="fas fa-info-circle"></i> More Info
                </button>
            </div>
        </div>
    `;
    return card;
}

// Setup filters
function setupFilters() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter events
            const filter = button.dataset.filter;
            if (filter === 'all') {
                renderEvents(externalEventsData);
            } else {
                const filtered = externalEventsData.filter(event => event.category === filter);
                renderEvents(filtered);
            }
        });
    });
}

// Setup modal
function setupModal() {
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', closeTicketModal);
    window.addEventListener('click', (e) => {
        if (e.target === ticketModal) {
            closeTicketModal();
        }
    });
}

// Setup ticket form
function setupTicketForm() {
    ticketQuantity.addEventListener('change', updateTotalPrice);
    ticketQuantity.addEventListener('input', updateTotalPrice);

    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            eventId: selectedEvent.id,
            quantity: parseInt(ticketQuantity.value),
            name: document.getElementById('buyerName').value,
            email: document.getElementById('buyerEmail').value,
            phone: document.getElementById('buyerPhone').value,
            total: selectedEvent.discountedPrice * parseInt(ticketQuantity.value)
        };

        // In production, this would send data to a backend server
        console.log('Ticket purchase:', formData);

        // Show success message
        alert(`Thank you for purchasing ${formData.quantity} ticket(s) for ${selectedEvent.title}!\n\nTotal: $${formData.total}\n\nA confirmation email will be sent to ${formData.email}.`);

        // Close modal and reset form
        closeTicketModal();
    });
}

// Open ticket modal
function openTicketModal(eventId) {
    selectedEvent = externalEventsData.find(event => event.id === eventId);
    if (selectedEvent) {
        // Populate event details
        eventDetails.innerHTML = `
            <div class="event-detail-row">
                <span>Event:</span>
                <span>${selectedEvent.title}</span>
            </div>
            <div class="event-detail-row">
                <span>Date:</span>
                <span>${formatDate(selectedEvent.date)} at ${selectedEvent.time}</span>
            </div>
            <div class="event-detail-row">
                <span>Location:</span>
                <span>${selectedEvent.location}</span>
            </div>
            <div class="event-detail-row">
                <span>Price per ticket:</span>
                <span>$${selectedEvent.discountedPrice} (20% off)</span>
            </div>
        `;

        // Reset form
        ticketForm.reset();
        ticketQuantity.value = 1;
        updateTotalPrice();

        // Show modal
        ticketModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close ticket modal
function closeTicketModal() {
    ticketModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    ticketForm.reset();
    selectedEvent = null;
}

// Update total price
function updateTotalPrice() {
    if (selectedEvent) {
        const quantity = parseInt(ticketQuantity.value) || 1;
        const total = selectedEvent.discountedPrice * quantity;
        totalPrice.textContent = `$${total.toFixed(2)}`;
    }
}

// Show event info
function showEventInfo(eventId) {
    const event = externalEventsData.find(e => e.id === eventId);
    if (event) {
        alert(`${event.title}\n\n${event.description}\n\nDate: ${formatDate(event.date)}\nTime: ${event.time}\nLocation: ${event.location}\n\nPrice: $${event.discountedPrice} (20% off for VIBE HAUS members)`);
    }
}

// Format date
function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
