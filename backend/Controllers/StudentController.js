const jwt = require('jsonwebtoken');
const FormModel = require('../Models/Students');

const login = async (req, res) => {
  try {
    const { email, grNumber } = req.body;

    const user = await FormModel.findOne({ email });

    const errorMsg = "Authentication failed. Email or GR Number is incorrect.";

    // No user found
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // GR number doesn't match
    if (grNumber !== user.grnumber) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Correct GR number – issue token
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      success: true,
      jwtToken,
      email: user.email,
      name: user.name,
      _id: user._id
    });

  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({
      message: 'Login failed. Internal server error',
      success: false,
      error: err.message
    });
  }
};

module.exports = { login };
