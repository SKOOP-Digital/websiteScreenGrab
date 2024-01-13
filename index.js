import express from 'express';
import cors from 'cors';
import Pageres from 'pageres';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/screenshot', async (req, res) => {
  const { url, delay, width, height } = req.body;

  try {
    const pageres = new Pageres({ delay })
      .source(url, [`${width}x${height}`])
      .run();

    const [screenshot] = await pageres;
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': screenshot.length
    });
    res.end(screenshot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});