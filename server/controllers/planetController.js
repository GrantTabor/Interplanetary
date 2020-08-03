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
    },
    getAttackingPlanets: async(req, res, next) =>{
        const db = req.app.get("db");
        const userId = req.params.id;
        let planetsWithResources = await db.planets.get_enemy_planets(userId)
        let planetNum = planetsWithResources.length;
        let rand1 = Math.floor(Math.random() * planetNum);
        let rand2 = Math.floor(Math.random() * planetNum);
        while (rand2 === rand1){
            rand2 = Math.floor(Math.random() * planetNum);
        }
        let rand3 = Math.floor(Math.random() * planetNum);
        while (rand3 === rand2 || rand3 === rand1){
            rand3 = Math.floor(Math.random() * planetNum);
        }

        let sentPlanets = [planetsWithResources[rand1], planetsWithResources[rand2], planetsWithResources[rand3]];
        res.status(200).send(sentPlanets);
    }
}