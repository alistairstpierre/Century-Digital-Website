# Century Digital Website

A sleek, modern website for Century Digital - Premium Annuity Lead Generation for Independent Producers and Financial Advisors.

Built with [Astro](https://astro.build), featuring a dark navy blue and black theme with smooth animations.

## Project Structure

```
/
├── public/                 # Static assets (favicons, images, etc.)
├── src/
│   ├── components/         # Reusable Astro components
│   │   ├── Navigation.astro    # Main site navigation with mobile menu
│   │   ├── Hero.astro          # Hero section with animated headline
│   │   ├── Testimonials.astro  # Social proof section
│   │   ├── Features.astro      # Services/features section
│   │   ├── About.astro         # About section with industry language
│   │   ├── FAQ.astro           # Frequently asked questions
│   │   └── Footer.astro        # Site footer with contact info
│   ├── data/               # Shared data and schema
│   │   └── schema.ts           # Schema.org JSON-LD (Organization, WebSite, FAQPage)
│   ├── layouts/            # Page layouts
│   │   └── Layout.astro        # Base layout with HTML structure
│   ├── pages/              # Site pages/routes
│   │   ├── index.astro         # Main landing page
│   │   ├── privacy-policy.astro # Privacy Policy page
│   │   ├── terms-of-use.astro  # Terms of Use page
│   │   └── api/                # API endpoints
│   │       └── submit-form.ts  # Form submission handler (sends emails)
│   ├── components/         # Reusable Astro components
│   │   ├── ScriptForm.astro    # Script request form with SMS compliance
│   └── styles/             # Global styles
│       └── global.css           # Tailwind CSS and custom animations
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```powershell
npm install
```

2. Start the development server:
```powershell
npm run dev
```

3. Open [http://localhost:4321](http://localhost:4321) in your browser

## Development

### Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

### Tech Stack

- **Astro** - Modern web framework for content-driven websites
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Design System

- **Primary Colors**: Dark Navy Blue (#1e3a8a) and Black (#000000)
- **Accent Colors**: Navy Blue (#2563eb), Light Navy (#3b82f6), Gold (#fbbf24)
- **Animations**: Custom CSS animations with scroll reveal effects
- **Theme**: Dark mode with navy blue accents

## Project Features

- ✅ Responsive design (mobile-first)
- ✅ Smooth scroll animations
- ✅ Industry-specific language targeting annuity producers
- ✅ Modern light theme with navy blue accents
- ✅ SEO-friendly structure (meta tags, Open Graph, Twitter Cards, canonical URLs)
- ✅ Schema.org structured data (Organization, WebSite, FAQPage, Service, BreadcrumbList) in `src/data/schema.ts`
- ✅ Fast performance with Astro's static site generation
- ✅ Contact form with email notifications (via Resend)
- ✅ Twilio A2P 10DLC compliant SMS consent forms

### Schema / Structured Data

Edit `src/data/schema.ts` to update Organization details, rating, services, and FAQ for JSON-LD. Optional fields (phone, address, `bookingUrl`, `sameAs` for social links) are documented there.

## Email Configuration

The contact form sends submissions to `support@centurydigital.net` via Resend. To set up email functionality:

1. **Create a Resend account** (free tier: 3,000 emails/month)
   - Sign up at [https://resend.com](https://resend.com)
   - Get your API key from the dashboard

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Add your Resend API key:
     ```
     RESEND_API_KEY=re_your_api_key_here
     EMAIL_RECIPIENT=support@centurydigital.net
     EMAIL_FROM=Century Digital <noreply@centurydigital.net>
     ```

3. **Verify your domain in Resend** (required for production)
   - Add your domain (`centurydigital.net`) in Resend dashboard
   - Add the required DNS records
   - Update `EMAIL_FROM` to use your verified domain

4. **For production deployment:**
   - Add the environment variables to your hosting platform (Netlify, Vercel, etc.)
   - The API endpoint at `/api/submit-form` will automatically use these variables

**Note:** The form will work in development, but emails will only be sent when `RESEND_API_KEY` is configured.

## Deployment

Build the site for production:

```powershell
npm run build
```

The `dist/` folder contains the production-ready site that can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

**Important:** Make sure to add your environment variables (`RESEND_API_KEY`, `EMAIL_RECIPIENT`, `EMAIL_FROM`) to your hosting platform's environment variable settings.

## License

© 2026 Century Digital. All Rights Reserved.
