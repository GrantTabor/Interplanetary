require ("dotenv").config();

const express = require("express");
const massive = require("massive");
const session = require("express-session");
const userCtrl = require("./controllers/userController")
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;

const app = express();
app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true, 
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
    })
      .then(dbInstance => {
        app.set("db", dbInstance);
        console.log("db connected")
      })
      .catch(err => console.log(err));

app.post('/auth/register', userCtrl.register);


app.listen(SERVER_PORT, ()=>{
    console.log(`server is running on ${SERVER_PORT}`);
})
