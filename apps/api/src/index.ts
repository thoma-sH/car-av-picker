import express from 'express';

const app = express();
const port = 3000;

app.get('/api/health', (req,res) => {
    res.json({ok: true});
});

app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}/api/health`);
});
