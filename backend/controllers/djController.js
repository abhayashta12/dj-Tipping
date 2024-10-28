const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DJ = require('./models/DJ');

// Register a new DJ
exports.registerDJ = async (req, res) => {
  try {
    const { name, email, password, venue } = req.body;

    // Check if DJ already exists
    let dj = await DJ.findOne({ email });
    if (dj) {
      return res.status(400).json({ message: 'DJ already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    dj = new DJ({ name, email, password: hashedPassword, venue });

    // Save the DJ to the database
    await dj.save();

    // Generate a JWT
    const token = jwt.sign({ id: dj._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, dj });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login DJ
exports.loginDJ = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the DJ by email
    const dj = await DJ.findOne({ email });
    if (!dj) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, dj.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: dj._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, dj });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update DJ status
exports.updateDJStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const dj = await DJ.findById(req.user.id);
    if (!dj) {
      return res.status(404).json({ message: 'DJ not found' });
    }

    dj.status = status;
    await dj.save();
    res.json(dj);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
