// Admin Dashboard JavaScript

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.admin-section');
    const pageTitle = document.querySelector('.page-title');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.admin-sidebar');

    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link and corresponding section
            this.classList.add('active');
            document.getElementById(sectionId).classList.add('active');

            // Update page title
            pageTitle.textContent = this.querySelector('span').textContent;

            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Sidebar toggle for mobile
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    // Form submissions
    const pageForm = document.getElementById('pageForm');
    if (pageForm) {
        pageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle page creation
            alert('Page created successfully!');
            this.closest('.modal').style.display = 'none';
        });
    }

    // Action buttons
    const actionButtons = document.querySelectorAll('.btn-action');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('delete')) {
                if (confirm('Are you sure you want to delete this item?')) {
                    // Handle delete action
                    alert('Item deleted successfully!');
                }
            } else if (this.classList.contains('edit')) {
                // Handle edit action
                alert('Edit functionality would open here');
            } else if (this.classList.contains('view')) {
                // Handle view action
                const row = this.closest('tr');
                const url = row.querySelector('td:nth-child(2)').textContent;
                window.open('../' + url, '_blank');
            }
        });
    });

    // Settings forms
    const settingsForms = document.querySelectorAll('.settings-form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Settings saved successfully!');
        });
    });

    // Initialize tooltips
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Simple tooltip implementation
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('title');
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';

            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
});

// Modal open functions
function openPageModal() {
    const modal = document.getElementById('pageModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function openEventModal() {
    alert('Event modal would open here');
}

function openOpportunityModal() {
    alert('Opportunity modal would open here');
}

function openAdModal() {
    alert('Advertisement modal would open here');
}

function openUserModal() {
    alert('User modal would open here');
}

// Dynamic stats update (simulated)
function updateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const currentValue = parseInt(stat.textContent.replace(/,/g, ''));
        const change = Math.floor(Math.random() * 100) - 50;
        const newValue = currentValue + change;
        stat.textContent = newValue.toLocaleString();
    });
}

// Update stats every 30 seconds
setInterval(updateStats, 30000);

// Responsive sidebar handling
function handleResize() {
    const sidebar = document.querySelector('.admin-sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
    }
}

window.addEventListener('resize', handleResize);
