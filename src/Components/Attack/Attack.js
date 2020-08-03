import React, {useState, useEffect} from "react";
import Axios from "axios"
import {getEnemyPlanetThunk} from "../../redux/actions/planetActions";
import {connect} from "react-redux"
function Attack(props){

    let [planets, setPlanets] = useState("");
    let planetDisplay = "";
   /*Axios.get(`/api/attackingplanets/${props.reducer.user.user_id}`)
    .then(res =>{
        setPlanets(res.data)
    })
    .catch(err => alert(err))
    console.log(planets)*/

    /*
    useEffect(()=>{
        //props.getEnemyPlanetThunk(props.reducer.user.user_id)
        Axios.get(`/api/attackingplanets/${props.reducer.user.user_id}`)
            .then(res =>{
                setPlanets(res.data)
            })
            .catch(err => alert(err))
        //setPlanets(props.planetReducer.enemyPlanets);
    }, [planets])  
    */

    //props.getEnemyPlanetThunk(props.reducer.user.user_id)
    //setPlanets(props.planetReducer.enemyPlanets);
    function refresh(){
        Axios.get(`/api/attackingplanets/${props.reducer.user.user_id}`)
            .then(res =>{
                setPlanets(res.data)
            })
            .catch(err => alert(err))
    }

    if(planets === ""){
        Axios.get(`/api/attackingplanets/${props.reducer.user.user_id}`)
            .then(res =>{
                setPlanets(res.data)
            })
            .catch(err => alert(err))
    }
    
    if (planets){
        planetDisplay = planets.map(planet =>{
            return(
                <div>
                    {planet.planet_name}
                    <span className="Minerals" >{`Minerals: ${planet.minerals}`}</span>
                    <span className="Energy" >{`Energy: ${planet.energy}`}</span>
                    <button>Attack</button>
                </div>
            )
        })
    }
    
    return(
        <div>
            <button onClick={()=>refresh()} >Refresh</button>
            {planetDisplay}
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getEnemyPlanetThunk})(Attack);