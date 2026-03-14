# ShopWave – Deployment & Setup Guide

## Overview
ShopWave is a modern, fully-functional e-commerce website built with React 19, Tailwind CSS 4, and Vite. This guide covers how to deploy it to your own domain.

## Project Structure
```
shopwave/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components (Home, Products, ProductDetail, Wishlist)
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Cart, Wishlist)
│   │   ├── lib/           # Utilities and mock data
│   │   ├── index.css      # Global styles with design tokens
│   │   └── App.tsx        # Main app with routing
│   ├── index.html         # HTML entry point
│   └── public/            # Static assets
├── server/                # Express server (for production)
├── package.json           # Dependencies
└── pnpm-lock.yaml        # Lock file
```

## Prerequisites
- Node.js 18+ (or 22+)
- pnpm (or npm/yarn)
- A domain name (or use a hosting service)

## Installation & Setup

### 1. Extract the ZIP file
```bash
unzip shopwave-complete.zip
cd shopwave
```

### 2. Install dependencies
```bash
pnpm install
# or: npm install
```

### 3. Development Mode
```bash
pnpm dev
# Server runs at http://localhost:5173
```

### 4. Build for Production
```bash
pnpm build
# Creates optimized dist/ folder
```

### 5. Start Production Server
```bash
pnpm start
# Runs on http://localhost:3000
```

## Deployment Options

### Option A: Vercel (Recommended for Static)
1. Push code to GitHub
2. Connect to Vercel: https://vercel.com/new
3. Select the repository
4. Deploy (automatic)

### Option B: Netlify
1. Push code to GitHub
2. Connect to Netlify: https://app.netlify.com/
3. Select repository and deploy

### Option C: Self-Hosted (VPS/Dedicated Server)
1. SSH into your server
2. Clone the repository: `git clone <your-repo-url>`
3. Install Node.js and pnpm
4. Run:
   ```bash
   pnpm install
   pnpm build
   pnpm start
   ```
5. Use PM2 or systemd to keep the process running
6. Set up Nginx as a reverse proxy pointing to localhost:3000
7. Configure SSL with Let's Encrypt

### Option D: Docker
Create a `Dockerfile`:
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

Build and run:
```bash
docker build -t shopwave .
docker run -p 3000:3000 shopwave
```

## Customization

### Update Site Title & Branding
Edit `client/index.html`:
```html
<title>Your Store Name</title>
```

### Change Colors
Edit `client/src/index.css` to modify the color palette:
```css
:root {
  --primary: #E8700A;  /* Saffron Orange */
  --background: #FAFAF7;  /* Warm White */
  /* ... more colors ... */
}
```

### Update Product Data
Edit `client/src/lib/data.ts` to add/modify products, categories, and reviews.

### Modify Navigation Links
Edit `client/src/components/Navbar.tsx` to update category links and navigation items.

## Environment Variables
Currently, this is a static frontend with no backend. If you need to add backend features:
- Create a `.env` file in the root
- Add variables like `VITE_API_URL=https://your-api.com`
- Access in code via `import.meta.env.VITE_API_URL`

## Performance Optimization
- Images are hosted on CDN (not local) to prevent deployment timeouts
- Tailwind CSS is purged for production
- Code splitting is automatic with Vite
- Consider adding a CDN (CloudFlare, Cloudfront) for faster image delivery

## Troubleshooting

### Build fails
```bash
pnpm install
pnpm build
```

### Port already in use
```bash
lsof -ti:3000 | xargs kill -9
```

### Images not loading
- Ensure image URLs in `client/src/lib/data.ts` are valid
- Check that CDN URLs are accessible
- Update image paths if migrating to a new CDN

## Next Steps
1. **Add Authentication** — Integrate user login/signup
2. **Connect to a Real Database** — Replace mock data with actual product database
3. **Add Payment Processing** — Integrate Stripe or PayPal
4. **Set Up Analytics** — Add Google Analytics or Mixpanel
5. **Implement Search** — Add Algolia or Elasticsearch for better search

## Support & Resources
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Vite: https://vitejs.dev
- shadcn/ui: https://ui.shadcn.com

---

**Happy selling with ShopWave!** 🚀
