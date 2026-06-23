# Connected Warriors Website

This repository contains the static website for Connected Warriors.

## Deployment

This site is intended to be deployed to Azure Static Web Apps.

### GitHub Actions
The workflow file is located at `.github/workflows/azure-static-web-apps.yml`.

### Deployment settings
- `app_location`: `.`
- `api_location`: ``
- `output_location`: `.`

### Notes
- The site is static HTML/CSS/JS.
- If you want to make the contact form functional, use Azure Functions or a form endpoint service.
