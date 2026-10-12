# The Archaeologist

An English archaeology and prehistory magazine built with standard Next.js, a MongoDB-backed editorial CMS, and SEO foundations for organic and social traffic.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. Set `ADMIN_PASSWORD` and `ADMIN_SECRET` before using the CMS.
3. Start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The editorial CMS is available at `/admin`.

## MongoDB

Use a MongoDB connection string in `MONGODB_URI`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DATABASE=archaeologist
MONGODB_COLLECTION=articles
```

`MONGO_URI` is accepted as a fallback alias. If no MongoDB URI is configured, the public site uses the built-in sample archive so the local preview still works. Once a URI is configured, the MongoDB collection is the source of truth, including an intentionally empty collection.

## SEO and advertising configuration

Set the public URL so canonical links, Open Graph URLs, JSON-LD, sitemap and robots all point to the real domain:

```env
NEXT_PUBLIC_SITE_URL=https://prehistorictimes.com
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

The app includes:

- Dynamic metadata for the homepage, archive, categories and articles.
- Canonical URLs, Open Graph/Twitter cards, Article and Breadcrumb JSON-LD.
- `sitemap.xml` and `robots.txt` generated from the published archive.
- Noindex handling for admin, search results and placeholder/import-only entries.
- `public/ads.txt` for the publisher line supplied by the advertising platform.

SEO improves discoverability but cannot guarantee Google indexing or AdSense approval; the site still needs original, useful editorial content, clear policies, author information and a verified domain.

## Production article import

The Vercel build runs `npm run postbuild`, which idempotently seeds the 30 editorial articles into the configured MongoDB collection. It inserts missing slugs only and does not overwrite existing documents. This requires `MONGODB_URI` to be configured in Vercel and reachable from Vercel; without it, the seed step safely skips.
## Production

```bash
npm run build
npm start
```

The production build uses standard Next.js with standalone output enabled. On Vercel, select the repository and add the same environment variables in Project Settings; no custom server command is required.
