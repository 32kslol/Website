const keyDatabase = {
  'KEY-1234': 'HWID-1111',
  'KEY-5678': 'HWID-2222',
  'KEY-ABCD': 'HWID-3333'
};

export default function handler(req, res) {
  const validKeys = ['KEY-1234', 'KEY-5678', 'KEY-ABCD'];
  const { key, hwid } = req.query;

  const key = req.query.key;
  // Check if key and hwid were provided
  if (!key || !hwid) {
    return res.status(400).json({
      success: false,
      message: 'Missing key or hwid'
    });
  }

  if (!key) {
    res.status(400).json({ success: false, message: 'No key provided' });
  } else if (validKeys.includes(key)) {
    res.status(200).json({ success: true, valid: true });
  } else {
    res.status(403).json({ success: false, valid: false });
  // Check if key exists
  const expectedHWID = keyDatabase[key];
  if (!expectedHWID) {
    return res.status(403).json({
      success: false,
      message: 'Invalid key'
    });
  }

  // Check if HWID matches
  if (expectedHWID !== hwid) {
    return res.status(403).json({
      success: false,
      message: 'HWID mismatch'
    });
  }

  // ✅ Valid
  return res.status(200).json({
    success: true,
    valid: true
  });
}
