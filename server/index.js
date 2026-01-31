const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const app = express();
// BE SURE TO ADD THE CLOSING QUOTE HERE:
const client = new OAuth2Client("164444498134-p8jtt6u8e31lsgs7aih8lopi69pishdp.apps.googleusercontent.com");

app.use(cors());
app.use(express.json());

// Replace with your actual MongoDB URI if not using local
mongoose.connect('mongodb://127.0.0.1:27017/googleAuthDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  picture: String,
});
const User = mongoose.model('User', userSchema);

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "164444498134-p8jtt6u8e31lsgs7aih8lopi69pishdp.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ googleId: sub });
    
    if (!user) {
      user = new User({ googleId: sub, email, name, picture });
      await user.save();
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(401).json({ success: false, message: "Invalid Token" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});