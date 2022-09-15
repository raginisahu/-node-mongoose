const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const express = require("express");
const router = express.Router();

// get token for username and password
router.get("/gettoken", async(req,res) => {
  try {
    if(!req.body.username || !req.body.password)
    return res.status(400).send("username and password are required")
    const user = await User.findOne({username:req.body.username})
    if(!user) return res.status(400).send('Invalid username')
    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) return res.status(400).send('Invalid password!')
    const token = user.generateAuthToken()
    return res.status(200).send({
      "message":"success",
      "token":token
    })
  } catch(e) {
    console.log("e",e)
    return res.status(500).send("something went wrong!")
  }
})






router.post("/", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");
  
    user = new User({
      username: req.body.name,
      password: req.body.password,
      email: req.body.email
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    // const token = user.generateAuthToken();
    res.send({
      _id: user._id,
      name: user.username,
      email: user.email
    });
  } catch(e) {
    console.log("e",e.message)
    res.status(500).send("something went wrong!")
  }
});


module.exports = router;
