module.exports = {
    getPlanet: async(req, res, next) =>{
        console.log("getting planet")
        const db = req.app.get("db");
        
        const userId = req.params.id;
        //console.log(userId)
        const planet = await db.planets.get_planet(userId);
        console.log(planet)
        res.status(200).send(planet);
    }
}