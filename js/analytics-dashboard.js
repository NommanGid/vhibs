// Analytics Dashboard JavaScript

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    setupDateFilter();
});

// Page Views Chart
let pageViewsChart;
let engagementChart;

function initCharts() {
    // Page Views Chart
    const pageViewsCtx = document.getElementById('pageViewsChart').getContext('2d');
    pageViewsChart = new Chart(pageViewsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Page Views',
                data: [65000, 78000, 90000, 81000, 95000, 110000],
                borderColor: '#00d4ff',
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Engagement Chart
    const engagementCtx = document.getElementById('engagementChart').getContext('2d');
    engagementChart = new Chart(engagementCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Clicks',
                data: [2500, 3200, 3800, 3400, 4100, 4800],
                backgroundColor: 'rgba(0, 212, 255, 0.8)',
                borderColor: '#00d4ff',
                borderWidth: 1,
                borderRadius: 5
            }, {
                label: 'Interactions',
                data: [1800, 2400, 2900, 2600, 3200, 3800],
                backgroundColor: 'rgba(46, 213, 115, 0.8)',
                borderColor: '#2ed573',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#fff',
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 15, 35, 0.95)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)'
                    }
                }
            }
        }
    });
}

// Setup date filter
function setupDateFilter() {
    const dateFilter = document.getElementById('dateRange');
    dateFilter.addEventListener('change', (e) => {
        const days = parseInt(e.target.value);
        updateChartsForDateRange(days);
    });
}

// Update charts based on date range
function updateChartsForDateRange(days) {
    // In production, this would fetch real data from a backend API
    // For now, we'll simulate data changes

    const multiplier = days / 30;

    // Update page views chart
    pageViewsChart.data.datasets[0].data = [
        Math.round(65000 * multiplier),
        Math.round(78000 * multiplier),
        Math.round(90000 * multiplier),
        Math.round(81000 * multiplier),
        Math.round(95000 * multiplier),
        Math.round(110000 * multiplier)
    ];
    pageViewsChart.update();

    // Update engagement chart
    engagementChart.data.datasets[0].data = [
        Math.round(2500 * multiplier),
        Math.round(3200 * multiplier),
        Math.round(3800 * multiplier),
        Math.round(3400 * multiplier),
        Math.round(4100 * multiplier),
        Math.round(4800 * multiplier)
    ];
    engagementChart.data.datasets[1].data = [
        Math.round(1800 * multiplier),
        Math.round(2400 * multiplier),
        Math.round(2900 * multiplier),
        Math.round(2600 * multiplier),
        Math.round(3200 * multiplier),
        Math.round(3800 * multiplier)
    ];
    engagementChart.update();
}

// Track page views (this would be integrated with a backend in production)
function trackPageView(pageUrl) {
    // In production, this would send data to a backend API
    console.log('Page view tracked:', pageUrl);

    // Store in localStorage for demo purposes
    const views = JSON.parse(localStorage.getItem('pageViews') || '{}');
    views[pageUrl] = (views[pageUrl] || 0) + 1;
    localStorage.setItem('pageViews', JSON.stringify(views));
}

// Track ad interactions (this would be integrated with a backend in production)
function trackAdInteraction(adId, interactionType) {
    // In production, this would send data to a backend API
    console.log('Ad interaction tracked:', { adId, interactionType });

    // Store in localStorage for demo purposes
    const interactions = JSON.parse(localStorage.getItem('adInteractions') || '{}');
    if (!interactions[adId]) {
        interactions[adId] = { views: 0, clicks: 0 };
    }

    if (interactionType === 'view') {
        interactions[adId].views++;
    } else if (interactionType === 'click') {
        interactions[adId].clicks++;
    }

    localStorage.setItem('adInteractions', JSON.stringify(interactions));
}

// Track user engagement (this would be integrated with a backend in production)
function trackUserEngagement(eventType, elementId) {
    // In production, this would send data to a backend API
    console.log('User engagement tracked:', { eventType, elementId });

    // Store in localStorage for demo purposes
    const engagements = JSON.parse(localStorage.getItem('userEngagements') || '{}');
    if (!engagements[eventType]) {
        engagements[eventType] = {};
    }
    engagements[eventType][elementId] = (engagements[eventType][elementId] || 0) + 1;
    localStorage.setItem('userEngagements', JSON.stringify(engagements));
}

// Initialize tracking on page load
window.addEventListener('load', () => {
    trackPageView(window.location.pathname);
});

// Track clicks on ads
document.addEventListener('click', (e) => {
    const adElement = e.target.closest('[data-ad-id]');
    if (adElement) {
        const adId = adElement.dataset.adId;
        trackAdInteraction(adId, 'click');
    }
});

// Track form submissions
document.addEventListener('submit', (e) => {
    const formId = e.target.id;
    if (formId) {
        trackUserEngagement('form_submission', formId);
    }
});

// Track button clicks
document.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (button && button.id) {
        trackUserEngagement('button_click', button.id);
    }
});
