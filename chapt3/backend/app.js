var express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS package
var app = express();

// Enable CORS
app.use(cors());

const Schema = mongoose.Schema;
const TestSchema = new Schema({
  name: String,
  age: Number,
  email: String
});

const uri = 'mongodb://root:example@mongodb:27017'; // Use 'mongodb' as the hostname
mongoose.connect(uri, { dbName: 'test', serverSelectionTimeoutMS: 30000 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const Test = mongoose.model('test', TestSchema);
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});
app.get('/message', (req, res) => {
  res.json({ message: 'Hello from container' });
});
app.get('/records', async (req, res) => {
  try {
    const records = await Test.find(); // Fetch all records
    res.json(records);
  } catch (err) {
    console.error('Error fetching records:', err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
});
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});