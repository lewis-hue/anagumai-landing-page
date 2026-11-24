# Anagum AI landing page

![Anagum AI logo](images/logo.jpg)

Company site for Anagum AI, served at https://www.anagumai.com.

Static multi-page site: `index.html`, `about.html`, `contact.html`,
`careers.html`, `apply-senior-ai-engineer.html`,
`apply-full-stack-engineer.html`, `apply-product-designer.html`,
`ai-automations.html`, `ai-agents.html`, compiled `styles.css`,
`apply.js`, `js/` (vendored GSAP + ScrollTrigger 3.12.5 plus the
first-party `site.js` motion layer), `favicon.ico`,
`apple-touch-icon.png`, `robots.txt`, `sitemap.xml`, `images/`. No form
backend. Photos other than the logo are by Annie Spratt and Sigmund via
Unsplash. Every page shares the same header nav and footer; keep them
in sync when editing.

Motion runs on GSAP, vendored into `js/` because the site's enforcing
Content-Security-Policy (`deploy/contabo/Caddyfile` in `the-eye`) only
allows first-party scripts: no CDN script tags, no inline scripts and
no inline styles. `site.js` animates from visible states only, so the
finished page shows with JS disabled, and everything yields to
`prefers-reduced-motion`.

Job applications on `careers.html` are submitted by `apply.js` (vanilla
JS, no dependencies) to a Basin form endpoint set in the form's
`data-endpoint` attribute, resume file included. Basin notifies
`careers@anagumai.com`; see its dashboard for the free-plan limits. To
connect a new endpoint, create the form at usebasin.com (one endpoint is
free), paste its URL over the `REPLACE-WITH-YOUR-FORM-ID` placeholder,
rebuild and deploy. Keep the script free of inline handlers so it stays
within the enforcing Content-Security-Policy, whose `connect-src` must
keep allowing `https://usebasin.com` (see `Caddyfile` in `the-eye`).

Styling is Tailwind CSS plus daisyUI with one bespoke `anagum` theme,
compiled at author time and committed, so the deployed site stays plain
static files:

```sh
npm install
npm run build   # src/input.css -> styles.css
```

Pinned versions: see `package.json` devDependencies.

## Preview

```sh
python -m http.server 8123
```

then open http://localhost:8123.

## Deploy

Deployed to the Contabo VPS alongside `app.anagumai.com`. The VPS clones
this repo to `/srv/landing-page` and the `the-eye` proxy serves it; see
`deploy/contabo/SITE_WWW.md` in `the-eye` for the exact procedure.
To update the live site: push here, then `git pull` in `/srv/landing-page`
on the VPS.

