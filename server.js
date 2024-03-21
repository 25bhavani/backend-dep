const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
connectToDB();

// Define a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

const contactSchema = new mongoose.Schema({
  Name: String,
  MobileNumber: Number,
  EmailAddress: String
});

const ContactModel = mongoose.model('Contact', contactSchema, 'contacts');

app.post('/api/contacts', async (req, res) => {
  try {
    const newContact = new ContactModel(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const data = await ContactModel.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ContactModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const orderSchema = new mongoose.Schema({
  order: String,
  orderdetails: String,
  payment: String
});

const OrderModel = mongoose.model('Order', orderSchema, 'orders');

app.get('/api/orders', async (req, res) => {
  try {
    const data = await OrderModel.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const bookSchema = new mongoose.Schema({
  name: String,
  phonenumber: Number,
  email: String,
  persons: Number,
  date: String
});

const BookModel = mongoose.model('Book', bookSchema, 'books');

app.get('/api/books', async (req, res) => {
  try {
    const data = await BookModel.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const loginSchema = new mongoose.Schema({
  email: String,
  password: String
});

const LoginModel = mongoose.model('Login', loginSchema, 'login');

app.get('/api/login', async (req, res) => {
  try {
    const data = await LoginModel.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


 
   
  
  


