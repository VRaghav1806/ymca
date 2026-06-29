export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { image, filename } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Image data missing' });
  }

  try {
    // Extract base64 data from the Data URL and restore any plus signs lost during form URL decoding
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '').replace(/ /g, '+');
    
    // Convert base64 to a binary buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Send the buffer as a native file attachment
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'YMCA_SCOREBOARD.jpg'}"`);
    res.setHeader('Content-Length', buffer.length);
    
    res.end(buffer);
  } catch (error) {
    console.error('Serverless Function Error:', error);
    return res.status(500).json({ error: 'Failed to process image download' });
  }
}
