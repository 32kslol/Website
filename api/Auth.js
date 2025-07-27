// Simple key-to-name mapping


const keyDatabase = {
  'Admin': 'Test',
  'KEY-567asd': 'VXYC?VCXY:?xcy',
  'KEYfasBCD': 'Hgfagdsyxcb---3sdgf33'
};

export default function handler(req, res) {
  const { key, name } = req.query;

  // Check if key and name were provided
  if (!key || !name) {
    return res.status(400).send('error("32ks.lol -> *Missing Key/Name")')
  }

  // Check if key exists
  const ExpectedName = keyDatabase[key];
  if (!ExpectedName) {
     return res.status(403).send('error("32ks.lol -> Invalid Key!")'); 
  }

  // Check if name matches
  if (ExpectedName !== name) {
    return res.status(403).send('error("32ks.lol -> Name Mismatch!")');
  }

  // ✅ Valid
  return res.status(200).send('Detected');
}
