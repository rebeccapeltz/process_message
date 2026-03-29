/*
Process incoming request and return to caller
*/

export default async function handler(req, res) {

  if (req.method === 'POST') {
    try {
      const msgBody = await req.body;
      const apiKey = process.env.API_KEY;

      // console.log(msgBody);
      if (msgBody.nomen !== process.env.NOMEN) {
        return res.status(404).json({ error: "Not authorized" });
      }
      delete msgBody.nomen; // Remove nomen from the body before sending to Anthropic

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
      // Now return the parsed data
      return res.status(200).json(data);


    } catch (error) {
      console.error('Error accessing RESPONSE:', error);
      return res.status(500).json({ error: 'Failed to access RESPONSE.' });
    }
  } else {
    res.status(200).json({ msg: "use POST method" });
  }
}

