// Simple key-to-HWID mapping


const keyDatabase = {
  'aP7xK9vRqT2mF1Hz': '6AA9D355-09D8-416E-8502-D6C8AC1E598B',
  'KEY-5678': 'HWID-2222',
  'KEY-ABCD': 'HWID-3333'
};

export default function handler(req, res) {
  const { key, hwid } = req.query;

  // Check if key and hwid were provided
  if (!key || !hwid) {
    return res.status(400).json({
      success: false,
      message: 'Missing key or hwid'
    });
  }

  // Check if key exists
  const expectedHWID = keyDatabase[key];
  if (!expectedHWID) {
     return res.status(403).send('error("32ks.lol -> Invalid Key!")'); 
  }

  // Check if HWID matches
  if (expectedHWID !== hwid) {
    return res.status(403).send('error("32ks.lol -> Hwid Mismatch!")');
  }

  // ✅ Valid
  return res.status(200).send(print("32ks.lol -> *Success!"));
}
