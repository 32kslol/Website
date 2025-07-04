const validKeys = ['KEY-1234', 'KEY-5678', 'KEY-ABCD']; // You can change these

export default function handler(req, res) {
  const key = req.query.key;

  if (!key) {
    return res.status(400).json({ success: false, message: 'No key provided' });
  }

  if (validKeys.includes(key)) {
    return res.status(200).json({ success: true, valid: true });
  } else {
    return res.status(403).json({ success: false, valid: false });
  }
}
