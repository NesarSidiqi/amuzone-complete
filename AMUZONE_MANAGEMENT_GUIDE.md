# Amuzone Management Guide

## Complete Guide to Managing Your E-Commerce Website & Content

Welcome to Amuzone! This comprehensive guide will help you manage your online store, update products, manage content, and keep your website running smoothly. Whether you're updating product listings, changing prices, or adding new categories, this guide covers everything you need to know.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Managing Products](#managing-products)
4. [Multi-Language Management](#multi-language-management)
5. [Updating Website Content](#updating-website-content)
6. [Customizing Design & Branding](#customizing-design--branding)
7. [Deployment & Going Live](#deployment--going-live)
8. [Maintenance & Troubleshooting](#maintenance--troubleshooting)
9. [Performance Optimization](#performance-optimization)
10. [Security Best Practices](#security-best-practices)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your computer:

- **Node.js 18+** (Download from https://nodejs.org/)
- **pnpm** (Install via: `npm install -g pnpm`) or use npm/yarn
- **Git** (Optional, for version control)
- **A text editor** (VS Code recommended: https://code.visualstudio.com/)

### Initial Setup

1. **Extract the Amuzone project:**
   ```bash
   unzip amuzone-complete.zip
   cd amuzone
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173`

---

## Project Structure

Understanding the folder structure helps you know where to make changes:

```
amuzone/
├── client/                          # Frontend React application
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.tsx            # Homepage
│   │   │   ├── Products.tsx        # Products listing page
│   │   │   ├── ProductDetail.tsx   # Individual product page
│   │   │   ├── Wishlist.tsx        # Wishlist page
│   │   │   └── NotFound.tsx        # 404 page
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.tsx          # Header navigation
│   │   │   ├── Footer.tsx          # Footer
│   │   │   ├── ProductCard.tsx     # Product card component
│   │   │   ├── CartDrawer.tsx      # Shopping cart panel
│   │   │   ├── LanguageSwitcher.tsx # Language toggle
│   │   │   └── ...other components
│   │   ├── contexts/               # Global state management
│   │   │   ├── CartContext.tsx     # Shopping cart state
│   │   │   ├── WishlistContext.tsx # Wishlist state
│   │   │   └── LanguageContext.tsx # Language/i18n state
│   │   ├── lib/
│   │   │   ├── data.ts             # Product data & mock database
│   │   │   ├── i18n.ts             # Translations (English & Dari)
│   │   │   └── utils.ts            # Helper functions
│   │   ├── index.css               # Global styles & design tokens
│   │   └── App.tsx                 # Main app component
│   ├── index.html                  # HTML entry point
│   └── public/                     # Static files
├── server/                         # Express.js backend
├── package.json                    # Dependencies
└── AMUZONE_MANAGEMENT_GUIDE.md     # This file
```

### Key Files to Edit

| File | Purpose | Edit When |
|------|---------|-----------|
| `client/src/lib/data.ts` | Product database | Adding/updating products, categories, reviews |
| `client/src/lib/i18n.ts` | Translations | Updating text in English or Dari |
| `client/src/index.css` | Global styles | Changing colors, fonts, spacing |
| `client/index.html` | HTML metadata | Updating page title, meta tags, favicon |
| `client/src/components/Navbar.tsx` | Header/navigation | Updating store name, categories, links |
| `client/src/components/Footer.tsx` | Footer content | Updating contact info, links, policies |

---

## Managing Products

### Adding New Products

All products are stored in `client/src/lib/data.ts`. Follow these steps to add a new product:

1. **Open the file:**
   ```
   client/src/lib/data.ts
   ```

2. **Find the `products` array** (around line 150)

3. **Add a new product object:**
   ```typescript
   {
     id: "prod-51",  // Unique ID (must be unique)
     name: "Premium Wireless Headphones",
     brand: "AudioPro",
     category: "electronics",
     price: 149.99,
     originalPrice: 199.99,  // Optional: for sale items
     image: "https://cdn.example.com/headphones.jpg",
     images: [
       "https://cdn.example.com/headphones-1.jpg",
       "https://cdn.example.com/headphones-2.jpg",
       "https://cdn.example.com/headphones-3.jpg",
     ],
     description: "High-quality wireless headphones with noise cancellation...",
     rating: 4.8,
     reviewCount: 342,
     inStock: true,
     stockCount: 15,
     badge: "sale",  // Options: "sale", "new", "bestseller", or ""
     isFeatured: true,  // Show on homepage
     features: [
       "Active Noise Cancellation",
       "40-hour battery life",
       "Premium sound quality",
       "Comfortable fit",
     ],
     tags: ["wireless", "headphones", "audio", "premium"],
   }
   ```

4. **Save the file** (Ctrl+S or Cmd+S)

5. **The product will appear immediately** in your development server

### Updating Product Information

To update an existing product:

1. Find the product in `client/src/lib/data.ts` by its `id`
2. Edit the relevant fields (name, price, description, etc.)
3. Save the file
4. Changes appear instantly in the browser

### Updating Product Prices

To change a product's price:

```typescript
// Before
{ id: "prod-1", name: "Laptop", price: 999.99, originalPrice: 1299.99 }

// After (new price with sale badge)
{ id: "prod-1", name: "Laptop", price: 849.99, originalPrice: 999.99, badge: "sale" }
```

### Adding Product Images

Product images must be hosted on a CDN (not local files). To add product images:

1. **Upload images to a CDN** such as:
   - Cloudinary (https://cloudinary.com/)
   - Imgur (https://imgur.com/)
   - AWS S3 (https://aws.amazon.com/s3/)
   - Firebase Storage (https://firebase.google.com/docs/storage)

2. **Copy the image URL** from the CDN

3. **Paste into the `image` or `images` field** in `client/src/lib/data.ts`

Example:
```typescript
image: "https://res.cloudinary.com/your-account/image/upload/v123/product.jpg"
```

### Managing Categories

Categories are defined in `client/src/lib/data.ts`. To add or modify:

```typescript
export const categories = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://cdn.example.com/electronics.jpg",
    productCount: 248,
  },
  // Add more categories here
];
```

### Managing Reviews

Customer reviews are stored in the `reviews` array in `client/src/lib/data.ts`:

```typescript
export const reviews = [
  {
    id: "rev-1",
    productId: "prod-1",
    author: "John Smith",
    avatar: "https://cdn.example.com/avatar-1.jpg",
    rating: 5,
    title: "Excellent product!",
    body: "This product exceeded my expectations...",
    date: "2 weeks ago",
    verified: true,
  },
  // Add more reviews here
];
```

---

## Multi-Language Management

Amuzone supports **English** and **Dari** languages. All text is managed in one file for easy updates.

### Updating Translations

All translations are in `client/src/lib/i18n.ts`. The file contains two language objects: `en` (English) and `fa` (Dari).

**Structure:**
```typescript
export const translations = {
  en: {
    header: {
      storeName: "Amuzone",
      search: "Search products...",
      // ... more English text
    },
  },
  fa: {
    header: {
      storeName: "امازون",
      search: "جستجو برای محصولات...",
      // ... more Dari text
    },
  },
};
```

### Adding New Translations

To add a new translatable text:

1. **Open** `client/src/lib/i18n.ts`

2. **Find the appropriate section** (e.g., `header`, `home`, `products`)

3. **Add the text in both languages:**
   ```typescript
   en: {
     header: {
       newFeature: "New Feature",
       // ... existing text
     },
   },
   fa: {
     header: {
       newFeature: "ویژگی جدید",
       // ... existing text
     },
   },
   ```

4. **Use in your component:**
   ```typescript
   import { useLanguage } from "@/contexts/LanguageContext";
   import { getTranslation } from "@/lib/i18n";

   export default function MyComponent() {
     const { language } = useLanguage();
     const text = getTranslation(language, "header.newFeature");
     return <div>{text}</div>;
   }
   ```

### Switching Languages in the UI

Users can switch languages using the language switcher in the top navigation bar. The selected language is saved to browser storage and persists across sessions.

---

## Updating Website Content

### Changing the Store Name

The store name "Amuzone" appears in multiple places:

1. **In the header logo:**
   - File: `client/src/components/Navbar.tsx` (line ~127)
   - Change: `<span>Amu<span style={{ color: "#E8700A" }}>zone</span></span>`

2. **In translations:**
   - File: `client/src/lib/i18n.ts`
   - Update: `header.storeName` in both `en` and `fa` objects

3. **In page title:**
   - File: `client/index.html` (line 6)
   - Change: `<title>Amuzone - Shop Everything Online</title>`

### Updating Footer Content

Footer content is in `client/src/components/Footer.tsx`:

```typescript
// Update company info
<div>
  <h4>About Amuzone</h4>
  <p>Your text here...</p>
</div>

// Update contact information
<div>
  <h4>Contact Us</h4>
  <p>Email: your-email@amuzone.com</p>
  <p>Phone: +1 (555) 123-4567</p>
</div>

// Update links
<Link href="/about">About Us</Link>
<Link href="/contact">Contact</Link>
```

### Updating Homepage Sections

Homepage content is in `client/src/pages/Home.tsx`. Key sections to update:

| Section | Location | What to Change |
|---------|----------|-----------------|
| Hero Carousel | Lines 100-150 | Headlines, descriptions, CTA buttons |
| Categories | Lines 180-220 | Category names, images, product counts |
| Featured Products | Lines 240-280 | Product selection, display count |
| Promo Banner | Lines 300-330 | Banner image, text, offer details |
| Newsletter | Lines 450-500 | Newsletter title, description, CTA |

---

## Customizing Design & Branding

### Changing Colors

All colors are defined as CSS variables in `client/src/index.css`. Update the `:root` section:

```css
:root {
  /* Primary brand color (currently saffron orange) */
  --primary: #E8700A;
  
  /* Background colors */
  --background: #FAFAF7;  /* Warm white */
  
  /* Text colors */
  --foreground: #1A1A2E;  /* Deep navy */
  
  /* Accent colors */
  --accent: #E8700A;
  
  /* Add more colors as needed */
}
```

### Changing Fonts

Fonts are imported in `client/index.html`:

```html
<!-- Update font imports -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

Then use in CSS:
```css
.font-display {
  font-family: "Playfair Display", serif;
}

.font-body {
  font-family: "Outfit", sans-serif;
}
```

### Changing Spacing & Sizing

Spacing is controlled by Tailwind CSS utility classes. Common values:

- `p-4` = padding of 1rem
- `m-6` = margin of 1.5rem
- `gap-3` = gap of 0.75rem
- `w-full` = width 100%
- `h-64` = height 16rem

To globally change spacing, edit `client/src/index.css` and adjust the spacing scale.

### Updating Logo

To change the logo:

1. **Replace the icon in Navbar:**
   ```typescript
   // File: client/src/components/Navbar.tsx
   <div className="w-8 h-8 rounded-lg bg-[#E8700A] flex items-center justify-center">
     <YourIcon size={16} className="text-white" />
   </div>
   ```

2. **Or use an image:**
   ```typescript
   <img src="https://cdn.example.com/logo.png" alt="Amuzone" className="h-8" />
   ```

---

## Deployment & Going Live

### Deploying to Your Domain (aamuzone.com)

#### Option 1: Vercel (Recommended - Easiest)

1. **Push code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Amuzone setup"
   git remote add origin https://github.com/yourusername/amuzone.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Click "Deploy"

3. **Connect custom domain:**
   - In Vercel dashboard, go to Settings → Domains
   - Add `aamuzone.com`
   - Follow DNS configuration instructions

#### Option 2: Netlify

1. **Push code to GitHub** (same as above)

2. **Connect to Netlify:**
   - Go to https://app.netlify.com/
   - Click "New site from Git"
   - Select your repository
   - Deploy

3. **Connect custom domain:**
   - In Netlify dashboard, go to Domain settings
   - Add `aamuzone.com`
   - Update DNS records

#### Option 3: Self-Hosted (VPS)

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Upload to your server:**
   ```bash
   scp -r dist/ user@your-server.com:/var/www/amuzone/
   ```

3. **Configure Nginx:**
   ```nginx
   server {
     listen 80;
     server_name aamuzone.com www.aamuzone.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
     }
   }
   ```

4. **Start the server:**
   ```bash
   pnpm start
   ```

### Setting Up SSL/HTTPS

- **Vercel/Netlify:** Automatic SSL certificates
- **Self-hosted:** Use Let's Encrypt
  ```bash
  sudo certbot certonly --standalone -d aamuzone.com
  ```

---

## Maintenance & Troubleshooting

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Build fails | Run `pnpm install && pnpm build` |
| Port 3000 already in use | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| Images not loading | Check CDN URLs are valid and accessible |
| Language switcher not working | Ensure `LanguageProvider` wraps your app in `App.tsx` |
| Cart not persisting | Check browser localStorage is enabled |
| Styles look broken | Clear browser cache (Ctrl+Shift+Delete) |

### Checking for Errors

1. **Browser Console:**
   - Press F12 to open Developer Tools
   - Go to "Console" tab
   - Look for red error messages

2. **Terminal Output:**
   - Watch the terminal where you ran `pnpm dev`
   - Look for TypeScript or build errors

3. **Network Tab:**
   - In Developer Tools, go to "Network" tab
   - Check if images/assets are loading (green = success, red = failed)

### Backing Up Your Data

Regularly back up your product data:

```bash
# Create a backup of your data file
cp client/src/lib/data.ts client/src/lib/data.backup.ts

# Or use Git
git add .
git commit -m "Backup before major changes"
git push
```

---

## Performance Optimization

### Improving Load Speed

1. **Optimize images:**
   - Use WebP format when possible
   - Compress images (use tools like TinyPNG)
   - Use CDN for image delivery

2. **Enable caching:**
   - In your web server, set cache headers
   - Browsers will cache static assets

3. **Minify code:**
   - Run `pnpm build` (automatically minifies)
   - Use production build for deployment

4. **Monitor performance:**
   - Use Google PageSpeed Insights: https://pagespeed.web.dev/
   - Use Lighthouse in Chrome DevTools

### Monitoring Website Traffic

Add Google Analytics:

1. **Create Google Analytics account:** https://analytics.google.com/

2. **Get your tracking ID**

3. **Add to `client/index.html`:**
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_ID');
   </script>
   ```

---

## Security Best Practices

### Protecting Your Store

1. **Keep dependencies updated:**
   ```bash
   pnpm update
   ```

2. **Use environment variables for sensitive data:**
   - Create `.env` file (never commit to Git)
   - Add sensitive keys there
   - Access via `import.meta.env.VITE_KEY_NAME`

3. **Enable HTTPS:**
   - Always use SSL/TLS certificates
   - Redirect HTTP to HTTPS

4. **Validate user input:**
   - Never trust user-submitted data
   - Sanitize before displaying

5. **Regular backups:**
   - Back up your code weekly
   - Back up your database daily (if using one)

### Git Security

Add to `.gitignore` (never commit these):
```
.env
.env.local
node_modules/
dist/
.DS_Store
```

---

## Quick Reference: Common Tasks

### Task: Update Product Price
1. Open `client/src/lib/data.ts`
2. Find product by `id`
3. Update `price` field
4. Save file

### Task: Add New Category
1. Open `client/src/lib/data.ts`
2. Find `categories` array
3. Add new category object with `id`, `name`, `image`, `productCount`
4. Save file

### Task: Change Store Color
1. Open `client/src/index.css`
2. Find `:root` section
3. Update `--primary` color value
4. Save file

### Task: Update Dari Translation
1. Open `client/src/lib/i18n.ts`
2. Find `fa:` object
3. Update Dari text
4. Save file

### Task: Deploy to Production
1. Run `pnpm build`
2. Test locally: `pnpm start`
3. Push to GitHub
4. Deploy via Vercel/Netlify or upload to server

---

## Getting Help

### Resources

- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vitejs.dev
- **Node.js:** https://nodejs.org/docs/
- **Git:** https://git-scm.com/doc

### Troubleshooting

If you encounter issues:

1. Check the error message in the terminal or browser console
2. Search for the error on Google
3. Check the relevant documentation
4. Ask on Stack Overflow or GitHub Discussions

---

## Next Steps

Now that you have Amuzone set up, consider these enhancements:

1. **Add Payment Processing:** Integrate Stripe or PayPal for real transactions
2. **User Authentication:** Add login/signup for customer accounts
3. **Real Database:** Connect to MongoDB, PostgreSQL, or Firebase for dynamic data
4. **Email Notifications:** Send order confirmations and shipping updates
5. **Admin Dashboard:** Build an admin panel for managing products without editing code
6. **Analytics:** Track visitor behavior and sales metrics
7. **SEO Optimization:** Improve search engine rankings
8. **Mobile App:** Create iOS/Android apps for your store

---

## Summary

You now have a complete, production-ready e-commerce platform with:

✅ Modern, responsive design  
✅ Multi-language support (English & Dari)  
✅ Product management system  
✅ Shopping cart & wishlist  
✅ Easy customization  
✅ Ready for deployment  

**Happy selling with Amuzone!** 🚀

---

*Last updated: March 2026*  
*For the latest updates and support, visit your project repository.*
