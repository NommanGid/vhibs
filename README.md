# VIBE HAUS - Website Features Documentation

## Overview
VIBE HAUS is a modern event company website designed to serve a creative community by connecting members with brand opportunities, advertising, and events. This document outlines all the features and pages of the website.

## Main Pages

### 1. Home Page (index.html)
The main landing page featuring:
- Hero section with call-to-action buttons
- About section with organization information
- Events section showcasing upcoming internal events
- Gallery section with event photos
- Advertisement section for partner brands
- Ticket purchasing section
- Community registration form

### 2. Opportunities Page (opportunities.html)
A dedicated portal for partner brands to offer internships and collaborations.

**Features:**
- Browse available opportunities (internships, collaborations, jobs)
- Filter opportunities by type
- Apply for opportunities through an application form
- View opportunity details including:
  - Company/Brand name
  - Position title
  - Description
  - Location
  - Duration
  - Application deadline

**How to Use:**
1. Navigate to the Opportunities page
2. Use the filter buttons to find opportunities by type
3. Click "Apply Now" on any opportunity
4. Fill out the application form with your details
5. Submit your application

### 3. Advertiser Portal (advertiser-portal.html)
A secure portal for businesses to manage their advertising campaigns.

**Features:**
- Login/Registration for advertisers
- Dashboard with campaign analytics
- Create and manage advertising campaigns
- View available ad spaces and pricing
- Track ad performance (views, clicks, engagement)

**How to Use:**
1. Click "Advertise" in the navigation menu
2. Register a new advertiser account or login
3. Access your dashboard to:
   - View analytics for your campaigns
   - Create new advertising campaigns
   - Manage existing campaigns
   - Request ad space

### 4. Analytics Dashboard (analytics-dashboard.html)
Comprehensive analytics tracking for administrators.

**Features:**
- Track page views across the website
- Monitor user interactions
- View advertisement performance metrics
- Analyze top-performing pages
- Filter data by date range (7, 30, 90, 365 days)
- Visual charts for:
  - Page views over time
  - User engagement trends

**Metrics Tracked:**
- Total page views
- Unique visitors
- Ad clicks
- Engagement rate
- Click-through rate (CTR)
- Top performing pages

### 5. External Events Page (external-events.html)
Platform for hosting third-party brand events with ticket purchasing.

**Features:**
- Browse external events from partner brands
- Filter events by category (Music, Art, Food, Fashion)
- View event details including:
  - Event name and description
  - Brand/organizer information
  - Date, time, and location
  - Original and discounted prices
- Purchase tickets directly through the platform
- VIBE HAUS members receive 20% discount

**How to Use:**
1. Navigate to External Events page
2. Filter events by category if desired
3. Click "Buy Tickets" on any event
4. Select the number of tickets
5. Fill in your contact information
6. Complete the purchase

## Navigation Structure

The website navigation includes:
- **About**: Information about VIBE HAUS
- **Events**: Internal VIBE HAUS events
- **External Events**: Partner brand events
- **Gallery**: Photo gallery from past events
- **Advertise**: Information about advertising opportunities
- **Opportunities**: Internships and collaborations
- **Analytics**: Dashboard for viewing analytics
- **Join Community**: Registration form

## Key Features Implementation

### 1. Opportunities & Internship Portal
✅ Fully implemented in `opportunities.html`
- Dedicated section for partner brands
- Browse and register for opportunities
- Application form with resume upload

### 2. Front-Page Advertising Space
✅ Implemented in `index.html` (lines 149-172)
- Blog-style promotional area
- Placeholder for brand advertisements
- Links to advertiser portal

### 3. Analytics Tracking
✅ Fully implemented in `analytics-dashboard.html`
- Backend statistics tracking
- Page views and user interactions
- Advertisement performance metrics
- Data for pitching to sponsors

### 4. Advertiser Portal
✅ Fully implemented in `advertiser-portal.html`
- Secure login/registration
- Campaign management dashboard
- Request advertising space
- View campaign performance

### 5. Internal Events Management
✅ Implemented in `index.html` (lines 80-129)
- Promote internal events
- Registration forms
- Ticket purchasing capabilities

### 6. External Events Hosting
✅ Fully implemented in `external-events.html`
- Host third-party brand events
- Ticket purchasing with discounts
- Event filtering by category

### 7. About Section
✅ Implemented in `index.html` (lines 50-78)
- Organization concept and goals
- Statistics and achievements
- Text-based information

## File Structure

