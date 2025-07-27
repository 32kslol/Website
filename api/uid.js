// /pages/api/auth.js

const keyDatabase = {
  'aP7xK9vRqT2mF1Hz': {
    hwid: '3F1FA70F-5534-4D1C-88B0-3C7A4F61FA01'
  },
  'KEY-5678': {
    hwid: 'HWID-2222'
  },
  'KEY-ABCD': {
    hwid: 'HWID-3333'
  }
};

// In-memory rate limiter (resets on cold start)
const rateLimitMap = new Map();
const RATE_LIMIT_DELAY = 3000; // in ms

export default function handler(req, res) {
  const { key, hwid } = req.query;

  // Get real IP (Vercel sets x-forwarded-for)
  const forwarded = req.headers['x-forwarded-for'];
  const userIP = forwarded ? forwarded.split(',')[0].trim() : req.socket.remoteAddress;

  if (!key || !hwid) {
    return res.status(400).send('error("32ks.lol -> *Missing Key/Hwid")');
  }

  const record = keyDatabase[key];
  if (!record) {
    return res.status(403).send('error("32ks.lol -> Invalid Key!")');
  }

  // Rate limit check
  const now = Date.now();
  const lastTime = rateLimitMap.get(userIP);
  if (lastTime && now - lastTime < RATE_LIMIT_DELAY) {
    return res.status(429).send('error("32ks.lol -> Ratelimited")');
  }
  rateLimitMap.set(userIP, now);

  // HWID check
  if (record.hwid !== hwid) {
    return res.status(403).send('error("32ks.lol -> Hwid Mismatch!")');
  }

  // Success
  return res.status(200).send('print("32ks.lol -> *Success!")');
}
