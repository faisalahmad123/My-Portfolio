# Faisal Ahmad — Civil Engineer Portfolio

Multi-page portfolio built with **HTML, CSS, JS, Node.js, Express**.

## Run in VS Code

```bash
npm install
npm run dev      # auto-reload (uses nodemon)
# or
npm start
```

Open: http://localhost:3000

## Contact Form

Messages are saved to `data/messages.json` automatically.

**Optional email forwarding:** copy `.env.example` to `.env`, fill in Gmail credentials, and messages will also be emailed to you.

If the form shows an error, open the VS Code terminal where `npm run dev` is running. The updated form now shows the real server error instead of only saying “Network error”.

## Structure

```
├── server.js              # Express server
├── routes/contact.js      # Contact API endpoint
├── public/                # All static pages, CSS, JS, images
│   ├── index.html
│   ├── about.html
│   ├── projects.html
│   ├── skills.html
│   ├── contact.html
│   ├── css/styles.css
│   └── js/main.js
└── data/messages.json     # Saved contact messages
```

## Edit content

- Replace placeholder text in any `public/*.html` file.
- Drop your resume PDF at `public/resume.pdf`.
- Add project images to `public/images/`.
- Update LinkedIn / GitHub / email links in the footer of each page.

## Add an Archicad project download

The Archicad project card on the Projects page uses a small preview image on the
website and keeps the large `.pln` file in a GitHub Release.

1. In Archicad, export a good 3D view as a JPG or WebP image (around 1600 × 1000 pixels).
2. Add it to `public/images/projects/`, for example as `villa-residence-preview.webp`.
3. In `public/projects.html`, replace the placeholder image path with your new image path and update the title and description.
4. On GitHub, create a release with the tag `v1.0` and attach the Archicad file named `architectural-concept.pln`. The existing download link will then work.
5. If you use a different release tag or file name, update the `href` of the “Download Archicad file” link in `public/projects.html` to match it.

For additional projects, copy the `article` with the `project-card` class in
`public/projects.html`, then give it its own preview image and release URL.
