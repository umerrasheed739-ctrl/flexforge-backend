const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Membership = require('./models/Membership');
const Contact = require('./models/Contact');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected to FlexForge'))
  .catch(err => console.log('DB Error:', err));

// GET Routes
app.get('/api/memberships', async (req, res) => {
  try {
    const data = await Membership.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST Routes
app.post('/api/membership', async (req, res) => {
    console.log("Data aaya:", req.body); // Check karne ke liye ke phone aa raha hai ya nahi
    try { 
        const newMember = new Membership(req.body);
        await newMember.save(); 
        res.json({ success: true }); 
    }
    catch (e) { 
        res.status(500).json({ error: e.message }); 
    }
});

app.post('/api/contact', async (req, res) => {
    try { await new Contact(req.body).save(); res.json({ success: true }); }
    catch (e) { res.status(500).json({ error: e.message }); }
});


// server.js ka updated route
app.get('/api/member/:email', async (req, res) => {
    try {
        // .trim() se extra spaces hat jayengi
        const userEmail = req.params.email.trim(); 
        const member = await Membership.findOne({ email: userEmail });
        
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(5000, () => console.log('Server running on port 5000'));