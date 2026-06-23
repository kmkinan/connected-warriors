# Azure Static Web App Deployment Guide

## Prerequisites
- GitHub repo created with your site files uploaded
- Azure account ready to deploy

## Step 1: Go to Azure Portal
- Open `https://portal.azure.com`
- Sign in with the Azure account that will own the site

## Step 2: Create Static Web App
- Click `Create a resource`
- Search for `Static Web App`
- Click `Static Web App`
- Click `Create`

## Step 3: Fill in the form

| Field | Value |
|-------|-------|
| **Subscription** | Select your subscription |
| **Resource group** | Create new or select existing |
| **Name** | `connected-warriors` (or your choice) |
| **Plan type** | Free |
| **Region** | Choose closest to your users |
| **Source** | GitHub |

## Step 4: GitHub authorization
- Click `Sign in with GitHub`
- Authorize Azure to access your GitHub account
- You'll be redirected back to Azure

## Step 5: Select your repo
- **Organization**: Select your GitHub username
- **Repository**: Select `connected-warriors` (the repo you uploaded)
- **Branch**: `main`

## Step 6: Build details
| Field | Value |
|-------|-------|
| **Build presets** | Custom |
| **App location** | `/` |
| **Api location** | (leave empty) |
| **Output location** | `/` |

## Step 7: Review + Create
- Click `Review + Create`
- Click `Create`

Azure will now:
- Build your site
- Deploy it automatically
- Give you a public URL like `https://xyz.azurestaticapps.net`

## Step 8: Check deployment
- After 2-3 minutes, go to your resource
- Find the URL under `Environments` → `Production`
- Open it in your browser

## Deployment Complete
Your site is now live at the Azure URL (e.g., `https://xyz.azurestaticapps.net`). Any changes you push to the `main` branch in GitHub will automatically redeploy your site.

## Step 9: Add Custom Domain (connectedwarriors.org)

### Prerequisites
- You must own or have access to the domain registrar for `connectedwarriors.org`

### In Azure Portal
1. Go to your Static Web App resource
2. Click `Custom domains` in the left menu
3. Click `Add`
4. Enter your domain: `connectedwarriors.org`
5. Azure will show you the validation details (DNS records to add)

### At your domain registrar (GoDaddy, Namecheap, etc.)
1. Log in to your domain registrar account
2. Go to DNS settings for `connectedwarriors.org`
3. Add the DNS records Azure provided:
   - Usually a CNAME record pointing to your Azure Static Web App
   - Or an A record with an IP address
4. Save the DNS changes (may take 15-30 minutes to propagate)

### Back in Azure Portal
1. After DNS updates propagate, click `Validate` in the custom domain form
2. Once validated, the domain will be linked to your site
3. Your site will now be accessible at `https://connectedwarriors.org`

## Troubleshooting
- If deployment fails, check the GitHub Actions log in your repo
- Ensure `.github/workflows/azure-static-web-apps.yml` is present and committed
- Verify all files are uploaded, including `attachments/` folder if referenced in HTML
- If the build fails immediately, confirm the GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN` exists in Settings → Secrets and Variables → Actions. This secret must contain the Azure Static Web App deployment token.
- For a pure static site, set `skip_app_build: true` in `.github/workflows/azure-static-web-apps.yml` so Azure uploads the existing `index.html` file instead of trying to detect and build a language.
- If you created the workflow file manually, use the Azure portal to obtain the deployment token and add it to GitHub secrets, or recreate the Static Web App via Azure so GitHub is configured automatically.
- For custom domain issues, verify DNS records are correctly set and allow 24-48 hours for full propagation
- HTTPS certificate is automatically provisioned by Azure once the domain is validated
