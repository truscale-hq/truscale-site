# Marketing site

Static marketing site for the construction software product. No backend, no
runtime dependencies, no requests to outside services at runtime.

## Change the product name

Edit `brandName` in `site.config.json`, then run the build. The name appears
in page text, titles, the favicon, the Open Graph image and the app logo in the
screenshots. Set `draftNameBanner` to `false` to remove the yellow
"Draft name, pending trademark check" banner.

## Config

| Key | Use |
| --- | --- |
| `brandName` | Product name everywhere on the site |
| `draftNameBanner` | Shows the draft name banner |
| `siteUrl` | Absolute URL for canonical links, Open Graph and the sitemap |
| `betaEndpoint` | URL the beta form posts JSON to. Empty: shows the confirmation, sends and stores nothing, logs a console warning |
| `contactEndpoint` | Same, for the contact form |
| `contactEmail`, `contactPhone` | Shown on the contact page when set |

## Commands

```
npm run build    # node scripts/build.mjs, writes dist/
npm test         # unit tests for the three calculators
npm run shots    # headless Chrome screenshots into shots/
```

The build needs Node 18 or later and python3 with Pillow. The image step reads
the app screenshots from `/home/claude/plandesk/out` (override with
`SHOTS_SRC`), covers the company name, person names and the real street
address, and writes WebP files. `SKIP_IMAGES=1` reuses the images from the last
build.

The build fails if any page contains an en or em dash, a name that must not
appear, or an outside URL.

## Layout

- `src/pages/*.mjs` page content, English and Spanish side by side
- `src/layout.mjs` header, footer and head tags
- `src/assets/js/lib/` calculator math (deal, span, facing), tested in `test/`
- `src/assets/js/tool-*.js` calculator screens
- `scripts/prep_images.py` screenshot cleanup and Open Graph image
- `scripts/fonts-ttf/` Inter and Inter Tight (SIL Open Font License), used only by the image step
