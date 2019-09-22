const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res, next) => {
    try {
        let admin = new User({
            userName: 'ahmed',
            email: 'ahmed@it.com',
            phoneNumber: '01015720906',
            password: 'doha',
            role: 'admin'
        });
        const adminToken = admin.generateToken();
        console.log(admin);
        if (req.body.email == admin.email && req.body.password == admin.password) {
            return res.header('x-auth-token', adminToken).send(_.pick(admin, [
                'email',
                'adminToken',
                'password',
                'userName',
                'role',
            ]));
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('invalid email or password');
        };
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(404).send('invalid email or password');
        }


        const token = user.generateToken();
        res.header('x-auth-token', token).send(_.pick(user, [
            'email',
            '_id',
            'token',
            'password',
            'userName',
            'role',
        ]));

    } catch (err) {
        next(err);
    }


});


module.exports = router;