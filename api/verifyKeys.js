export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { key, hwid } = req.body;

  if (!key || !hwid) {
    return res.status(400).json({ error: 'Key and HWID are required' });
  }

  // Store your keys and hwids here
  // Format: key: hwid
  const validKeys = {
    "KEY123": "HWID-ABC-123",
    "KEY456": "HWID-XYZ-789",
    "KEY789": "HWID-DEF-456"
  };

  // Check if the key exists and HWID matches
  if (validKeys[key] && validKeys[key] === hwid) {
    return res.status(200).json({ success: true, message: "Key and HWID verified" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid key or HWID" });
  }
}
