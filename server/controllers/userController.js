const bcrypt = require("bcrypt");

module.exports = {
    register: async(req, res, next) =>{
        const {username, password, email} = req.body;
        const db = req.app.get("db");

        const findUser = await db.users.find_user(username);
        if (findUser[0]){
            return res.status(400).send("Username already in use");
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        const newUser = await db.users.create_user(username, email, hash);
        const user = await db.users.find_user(username);

        let planetName = `${user[0].username}'s Planet`
        
        db.planets.make_planet(planetName, user[0].user_id)
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