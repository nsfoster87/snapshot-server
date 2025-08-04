import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());

// Accept large JSON payloads (e.g. base64-encoded PNG)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

let latestSnapshot: string | null = null;

app.post('/api/snapshot', (req, res) => {
	const { image } = req.body;

	if (!image || typeof image !== 'string' || !image.startsWith('data:image/')) {
		return res.status(400).json({ error: 'Invalid or missing image' });
	}

	latestSnapshot = image;
	console.log('📸 Snapshot received');
	res.status(200).json({ message: 'Snapshot saved' });
});

app.get('/api/latest-image', (_req, res) => {
	if (!latestSnapshot) {
		return res.status(404).json({ error: 'No snapshot available' });
	}

	res.json({ image: latestSnapshot });
})

app.get('/snapshot/view', (_req, res) => {
	res.sendFile(path.join(process.cwd(), 'public', 'snapshot.html'));
});

app.listen(PORT, () => {
	console.log(`🟢 Server running at http://localhost:${PORT}`);
	console.log(`🔍 Snapshot view: http://localhost:${PORT}/snapshot/view`);
});
