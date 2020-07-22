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

        req.session.user = user[0];
        res.status(202).send(req.session.user);
        //const newUser = await db.users.create_user(usern)
    }
}