# Unity K9 Express Rescue & Outreach

Professional website with auto-updating background image carousel.

---

## Quick Updates

All links and text are at the top of `src/app/page.tsx` in the `config` object.

---

## Google Drive Background Images (Optional)

Make background images auto-update by connecting Google Drive:

### Step 1: Create Google Drive Folder
1. Go to Google Drive
2. Create a new folder (e.g., "Website Hero Images")
3. Right-click → Share → "Anyone with link" → Viewer
4. Copy the **folder ID** from the URL (after `/folders/`)

### Step 2: Get Google API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → Enable "Google Drive API"
3. Go to Credentials → Create API Key
4. Restrict the key to "Google Drive API" only

### Step 3: Add to Vercel
1. Go to your Vercel project → Settings → Environment Variables
2. Add:
   - `GOOGLE_DRIVE_FOLDER_ID` = your folder ID
   - `GOOGLE_DRIVE_API_KEY` = your API key
3. Redeploy

Now just upload images to your Google Drive folder and they'll appear on the site!

---

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:3000
