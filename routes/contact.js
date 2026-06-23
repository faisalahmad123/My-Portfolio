const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const MESSAGES_FILE = path.join(__dirname, '..', 'data', 'messages.json');
const MESSAGES_DIR = path.dirname(MESSAGES_FILE);

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function saveMessage(msg) {
  let list = [];
  if (fs.existsSync(MESSAGES_FILE)) {
    try { list = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8')); } catch (e) {}
  }
  list.push(msg);
  fs.mkdirSync(MESSAGES_DIR, { recursive: true });
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(list, null, 2));
}

router.post('/', async (req, res) => {
  const name = clean(req.body.name, 100);
  const email = clean(req.body.email, 200).toLowerCase();
  const subject = clean(req.body.subject, 200);
  const message = clean(req.body.message, 5000);

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address.' });
  }

  const entry = {
    name,
    email,
    subject,
    message,
    receivedAt: new Date().toISOString()
  };

  try {
    saveMessage(entry);
  } catch (e) {
    console.error('Save failed:', e);
  }

  // Optional email forwarding
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: entry.email,
        subject: `[Portfolio] ${entry.subject || 'New message from ' + entry.name}`,
        text: `From: ${entry.name} <${entry.email}>\n\n${entry.message}`
      });
    } catch (e) {
      console.error('Email send failed:', e.message);
    }
  }

  res.json({ ok: true, message: 'Thanks! Your message has been received.' });
});

module.exports = router;