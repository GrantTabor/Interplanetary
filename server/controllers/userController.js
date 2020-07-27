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
            subject: 'Guess whos emailing you from their app yo',
            text: 'That was easy!'
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
    }
}