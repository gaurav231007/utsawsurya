# Utsav Surya

Premium kitchenware brand website for Utsav Surya.

## Website

- Production domain: https://utsawsurya.com/
- Repository: https://github.com/gaurav231007/utsawsurya
- Working redesign branch: `fix/logo-favicon`

## Brand direction

The website is intentionally designed as a premium Indian kitchenware catalogue rather than a generic AI-generated ecommerce template.

- Warm ivory, deep brown and restrained copper palette
- Editorial serif typography paired with a clean sans-serif
- Large landscape product photography
- Product images preserve their natural proportions and are not stretched
- Clear product information with enquiry-led conversion
- No retail prices displayed on the catalogue
- WhatsApp and phone enquiry actions for current pricing and availability
- Responsive mobile navigation and product quick-view

## Product categories

- Pressure Cookers
- Gas Stoves
- Cookware
- Kitchen Essentials

## Technology

This is a lightweight static website:

- HTML5 for structure and semantic content
- CSS3 for responsive design and visual system
- Vanilla JavaScript for product filtering, quick-view and enquiry interactions
- JSON-LD structured data for Organization, WebSite and LocalBusiness
- `robots.txt` and `sitemap.xml` for search-engine discovery

No framework or build step is required.

## SEO

The site includes:

- Unique title and meta description
- Canonical URL
- Robots directives
- Open Graph and Twitter metadata
- Organization, WebSite and LocalBusiness structured data
- Semantic headings and descriptive image alt text
- Responsive images with width/height attributes where practical
- `robots.txt`
- `sitemap.xml`

## Local development

Open `index.html` in a browser, or serve the directory with any static HTTP server.

Example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The site can be deployed directly to Vercel, Netlify, GitHub Pages, or any static hosting provider.

### Important branch policy

`main` is the production branch. The premium redesign is developed and verified on `fix/logo-favicon` first. Do not merge it into `main` until the design, assets, mobile layout and live preview have been verified.

## Enquiries

The website uses the configured Utsav Surya WhatsApp number and phone CTA for product and dealer enquiries. Current pricing is intentionally handled directly rather than displayed publicly on product cards.

## License

Private brand project for Utsav Surya.