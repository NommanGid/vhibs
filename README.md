# VIBE HAUS Website

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
