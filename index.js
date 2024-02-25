const express = require('express')
const session = require('express-session')
const app= express()
const dotenv=require('dotenv')
require('./oauth');
const passport = require('passport');
const SECRET_KEY=process.env.SECRET_KEY;
dotenv.config()
app.use(session({secret:SECRET_KEY, resave: true, saveUninitialized: true}))

app.use(passport.initialize())
app.use(passport.session())



function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}




app.get('/',(req,res)=>{
    res.send('<a href="/auth/google">Auth with Google');
});
app.get('/auth/google',
    passport.authenticate('google',{scope:['email','profile']})
);

app.get('/protected',isLoggedIn, (req,res)=>{
    res.send('Hello  !');
});

app.get('/google/callback',

    passport.authenticate('google',{
        successRedirect :'/protected',
        failureRedirect : '/auth/failure'
    })
);

app.get('/auth/failure',(req,res)=>{
    res.send('Failure !!')
});

app.listen(5000,()=> console.log("Listen on 5000"));