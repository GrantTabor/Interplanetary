update planetaryUser 
set energy = $2, minerals = $3
where user_id = $1;