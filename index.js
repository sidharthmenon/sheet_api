const express = require('express');
const PublicGoogleSheetsParser = require('public-google-sheets-parser')
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/sheet', async (req, res) => {
    const sheet_id = req.query.sheet;    
    const page = req.query.page;

    if (!sheet_id) {   
        return res.status(400).json({ error: 'Sheet ID is required' });
    }

    if (!page) {   
      return res.status(400).json({ error: 'Page is required' });
  }

    try {
        const options = { sheetId: page, useFormat: false }
        const parser = new PublicGoogleSheetsParser(sheet_id, options)
        const data = await parser.parse();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from Google Sheet' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});