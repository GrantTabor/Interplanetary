module.exports = {
    getPlanet: async(req, res, next) =>{
        console.log("getting planet")
        const db = req.app.get("db");
        
        const userId = req.params.id;
        const planet = await db.planets.get_planet(userId);
        let newPlanet = planet[0];
        const buildings = await db.buildings.get_planet_buildings(newPlanet.planet_id);
        newPlanet.buildings = buildings;
        res.status(200).send(newPlanet);
    },
    getBuildings: async(req, res, next) =>{
        const db = req.app.get("db");
        const planetId = req.params.id;
        const buildings = await db.buildings.getBuildings(planetId);
        res.status(200).send(planet);
    }
}