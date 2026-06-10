export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}

export default async function handler(req, res) {
  // Add CORS headers so frontend can access this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    let query = '';
    if (req.method === 'POST') {
      query = await getRawBody(req);
    } else if (req.method === 'GET') {
      query = req.query.data || '';
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
      return;
    }

    if (!query) {
      res.status(400).json({ error: 'Missing query data' });
      return;
    }

    // Forward request to Overpass API with identification headers
    const overpassResponse = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'CafeFinder/1.0 (nayangupta170@gmail.com)',
        'Accept': 'application/json',
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    const status = overpassResponse.status;
    const text = await overpassResponse.text();

    res.status(status).send(text);
  } catch (error) {
    console.error('Error proxying Overpass request:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
