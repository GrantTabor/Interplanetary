const bcrypt = require("bcrypt");
require ("dotenv").config();


module.exports = {
    register: async(req, res, next) =>{
        const {username, password, email} = req.body;
        const db = req.app.get("db");
        var nodemailer = require('nodemailer');

        const findUser = await db.users.find_user(username);
        if (findUser[0]){
            return res.status(400).send("Username already in use");
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        const newUser = await db.users.create_user(username, email, hash);
        const user = await db.users.find_user(username);

        let planetName = `${user[0].username}'s Planet`
        

       //sending email to new applicant
        
        const {EMAIL, PASSWORD} = process.env
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587, 
            service: 'gmail',
            secure: false,
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        var mailOptions = {
            from: 'grantmtabor@gmail.com',
            to: email,
            subject: 'Welcome to Interpanetary!',
            text: 'This game is a project I made to help learn more about react and node JS.'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        //


        let newPLanet = await db.planets.make_planet(planetName, user[0].user_id);
        let planet = await db.planets.get_planet(user[0].user_id);
        console.log(`looking for ${planet}`)
        let planetId = planet[0].planet_id;
        await db.buildings.make_building(1, planetId)


        delete user[0].password;
        req.session.user = user[0];
        console.log(req.session.user)
        res.status(202).send(req.session.user);
        //const newUser = await db.users.create_user(usern)
    },
    login: async(req, res, next) =>{
        const {username, password} = req.body;
        const db = req.app.get("db");

        const findUser = await db.users.find_user(username);
        if (!findUser[0]){
            return res.status(400).send("Incorrect username or password");
        }
        const authenticated = bcrypt.compareSync(password, findUser[0].password);
        if (!authenticated){
            return res.status(400).send("Incorrect username or password")
        }
        delete findUser[0].password;
        req.session.user = findUser[0];
        res.status(202).send(req.session.user);
    },
    logout: async(req, res, next) =>{
        req.session.destroy();
        res.sendStatus(200);
    },

    setIncreasedResources: async(req, res, next) =>{
        const userId = req.params.id;
        const {energy, minerals} = req.body
        const db = req.app.get("db");
        console.log(energy)
        let setMaterials = await db.users.change_materials(userId, energy, minerals);
        
        res.sendStatus(200)
    },
    addResources: async(req, res, next) =>{
        const db = req.app.get("db");
        let users = await db.users.get_all_users();
        for(let i = 0; i < users.length; i++){
            console.log(`${users[i].username}, energy: ${users[i].energy_gain}`)
            let newEnergy = users[i].energy + users[i].energy_gain;
            let newMinerals = users[i].minerals + users[i].mineral_gain;
            
            let newUsers = await db.users.change_user_materials(users[i].user_id, newEnergy, newMinerals);
        }
        res.sendStatus(200)
    },
    stealResources: async(req, res, next) =>{
        const db = req.app.get("db");
        const {user1, user2} = req.body;
    },
    accrueResources: async(req, res, next) =>{
        const db = req.app.get("db");

        const {user_id, userEnergy, userMinerals} = req.body;
        console.log(`user id: ${user_id}, user energy: ${userEnergy}, user minerals: ${userMinerals}`)
        let user = await db.users.find_user_by_id(user_id);
        let newEnergy = user[0].energy + user[0].energy_gain;
        let newMinerals = user[0].minerals + user[0].mineral_gain;
        console.log(user)
        console.log(user.user_id)
        console.log(newEnergy)
        console.log(newMinerals)
        let newUser = await db.users.change_user_materials(user[0].user_id, newEnergy, newMinerals);
        let sentBackUser = await db.users.find_user_by_id(user_id);
        res.status(200).send(sentBackUser)
    },
    decreaseResources: async(req, res, next) =>{
        const db = req.app.get("db");
        const {user_id, energyCost, mineralCost} = req.body;

        let user = await db.users.find_user_by_id(user_id);
        let newEnergy = user[0].energy - energyCost;
        let newMinerals = user[0].minerals - mineralCost;
        let newUser = await db.users.change_user_materials(user[0].user_id, newEnergy, newMinerals);
        let sentBackUser = await db.users.find_user_by_id(user_id);
        res.status(200).send(sentBackUser)
    }

}