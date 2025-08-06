const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Add this
const connectDB = require('./config/db');
const routes = require('./routes/index');

dotenv.config();
connectDB();

const app = express();

// ✅ Enable CORS for frontend origin
app.use(cors({
    origin: 'http://34.45.69.106:3000', // <-- allow requests from React dev server
    credentials: true, // optional: if you're using cookies or auth
}));

app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
