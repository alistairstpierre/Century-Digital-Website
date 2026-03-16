# Century Digital Website

A sleek, modern website for Century Digital - Premium Annuity Lead Generation for Independent Producers and Financial Advisors.

Built with [Astro](https://astro.build), featuring a dark navy blue and black theme with smooth animations.

## Project Structure

```
/
├── public/                 # Static assets (favicons, images, etc.)
│   └── testimonials/       # Annuity results testimonial screenshots used on main page and thank-you mosaic
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
│   │   └── api/                # API endpoints (deployed as serverless on Vercel)
│   │       ├── submit-form.ts  # Form submission handler (sends emails)
│   │       └── track-lead.ts   # Meta CAPI server-side Lead (thank-you page)
│   ├── components/         # Reusable Astro components
│   │   ├── ScriptForm.astro    # Script request form with SMS compliance
│   └── styles/             # Global styles
│       └── global.css           # Tailwind CSS and custom animations
├── astro.config.mjs        # Astro config (Vercel adapter, output: server for API routes)
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
- ✅ Facebook Pixel (page views + Book a Call click tracking via `PUBLIC_FB_PIXEL_ID`)

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

## Facebook Pixel

The site can track **page views** and **clicks on the "Book a Call"** button for Facebook/Meta Ads.

1. **Get your Pixel ID** from [Meta Events Manager](https://business.facebook.com/events_manager).
2. **Add to `.env`** (use the `PUBLIC_` prefix so it’s available in the browser):
   ```
   PUBLIC_FB_PIXEL_ID=your_pixel_id_here
   ```
3. **Deploy:** Add `PUBLIC_FB_PIXEL_ID` to your hosting platform’s environment variables.

If `PUBLIC_FB_PIXEL_ID` is not set, no pixel code is loaded. Clicks on any "Book a Call" link fire a **Lead** event for conversion tracking.

**Vercel / “safe to share publicly”:** The Pixel ID is designed to be public (it appears in your site’s front-end code). It is not a secret; it only identifies which ad account receives the events. Safe to confirm as public when adding the env var.

### Conversions API (CAPI)

A **server-side Lead** event is sent when someone lands on the **thank-you page** (e.g. after booking a call), so Meta gets the event even if the browser pixel is blocked.

1. **Generate a CAPI access token:** Events Manager → your Pixel → **Settings** → **Conversions API** → **Generate access token**. Copy the token.
2. **Add to `.env`** (do **not** use `PUBLIC_`; keep it secret): `META_CAPI_ACCESS_TOKEN=your_token_here`
3. **Deploy:** Add `META_CAPI_ACCESS_TOKEN` to your host’s environment variables as a secret.

If the token is not set, the thank-you page still works; only the browser pixel runs. The API route `/api/track-lead` is called once per session when the thank-you page loads.

**Dataset Quality API:** When setting up CAPI, Meta may offer the "Dataset Quality API". You can **set up CAPI without it**. The Dataset Quality API is optional and used to pull quality metrics programmatically (e.g. for dashboards or many pixels). For a single pixel, event match quality and stats are visible in Events Manager; the extra API is only needed if you want automated quality reporting at scale. Skip it for now.

### Testing the pixel

1. **Confirm the pixel is on the page**  
   Open your live site (e.g. `https://yoursite.vercel.app`). Right-click → **View Page Source** (or Ctrl+U). Search for your **Pixel ID** (the number in `PUBLIC_FB_PIXEL_ID`). If you see it in a script (e.g. `fbq('init', '123456789')`), the pixel is loading. If not, the env var is missing or you need to redeploy after adding it in Vercel.

2. **See events in Meta Test Events**  
   - Go to [Meta Events Manager](https://business.facebook.com/events_manager) → select your **Pixel**.  
   - Click **Test events** in the left menu (or your Pixel → Test events tab).  
   - Under "Test website events", enter your **exact site URL** (e.g. `https://century-digital-website.vercel.app`).  
   - Click **Open website** to open it in a new tab.  
   - Keep the Test events tab open; events may take a few seconds. You should see **PageView** when the page loads.  
   - In the site tab, click any **Book a Call** button. In Test events you should see a **Lead** event.

3. **If nothing appears**  
   Disable ad blockers or tracking protection for your site, or try in a different browser. Use the same browser where you're logged into the Meta account that owns the pixel.

## Deployment

Build the site for production:

```powershell
npm run build
```

The `dist/` folder contains the production-ready site. **Vercel:** The project uses `@astrojs/vercel` with `output: 'server'` so that `/api/submit-form` and `/api/track-lead` are deployed as serverless functions. Deploy via Vercel’s GitHub integration or `vercel deploy`.

**Important:** Add these environment variables on your host: `RESEND_API_KEY`, `EMAIL_RECIPIENT`, `EMAIL_FROM`, `PUBLIC_FB_PIXEL_ID`, and (optional) `META_CAPI_ACCESS_TOKEN` for Conversions API.

## License

© 2026 Century Digital. All Rights Reserved.
