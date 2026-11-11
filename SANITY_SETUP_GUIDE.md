# 🎬 Sanity Setup & Admin Portal Guide

This guide provides step-by-step instructions on setting up **Sanity CMS** for your video editing portfolio, managing credentials in `.env`, and using the dedicated `/admin` portal.

---

## 🔐 1. Admin Portal & Login Credentials

Instead of having a public upload button on your Instagram profile, your studio now has a private, dedicated admin route:
- **Admin URL**: [`/admin`](http://localhost:5173/admin)

Your login credentials are saved in your root [`.env`](file:///d:/sidfolio/.env) file:
```env
VITE_ADMIN_USER=admin
VITE_ADMIN_PASSWORD=siddarth2026
```
> [!TIP]
> You can change `VITE_ADMIN_USER` and `VITE_ADMIN_PASSWORD` in `.env` at any time to your own custom username and password.

---

## ⚡ 2. How to Set Up Sanity CMS (Step-by-Step)

The portfolio works out-of-the-box with built-in high quality sample reels. To stream and store your own video uploads on Sanity's global media CDN:

### Step 2.1: Create a Free Sanity Account & Project
1. Go to [sanity.io](https://www.sanity.io/) and sign up or log in.
2. Click **Create new project**:
   - Project Name: `Siddarth Video Portfolio`
   - Dataset: Choose `production` (default)
3. Once created, go to the project dashboard at [sanity.io/manage](https://sanity.io/manage).

### Step 2.2: Copy Your Project ID
1. On your Sanity dashboard for the project, locate the **Project ID** (a string of ~8 characters, e.g., `5x8abcde`).
2. Keep this handy.

### Step 2.3: Generate an API Write Token (Required for Uploading)
Because your frontend needs permission to upload video files directly to Sanity, you need an API Write Token:
1. In your Sanity project dashboard, click the **API** tab in the top navigation.
2. Scroll to the **Tokens** section and click **Add API token**:
   - **Name**: `Portfolio Video Uploader`
   - **Permissions**: Select **Editor** (allows uploading files, images, and creating/deleting documents).
3. Click **Save**.
4. **Copy the token immediately** (it starts with `sk...`). Sanity will only display it once!

### Step 2.4: Add Credentials to `.env`
Open your [`.env`](file:///d:/sidfolio/.env) file in your project root and update the values:
```env
# Admin Credentials for /admin
VITE_ADMIN_USER=admin
VITE_ADMIN_PASSWORD=siddarth2026

# Sanity Backend Configuration
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_SANITY_API_TOKEN=your_token_starting_with_sk
```

> [!NOTE]
> In addition to `.env`, you can also save or update these credentials anytime inside the `/admin` portal under the **"Sanity Backend Settings"** tab and click **"Save & Test Sanity Connection"** to verify them live!

---

## 🎥 3. Uploading & Curating Reels via `/admin`

Once logged in at `/admin`:

1. **Upload New Reel**:
   - **Video Source**:
     - *Video File*: Upload `.mp4`, `.mov`, or `.webm` files directly. It automatically uploads to Sanity CDN.
     - *Direct Video URL*: Paste an external video link (Cloudinary, Bunny.net, Vimeo, S3, etc.).
   - **Cover Thumbnail**: Upload an image file or provide an image URL.
   - **Metadata**: Add title, client/brand, category, caption, and audio track.
   - **⭐ Feature on Homepage**: Check this box if you want this reel to appear on the main portfolio homepage in the **Selected Works** section!
   - Click **"Publish Video Reel"**.

2. **Manage Existing Reels**:
   - View all reels in your library.
   - Toggle **"Feature on Home"** on or off with 1 click.
   - Delete any reel with 1 click.
   - Click **"Preview"** to watch the reel in the full-screen interactive Instagram Reel viewer modal!

---

## 📱 4. What Visitors See

- **Homepage (`/`)**:
  - Hero, About, and What I Do tailored 100% to **Video Editing, Motion Design & Color Grading**.
  - **Works Section (`#works`)**: Displays featured 9:16 vertical cards with live video hover previews, view count, like count, and center play button.
  - Clicking any card opens the interactive Instagram Reel modal.
  - A prominent banner invites visitors to open the full Instagram profile showcase.
- **Instagram Profile Page (`/reels` or `/instagram`)**:
  - Authentic Instagram UI with story highlights, verified `@siddarth.edits` badge, stats (Followers, Views), category filters, and 9:16 cards.
  - The public `+ Admin Studio` button is removed—only you have access at `/admin`.

---

## 📁 5. Cleaned Up Files Summary

The following web development and blog files were cleanly deleted:
- `src/components/Blogs.jsx`
- `src/pages/BlogDetail.jsx`
- `src/pages/AllProjects.jsx`
- `src/pages/ProjectDetail.jsx`
- `src/components/CaseStudyLayout.jsx`
- `src/data/projectData.js`
- `src/components/AdminReelsModal.jsx` (replaced with dedicated `/admin` page)

