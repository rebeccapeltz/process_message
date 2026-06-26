/*
Process incoming request and return to caller
*/

export default async function handler(req, res) {
  // Set CORS headers on EVERY response, unconditionally, before any branching
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle the browser's preflight request and exit immediately
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const msgBody = await req.body;
      const apiKey = process.env.API_KEY;

      // console.log(msgBody);
      if (msgBody.nomen !== process.env.NOMEN) {
        return res.status(404).json({ error: "Not authorized" });
      }
      delete msgBody.nomen; // Remove nomen from the body before sending to Anthropic

      // Fallback only — callers should normally send their own `model`.
      // Lets you bump the default for every caller via a Vercel env var,
      // without redeploying demo.html, if a model gets retired again.
      if (!msgBody.model) {
        msgBody.model = process.env.CLAUDE_MODEL || 'claude-sonnet-4-6';
      }

      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(msgBody)
      });

      const data = await resp.json();

      if (!resp.ok) {
        console.error('Anthropic API error:', resp.status, resp.statusText);
        console.error('Error details:', data);
        return res.status(resp.status).json({ error: data });
      }

      return res.status(200).json(data);

    } catch (error) {
      console.error('Error accessing RESPONSE:', error);
      return res.status(500).json({ error: 'Failed to access RESPONSE.' });
    }
  } else {
    res.status(200).json({ msg: "use POST method" });
  }
}