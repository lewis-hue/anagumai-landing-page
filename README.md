# Anagum AI landing page

Company site for Anagum AI, served at https://www.anagumai.com.

Static single page: `index.html`, `styles.css`, `favicon.svg`, `robots.txt`.
No JavaScript, no form, no build step.

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

