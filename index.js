const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtStrategy = require('./strategies/jwt');

const app = express();
const port = process.env.PORT || 3000;
const secret = process.env.SECRET_KEY;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Passport with JWT strategy
passport.use(jwtStrategy);

app.get("/", (req, res) => {
    res.send("Welcome to the Express server!");
});

app.post("/login", (req, res) => {
    let { email, password } = req.body;
    // this llokup would normally be done using a database 
    if (email === "admin@email.com" && password === "admin") { // The password compare would normally be done using bcrypt
        const opts = {
            expiresIn: '2m' // token expires in 2mins
        };
        const token = jwt.sign({ email }, secret, opts);
        return res.status(200).json({
            message: "Auth Passed",
            token
        });
    } else {
        return res.status(401).json({
            message: "Auth Failed",
        });
    }
});

app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send("You have made it to the Protected Route");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});
