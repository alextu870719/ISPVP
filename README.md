# ISPVP Website

Professional Jekyll-based conference website for the International Symposium for Plant Vascular Pathosystems (ISPVP), designed for GitHub Pages deployment.

## Quick Start

1. Install Ruby and Bundler.
2. Install dependencies:
   ```bash
   bundle install
   ```
3. Run locally:
   ```bash
   bundle exec jekyll serve
   ```
4. Open `http://127.0.0.1:4000`.

## GitHub Pages Deployment

1. Create a GitHub repository (for example `ISPVP`).
2. Push this project to the default branch.
3. In repository settings, enable GitHub Pages from the default branch root.
4. Add/update `CNAME` with your custom domain once DNS is configured.

## Custom Domain DNS

For an apex domain (example `ispvp.org`):

- Add `A` records pointing to GitHub Pages IP addresses.
- Add `AAAA` records for IPv6 support.
- Add `CNAME` record for `www` pointing to `<username>.github.io`.

## Annual Update Checklist

- Update key dates on homepage, registration, and abstracts pages.
- Replace placeholder external service links with production URLs.
- Refresh committee and speaker lists.
- Upload final program and abstract documents to `assets/docs/`.
- Add news posts under `_posts/`.
