const app = require('./app');
const mongoose = require('mongoose');
const connectDB = require('./utils/connection');

connectDB();

mongoose.connection.once('open', () => {
		console.log("Connected to MongoDB");
})

mongoose.connection.on('error', err => {
		console.error(err);
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})