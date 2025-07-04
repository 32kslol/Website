export const config = {
  runtime: 'edge',
};

const keyDatabase = {
  'aP7xK9vRqT2mF1Hz': 'HWID-1111',
  'KEY-5678': 'HWID-2222',
  'KEY-ABCD': 'HWID-3333'
};

export default function handler(req) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  const hwid = searchParams.get('hwid');

  if (!key || !hwid) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Missing key or hwid'
    }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const expectedHWID = keyDatabase[key];
  if (!expectedHWID) {
    return new Response(JSON.stringify({
      success: false,
      message: 'Invalid key'
    }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  if (expectedHWID !== hwid) {
    return new Response(JSON.stringify({
      success: false,
      message: 'HWID mismatch'
    }), { status: 403, headers: { 'Content-Type': 'application/json' } });
  }

  return new Response(JSON.stringify({
    success: true,
    valid: true
  }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
