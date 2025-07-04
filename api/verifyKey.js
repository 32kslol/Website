export default function handler(req, res) {
  const validKeys = ['KEY-1234', 'KEY-5678', 'KEY-ABCD'];

  const key = req.query.key;

  if (!key) {
    res.status(400).json({ success: false, message: 'No key provided' });
  } else if (validKeys.includes(key)) {
    res.status(200).json({ success: true, valid: true });
  } else {
    res.status(403).json({ success: false, valid: false });
  }
}
