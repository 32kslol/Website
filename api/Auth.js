const keyDatabase = {
  'aP7xK9vRqT2mF1Hz': 'HWID-1111',
  'KEY-5678': 'HWID-2222',
  'KEY-ABCD': 'HWID-3333'
};

export default function handler(req, res) {
  const { key, hwid } = req.query;

  // Validate that key and hwid are non-empty strings
  if (typeof key !== 'string' || key.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Missing or invalid key'
    });
  }

  if (typeof hwid !== 'string' || hwid.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Missing or invalid hwid'
    });
  }

  // Check if key exists in database
  const expectedHWID = keyDatabase[key];
  if (!expectedHWID) {
    return res.status(403).json({
      success: false,
      message: 'Invalid key'
    });
  }

  // Check if HWID matches expected HWID
  if (expectedHWID !== hwid) {
    return res.status(403).json({
      success: false,
      message: 'HWID mismatch'
    });
  }

  // If all checks pass
  return res.status(200).json({
    success: true,
    valid: true
  });
}
