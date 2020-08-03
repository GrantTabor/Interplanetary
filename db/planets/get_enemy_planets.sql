select planet.planet_id, planet.planet_name, planet.user_id, planetaryuser.minerals, planetaryuser.energy 
from planet join planetaryuser on planet.user_id = planetaryuser.user_id
where planetaryuser.user_id != $1;