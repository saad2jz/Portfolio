# GitHub Pages

The portfolio is built from `main` in `saad2jz/Portfolio` by `.github/workflows/pages.yml`. Each push installs the locked dependencies with Node.js 24, checks TypeScript, runs the production build checks and uploads only `dist/`. The deployment job publishes that artifact in the existing `github-pages` environment. A failed build does not replace the live site.

## Repository settings

In **Settings → Pages**, select **GitHub Actions** as the source, set the custom domain to `www.saadbayahia.com`, and enable **Enforce HTTPS** once the certificate is available. `site.config.json` holds the matching canonical address. GitHub Actions publishing does not require a `CNAME` file; the custom domain is configured in the repository settings. Both hostnames remain valid: the apex redirects to the primary www address.

The domain's existing DNS records already point to GitHub Pages:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | saad2jz.github.io |

GitHub redirects the alternate www/apex address to the configured custom domain. Existing mail records do not need changes. GitHub Pages serves the static files; `_headers` and precompressed `.br`/`.gz` companions are not a mechanism for configuring its response headers or compression.

## Publishing changes

Run `npm ci`, `npm run typecheck` and `npm run test:build` locally, then push reviewed changes to `main`. Follow the workflow in the repository's Actions tab. For recovery, revert the relevant source commit and push; the same workflow rebuilds the previous content. The earlier portfolio remains in Git history.

References: [GitHub custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [custom domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
