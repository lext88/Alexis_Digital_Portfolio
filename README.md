# Portfolio — Setup & Deployment Guide

## File Structure

```
portfolio/
├── index.html          ← All pages (home, projects, contact)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Page routing & interactions
├── projects/
│   └── images/         ← Put your project images here
└── README.md
```

---

## Customization Checklist

### 1. Your name & info
Search for `Your Name` in `index.html` and replace everywhere (appears in nav, hero, footer, and all footers).

### 2. Hero tagline
Find `I build thoughtful software...` in the hero section and rewrite it to reflect you.

### 3. Project cards (home page)
For each card (`01`, `02`, `03`), update:
- `card-title` — your project name
- `card-desc` — 2–3 sentence summary
- `.tag` spans — your tech stack

### 4. Project detail pages
For each `#page-project-N`, fill in:
- Hero title, subtitle, year, role, stack
- Each `content-block` — the overview, challenge, and outcome sections
- The `problem-callout` blockquote — your one-sentence hook

### 5. Adding images

**Card thumbnails (home page):**
Replace the `<span>ADD IMAGE</span>` inside each `card-thumb` div:
```html
<div class="card-thumb">
  <img src="projects/images/project1-thumb.jpg" alt="Project One thumbnail">
</div>
```

**Project detail images:**
Replace each `<div class="image-placeholder">` block with:
```html
<img src="projects/images/p1-overview.jpg" alt="Description">
```
Images should be placed in `projects/images/`.
Recommended sizes: thumbnails ~800×450px, detail images ~1200×900px.

### 6. Contact form
The form currently shows a success message without sending anything.
To make it actually send emails, use [Formspree](https://formspree.io) (free):

1. Sign up at formspree.io
2. Create a new form → copy your endpoint (e.g. `https://formspree.io/f/xabcdefg`)
3. In `index.html`, change the form tag to:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Remove `onsubmit="handleSubmit(event)"` from the form tag
5. Remove the `handleSubmit` function from `js/main.js`

---

## Deploy to GitHub Pages

1. Create a new GitHub repository (name it `your-username.github.io` to get a clean URL, or anything else for a `/portfolio` path)
2. Push all files to the `main` branch
3. Go to **Settings → Pages**
4. Set Source to **Deploy from a branch** → `main` → `/ (root)`
5. Click **Save** — your site will be live at `https://your-username.github.io` in about 60 seconds

---

## Adding More Projects

To add a 4th project:
1. Copy a project card in the home grid
2. Change the number to `04` and call `onclick="showProject(4)"`
3. Copy an entire `#page-project-3` block, rename it `#page-project-4`
4. Fill in your content
