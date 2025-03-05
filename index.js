const express = require('express');
const axios = require('axios'); // Import axios
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow requests from your frontend
    credentials: true
}), express.urlencoded({extended:true}));

// Leaderboard endpoint
app.get('/leaderboard', async (req, res) => {
    try {
        const region = req.query.region
        const apiUrl = `https://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=${region}&leaderboard=0`;
        const response = await axios.get(apiUrl); // Use axios instead of fetch

        // Send the data back to the frontend
        res.json({data: response.data, selectedRegion: region});
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard', details: error.message });
    }
});

app.get('/team', async (req, res) => {
    const id = req.query.id
    const apiUrl = `https://www.dota2.com/webapi/IDOTA2Teams/GetSingleTeamInfo/v001?team_id=${id}&get_dpc_info=true`
    const response = await axios.get(apiUrl)

    res.json({team: response.data})
})

// Start the server
app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});