```
vhibs/
├── index.html                          # Main landing page
├── opportunities.html                   # Opportunities & Internships portal
├── advertiser-portal.html              # Advertiser dashboard
├── analytics-dashboard.html            # Analytics tracking dashboard
├── external-events.html                # External events page
├── css/
│   ├── style.css                       # Main stylesheet
│   ├── opportunities.css               # Opportunities page styles
│   ├── advertiser-portal.css          # Advertiser portal styles
│   ├── analytics-dashboard.css         # Analytics dashboard styles
│   └── external-events.css             # External events page styles
├── js/
│   ├── script.js                       # Main JavaScript file
│   ├── opportunities.js                # Opportunities page functionality
│   ├── advertiser-portal.js           # Advertiser portal functionality
│   ├── analytics-dashboard.js          # Analytics dashboard functionality
│   └── external-events.js             # External events page functionality
├── images/                             # Event and gallery images
└── README.md                           # This documentation file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Running the Website

1. **Using npm (Recommended for Development):**
   ```bash
   npm install
   npm start
   ```
   This will start a local server at http://localhost:8080

2. **Using Live Server:**
   ```bash
   npm run dev
   ```
   This will start live-server with hot reload at http://localhost:8080

3. **Direct File Access:**
   Simply open `index.html` in your web browser

## Customization

### Adding New Opportunities
Edit `js/opportunities.js` and add new opportunities to the `opportunitiesData` array.

### Adding New External Events
Edit `js/external-events.js` and add new events to the `externalEventsData` array.

### Modifying Analytics Data
In production, analytics data will be fetched from a backend API. For demo purposes, data is currently hardcoded in `js/analytics-dashboard.js`.

### Styling
All styles are organized in the `css/` directory. Modify the respective CSS files to customize the appearance of each page.

## Future Enhancements

### Backend Integration
The website is currently set up for frontend demonstration. For full functionality, you'll need to integrate:

1. **Database System**
   - User authentication and management
   - Store opportunities and applications
   - Track analytics data
   - Manage campaigns and advertisements

2. **API Endpoints**
   - RESTful API for data operations
   - Authentication endpoints
   - Analytics data retrieval

3. **Payment Gateway**
   - Integrate payment processing for ticket purchases
   - Secure transaction handling

4. **Email Notifications**
   - Send confirmation emails
   - Notify users about new opportunities
   - Campaign updates for advertisers

## Support

For questions or issues, please contact the VIBE HAUS development team.

## License

Copyright © 2024 VIBE HAUS. All rights reserved. Website

A modern, vibrant website for VIBE HAUS event company.

## Features

- 🎉 **Events Section**: Display upcoming events with ticket purchase options
- 📸 **Gallery**: Showcase photos from past events
- 🎯 **Advertisement Space**: Dedicated area for promotional content
- 👥 **Community Registration**: Form for users to join the community
- 📱 **Snapchat Lens Integration**: Direct link to VIBE HAUS Snapchat lens
- 💳 **Ticket Purchase**: Multiple ticket tiers with pricing
- 📱 **Responsive Design**: Works seamlessly on all devices

## Getting Started

1. Make sure you have XAMPP installed and running
2. Place this project in your XAMPP htdocs directory (already done at `c:\xampp\htdocs\projects\vhibs`)
3. Access the website by opening your browser and navigating to: `http://localhost/projects/vhibs`

## File Structure

```
vhibs/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Stylesheet
├── js/
│   └── script.js      # JavaScript functionality
├── images/            # Add your event images here
├── THE VIBE HAUS LOGO.png  # Company logo
└── README.md          # This file
```

## Customization

### Adding Images

1. Create an `images` folder in the project root
2. Add your event photos and other images
3. Update the image paths in the HTML and CSS files

### Updating Events

Edit the events section in `index.html` to update:
- Event dates
- Event names
- Locations
- Times
- Ticket links

### Modifying Colors

Update the CSS variables in `css/style.css`:

```css
:root {
    --primary: #6366f1;      /* Primary color */
    --secondary: #8b5cf6;    /* Secondary color */
    --accent: #ec4899;       /* Accent color */
    --dark: #0f0f23;         /* Dark background */
    --light: #f8fafc;        /* Light text */
}
```

### Snapchat Lens

Update the Snapchat lens link in `index.html`:
```html
<a href="YOUR_SNAP_LENS_URL" target="_blank">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

The website is optimized for:
- Fast loading times
- Smooth animations
- Responsive design
- SEO-friendly structure

## Support

For questions or issues, please contact the VIBE HAUS team.

---

© VIBE HAUS. All rights reserved.
