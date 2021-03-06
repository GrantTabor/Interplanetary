require ("dotenv").config();

const express = require("express");
const massive = require("massive");
const path = require("path")
const session = require("express-session");
const userCtrl = require("./controllers/userController")
const planetCtrl = require("./controllers/planetController")
const emailCtrl = require("./controllers/emailController")
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
app.post('/auth/login', userCtrl.login);
app.get('/auth/logout', userCtrl.logout);

app.put(`/api/user/:id`, userCtrl.setIncreasedResources);
app.put('/api/users', userCtrl.addResources);
app.put('/api/user', userCtrl.accrueResources);
app.put(`/api/decrease`, userCtrl.decreaseResources)
app.put('/api/steal', userCtrl.stealResources);

app.put('/api/increment', userCtrl.incrementArmy);
app.put('/api/decrement', userCtrl.decrementArmy);

app.get("/api/planet/:id", planetCtrl.getPlanet);
app.get("/api/building/:id", planetCtrl.getBuildings);
app.get("/api/attackingplanets/:id", planetCtrl.getAttackingPlanets);

app.post("/api/building", planetCtrl.addBuilding);
app.delete("/api/building/:id", planetCtrl.removeBuilding);

app.post("/api/email", emailCtrl.email);

app.use(express.static(__dirname + "/../build"));

app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname + '../build/index.html'));
})

app.listen(SERVER_PORT, ()=>{
    console.log(`server is running on ${SERVER_PORT}`);
})
