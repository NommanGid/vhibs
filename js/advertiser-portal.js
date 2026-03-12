// Advertiser Portal JavaScript

// DOM Elements
const loginSection = document.getElementById('login');
const registerSection = document.getElementById('register');
const dashboardSection = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const campaignModal = document.getElementById('campaignModal');
const campaignForm = document.getElementById('campaignForm');
const campaignsList = document.getElementById('campaignsList');

// Sample campaigns data (in production, this would come from a backend API)
let campaignsData = [
    {
        id: 1,
        name: "Summer Campaign",
        type: "homepage",
        startDate: "2024-06-01",
        endDate: "2024-08-31",
        views: 456789,
        clicks: 18234,
        status: "active"
    },
    {
        id: 2,
        name: "Event Promotion",
        type: "sidebar",
        startDate: "2024-05-15",
        endDate: "2024-06-15",
        views: 234567,
        clicks: 9456,
        status: "active"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupForms();
    setupModal();
    renderCampaigns();
});

// Setup navigation between auth sections
function setupNavigation() {
    // Handle hash changes
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
}

function handleHashChange() {
    const hash = window.location.hash;

    // Hide all sections
    loginSection.classList.add('hidden');
    registerSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');

    // Show appropriate section based on hash
    if (hash === '#register') {
        registerSection.classList.remove('hidden');
    } else if (hash === '#dashboard') {
        dashboardSection.classList.remove('hidden');
        updateDashboard();
    } else {
        loginSection.classList.remove('hidden');
    }
}

// Setup form handlers
function setupForms() {
    // Login form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // In production, this would authenticate with a backend server
        console.log('Login attempt:', { email, password });

        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('advertiserEmail', email);

        // Show dashboard
        window.location.hash = '#dashboard';

        // Show success message
        alert('Welcome back to your advertising dashboard!');
    });

    // Register form
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            companyName: document.getElementById('companyName').value,
            contactPerson: document.getElementById('contactPerson').value,
            email: document.getElementById('registerEmail').value,
            password: document.getElementById('registerPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            phone: document.getElementById('phoneNumber').value
        };

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // In production, this would register with a backend server
        console.log('Registration attempt:', formData);

        // Simulate successful registration
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('advertiserEmail', formData.email);
        localStorage.setItem('advertiserName', formData.companyName);

        // Show dashboard
        window.location.hash = '#dashboard';

        // Show success message
        alert('Registration successful! Welcome to your advertising dashboard.');
    });

    // Campaign form
    campaignForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const campaignData = {
            id: campaignsData.length + 1,
            name: document.getElementById('campaignName').value,
            type: document.getElementById('adSpaceType').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            views: 0,
            clicks: 0,
            status: 'active'
        };

        // Add to campaigns data
        campaignsData.push(campaignData);

        // Re-render campaigns list
        renderCampaigns();

        // Close modal and reset form
        closeCampaignModal();

        // Show success message
        alert('Campaign created successfully!');
    });
}

// Setup modal
function setupModal() {
    const closeBtn = document.querySelector('#campaignModal .close');

    closeBtn.addEventListener('click', closeCampaignModal);

    window.addEventListener('click', (e) => {
        if (e.target === campaignModal) {
            closeCampaignModal();
        }
    });
}

// Open campaign modal
function openCampaignModal() {
    campaignModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close campaign modal
function closeCampaignModal() {
    campaignModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    campaignForm.reset();
}

// Render campaigns
function renderCampaigns() {
    campaignsList.innerHTML = '';

    campaignsData.forEach(campaign => {
        const card = createCampaignCard(campaign);
        campaignsList.appendChild(card);
    });
}

// Create campaign card
function createCampaignCard(campaign) {
    const card = document.createElement('div');
    card.className = 'campaign-card';
    card.innerHTML = `
        <div class="campaign-info">
            <h3>${campaign.name}</h3>
            <div class="campaign-stats">
                <span><i class="fas fa-eye"></i> ${campaign.views.toLocaleString()} views</span>
                <span><i class="fas fa-mouse-pointer"></i> ${campaign.clicks.toLocaleString()} clicks</span>
                <span><i class="fas fa-calendar"></i> ${formatDate(campaign.startDate)} - ${formatDate(campaign.endDate)}</span>
            </div>
        </div>
        <div class="campaign-actions">
            <button class="btn-edit" onclick="editCampaign(${campaign.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn-delete" onclick="deleteCampaign(${campaign.id})">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    return card;
}

// Edit campaign
function editCampaign(campaignId) {
    const campaign = campaignsData.find(c => c.id === campaignId);
    if (campaign) {
        document.getElementById('campaignName').value = campaign.name;
        document.getElementById('adSpaceType').value = campaign.type;
        document.getElementById('startDate').value = campaign.startDate;
        document.getElementById('endDate').value = campaign.endDate;

        // Store the ID for updating
        campaignForm.dataset.editingId = campaignId;

        openCampaignModal();
    }
}

// Delete campaign
function deleteCampaign(campaignId) {
    if (confirm('Are you sure you want to delete this campaign?')) {
        campaignsData = campaignsData.filter(c => c.id !== campaignId);
        renderCampaigns();
        alert('Campaign deleted successfully!');
    }
}

// Update dashboard
function updateDashboard() {
    const advertiserName = localStorage.getItem('advertiserName') || 'Advertiser';
    document.getElementById('advertiserName').textContent = advertiserName;
}

// Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('advertiserEmail');
    localStorage.removeItem('advertiserName');
    window.location.hash = '#login';
    alert('You have been logged out successfully.');
}

// Format date
function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && window.location.hash === '#dashboard') {
        window.location.hash = '#login';
        alert('Please login to access the dashboard.');
    }
}

// Run auth check on page load
checkAuth();
