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
