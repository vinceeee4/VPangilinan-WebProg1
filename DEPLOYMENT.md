# Deploying to Vercel

This repository is easiest to deploy as two Vercel projects.

## 1. Deploy the API

Create a Vercel project with:

- Root Directory: `Pangilinan-server`
- Framework Preset: `Other`
- Build Command: leave empty
- Install Command: `npm install`
- Output Directory: leave empty

Add these environment variables in Vercel:

- `MONGO_URI`: your MongoDB Atlas connection string
- `JWT_SECRET`: a long random secret, not `your_secret_key_here`
- `CLIENT_ORIGIN`: your deployed client URL, for example `https://your-client.vercel.app`. You can use comma-separated origins if needed.
- `NODE_ENV`: `production`

After deployment, the API health check should work at:

```text
https://your-api.vercel.app/
```

Your API base URL for the client is:

```text
https://your-api.vercel.app/api
```

## 2. Deploy the client

Create a second Vercel project with:

- Root Directory: `Pangilinan-client`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

Add this environment variable in Vercel:

- `VITE_API_URL`: `https://your-api.vercel.app/api`

Redeploy the client after setting `VITE_API_URL`.

## Security note

Do not commit `.env` files. If your MongoDB password has been shared or committed, rotate it in MongoDB Atlas before deploying.
