import React, {useState, useEffect} from "react";
import Axios from "axios"
import "./Attack.scss"
import {changeEnergy, changeMinerals, decrementArmy} from "../../redux/reducer"
import {getEnemyPlanetThunk} from "../../redux/actions/planetActions";
import {connect} from "react-redux"
function Attack(props){

    let [planets, setPlanets] = useState("");
    let [afterAttack, setAfterAttack] = useState(false);
    let planetDisplay = "";
   
    function refresh(){
        Axios.get(`/api/attackingplanets/${props.reducer.user.user_id}`)
            .then(res =>{
                setPlanets(res.data)
            })
            .catch(err => alert(err))
    }
    function attack(attackerId, defenderId) {
        let user_id = attackerId;
        if(props.reducer.userArmies > 0){
            Axios.put('/api/steal', {attackerId, defenderId})
            .then(res =>{
                props.changeEnergy(res.data[0].energy);
                props.changeMinerals(res.data[0].minerals);
                Axios.put('/api/decrement', {user_id})
                .then(res =>{
                    props.decrementArmy();
                })
                .catch(err => {alert(err)})
                setAfterAttack(true);
            })
        }
        else{
            alert("Not Enough Armies");
        }
    }
    function goBackToAttack(){
        refresh();
        setAfterAttack(false);
    }
    if(planets === ""){
        Axios.get(`/api/attackingplanets/${props.reducer.user.user_id}`)
            .then(res =>{
                setPlanets(res.data)
            })
            .catch(err => console.log(err))
    }
    
    if (planets){
        planetDisplay = planets.map(planet =>{
            return(
                <div className="planet">
                    
                    <section className="details">
                        <h2>{planet.planet_name}</h2>
                        <div><span className="Minerals" >{`Minerals: ${planet.minerals}`}</span></div>
                        <div><span className="Energy" >{`Energy: ${planet.energy}`}</span></div>
                    </section>
                    
                    <button className="attack-button" onClick={() => attack(props.reducer.user.user_id, planet.user_id)} >Attack</button>
                </div>
            )
        })
    }
    
    return(
        <div className="attack-page">
            {afterAttack ? <div><span>{`Attack Successful, You Now Have ${props.reducer.userEnergy} Energy and ${props.reducer.userMinerals} Minerals`}</span>
                <button onClick={() => goBackToAttack()}  >Return</button>
                </div> : 
            <div className="Attack">
                <div className="attack-header" >
                    <button onClick={()=>refresh()} className="refresh">&#8634;</button>
                    <div><span>Number of Armies: {props.reducer.userArmies}</span></div>
                    
                </div>
                
                {planetDisplay}
            </div> }
          
        </div>
    )
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getEnemyPlanetThunk, changeEnergy, changeMinerals, decrementArmy})(Attack);