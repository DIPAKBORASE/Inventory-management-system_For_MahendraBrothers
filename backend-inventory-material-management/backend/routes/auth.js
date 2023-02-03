const user1 = require('../models/user');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const JWT_SECRETE = "dipak is good coder"
// @desc Register user
// @route POST /api/auth/register
// @access public
router.post('/register', [
	body('id', 'enter the id'),
    body('name', 'enter a valid name').isLength({ min: 5 }),    
    body('email', 'enter the valid email').isEmail(),
	body('mobile', 'enter the valid mobile no').isLength({ min: 10 }),
    body('password', 'password must be atleast 5 length').isLength({ min: 5 }),

], async(req, res) => {
    // if there are error return bad request and the errors 
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //  check is there is user with same email
    try {
        let user = await user1.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success,error: "sorry the user with this email is already exits" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await user1.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        const data = {
            us: {
                id: user1.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRETE)
        res.json(authtoken)
        
    } catch (error) {
        console.log("error.message");
        res.status(500).send("internal server error")
    }

})
