# Instagram Reels & Sanity CMS Integration Guide

This guide explains how your new Instagram Reels showcase and Sanity video uploading system works.

---

## 🚀 How to Access Your New Pages

1. **Instagram Profile Showcase**:
   - URL: `/reels` or `/instagram`
   - Access from Navbar by clicking **"Reels"** (with glowing indicator).
   - Access from the Homepage Works section by clicking **"Instagram Reels Profile"**.

2. **Admin Studio (Upload & Manage Reels)**:
   - On the `/reels` page, click the orange **"Admin Studio"** button at the top right.
   - Enter your PIN: `1234` (or `admin`).
   - You can upload video files (`.mp4`, `.mov`, `.webm`), thumbnails, set titles, captions, tags, and toggle **"Feature on Home"**.

3. **Homepage Selected Works (`/`)**:
   - The Works section on the homepage now includes a filter switcher:
     - `All Works`
     - `Video Edits & Reels (Hot)`
     - `UI/UX & Web Case Studies`
   - Featured video edits show up as 9:16 vertical cards with live video hover preview. Clicking any card opens the interactive Instagram Reel player modal.

---

## 🛠️ Connecting Your Sanity Backend

The project works out of the box with built-in high quality sample reels and local storage saving. To connect your live Sanity cloud project:

### Option A: Via the Admin Studio (Easiest)
1. Open `/reels` and click **"Admin Studio"** (PIN: `1234`).
2. Click the **"Sanity Backend Settings"** tab.
3. Paste your **Sanity Project ID** and **Write Token**.
4. Click **"Save & Test Sanity Connection"**.
5. Once verified, your status turns green `🟢 Connected to Sanity`.

### Option B: Via `.env`
Create a `.env` file in the root directory (copy from `.env.example`):
```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_API_TOKEN=your_token_with_editor_permissions
```

### Where to get your Sanity credentials:
1. Log in to [sanity.io/manage](https://sanity.io/manage).
2. Select or create your project.
3. Copy the **Project ID**.
4. Go to **API** &rarr; **Tokens** &rarr; **Add API Token**:
   - Name: `Portfolio Video Uploader`
   - Permissions: **Editor** (allows asset uploading and creating documents)
   - Copy the generated token.

---

## 📄 Sanity Studio Schema

If you use Sanity Studio in a separate repository or studio folder, a complete schema definition is provided in:
- `sanity-schema-reel.js`

Copy this schema into your Studio's `schemas/reel.js` or `schemaTypes/reel.ts`.

---

## 🎬 Reel Features in the Instagram Viewer

- **Full-Screen 9:16 Player**: Auto-plays smoothly with mute toggle and duration progress bar.
- **Heart Pop Like Animation**: Click the heart button or double-click the video to trigger an animated heart burst and increment like count.
- **Comments Panel**: Read and submit comments.
- **Share**: 1-click reel link copying to clipboard (`/reels?id=...`).
- **Spinning Vinyl Disc**: Displays custom music/sound ticker.
- **Keyboard Shortcuts**:
  - `↑` / `k`: Previous Reel
  - `↓` / `j`: Next Reel
  - `Space`: Play / Pause
  - `m`: Mute / Unmute
  - `Esc`: Close Viewer

