const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Kratika$miss';


//Route 1: Creat a User using: POST "/api/auth/createuser" . No login required
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Creat a new User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,

        })
        // .then(user => res.json(user))
        // .catch(err=> console.log(err))
        // res.json({error:'Please enter a unique value for email'})

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);


        //res.json(user);
        res.json({ authtoken })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})

//Route 2: Authenticate a User using: POST "/api/auth/Login" . No login required
router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {

    //If there are errors , return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credential" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credential" });
        }
        const data = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
});

//Route 3: Get logedin user details r using: POST "/api/auth/getuser" .  login required
router.post('/getuser', fetchuser , async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {

        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})
module.exports = router;

