# Leo's Catering website

A responsive, static website prepared for the same general workflow as Mar y Tierra:

1. Store the code in a GitHub repository.
2. Connect the repository to Cloudflare Pages (or Cloudflare Workers static assets).
3. Point `leoscatering.com` to the Cloudflare project after preview approval.
4. Add a Web3Forms access key in `config.js` or inject it at build time.

## Local preview

From this folder, start the development preview and open the displayed local URL:

```powershell
npm run dev
```

## Pages

- `index.html` — Home
- `about.html` — About Chef Leo
- `services.html` — Private dining and catering services
- `menus.html` — Featured menus and maintained Google Drive PDF links
- `contact.html` — Contact details and Web3Forms-ready inquiry form

## Before production

- Confirm all wording, pricing, reviews, and photos with Leo.
- Create a separate Web3Forms form for Leo's Catering and add its access key.
- Test the form from the Cloudflare preview domain.
- Confirm both `leoscatering.com` and `www.leoscatering.com` are connected before replacing the old site.

