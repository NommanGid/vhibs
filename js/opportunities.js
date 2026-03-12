// Opportunities Page JavaScript

// Sample opportunities data (in production, this would come from a backend API)
const opportunitiesData = [
    {
        id: 1,
        title: "Marketing Intern",
        brand: "Cowbell",
        type: "internship",
        description: "Join our dynamic marketing team and gain hands-on experience in digital marketing, social media management, and brand campaigns. Perfect for students passionate about creative marketing.",
        location: "Remote",
        duration: "3 months",
        deadline: "2024-02-15",
        logo: "https://via.placeholder.com/40"
    },
    {
        id: 2,
        title: "Creative Content Creator",
        brand: "VIBE HAUS",
        type: "collaboration",
        description: "We're looking for talented content creators to collaborate on our upcoming events and campaigns. Create engaging content that captures the energy and excitement of our community.",
        location: "On-site",
        duration: "Ongoing",
        deadline: "2024-02-28",
        logo: "https://via.placeholder.com/40"
    },
    {
        id: 3,
        title: "Event Coordinator",
        brand: "Nightlife Events",
        type: "job",
        description: "Join our team as an Event Coordinator and help organize amazing nightlife experiences. Must have experience in event planning and excellent organizational skills.",
        location: "New York",
        duration: "Full-time",
        deadline: "2024-03-01",
        logo: "https://via.placeholder.com/40"
    },
    {
        id: 4,
        title: "Social Media Manager",
        brand: "Cowbell",
        type: "job",
        description: "Lead our social media strategy and create engaging content across multiple platforms. Experience with social media analytics and content creation required.",
        location: "Remote",
        duration: "Full-time",
        deadline: "2024-02-20",
        logo: "https://via.placeholder.com/40"
    },
    {
        id: 5,
        title: "Brand Ambassador",
        brand: "VIBE HAUS",
        type: "collaboration",
        description: "Represent VIBE HAUS at events and in the community. Perfect for outgoing individuals who love connecting with people and promoting our brand.",
        location: "Multiple Locations",
        duration: "Part-time",
        deadline: "2024-03-15",
        logo: "https://via.placeholder.com/40"
    }
];

// DOM Elements
const opportunitiesList = document.getElementById('opportunitiesList');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('applicationModal');
const applicationForm = document.getElementById('applicationForm');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderOpportunities(opportunitiesData);
    setupFilters();
    setupModal();
});

// Render opportunities
function renderOpportunities(opportunities) {
    opportunitiesList.innerHTML = '';

    opportunities.forEach(opportunity => {
        const card = createOpportunityCard(opportunity);
        opportunitiesList.appendChild(card);
    });
}

// Create opportunity card
function createOpportunityCard(opportunity) {
    const card = document.createElement('div');
    card.className = 'opportunity-card';
    card.innerHTML = `
        <div class="opportunity-content">
            <div class="opportunity-header">
                <span class="opportunity-type ${opportunity.type}">${opportunity.type}</span>
                <div class="opportunity-brand">
                    <img src="${opportunity.logo}" alt="${opportunity.brand}">
                    <span>${opportunity.brand}</span>
                </div>
            </div>
            <h3 class="opportunity-title">${opportunity.title}</h3>
            <p class="opportunity-description">${opportunity.description}</p>
            <div class="opportunity-details">
                <span><i class="fas fa-map-marker-alt"></i> ${opportunity.location}</span>
                <span><i class="fas fa-clock"></i> ${opportunity.duration}</span>
            </div>
        </div>
        <div class="opportunity-actions">
            <button class="apply-btn" onclick="openApplicationModal(${opportunity.id})">Apply Now</button>
            <span class="deadline">Deadline: ${formatDate(opportunity.deadline)}</span>
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

            // Filter opportunities
            const filter = button.dataset.filter;
            if (filter === 'all') {
                renderOpportunities(opportunitiesData);
            } else {
                const filtered = opportunitiesData.filter(opp => opp.type === filter);
                renderOpportunities(filtered);
            }
        });
    });
}

// Setup modal
function setupModal() {
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Open application modal
function openApplicationModal(opportunityId) {
    const opportunity = opportunitiesData.find(opp => opp.id === opportunityId);
    if (opportunity) {
        document.getElementById('opportunityId').value = opportunityId;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    applicationForm.reset();
}

// Format date
function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Handle form submission
applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        opportunityId: document.getElementById('opportunityId').value,
        name: document.getElementById('applicantName').value,
        email: document.getElementById('applicantEmail').value,
        phone: document.getElementById('applicantPhone').value,
        coverLetter: document.getElementById('coverLetter').value,
        resume: document.getElementById('resume').files[0]
    };

    // In production, this would send data to a backend server
    console.log('Application submitted:', formData);

    // Show success message
    alert('Thank you for your application! We will review it and get back to you soon.');

    // Close modal and reset form
    closeModal();
});
