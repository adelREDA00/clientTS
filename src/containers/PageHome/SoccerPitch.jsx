import React, { useEffect,useState } from "react";



const SoccerField = () => {


 



  return (
    <div className='pitch_one'>


<section className="pitch">
    <div className="field left">
        <div className="penalty-area">
        </div>
    </div>
    <div className="field right">
        <div className="penalty-area">
        </div>
    </div>
    <div className="center-circle"></div>
  <div className="home-team">
    <div className="player one"></div>
    <div className="player two"></div>
    <div className="player three"></div>
    <div className="player four"></div>
    <div className="player five"></div>
    <div className="player six"></div>
    <div className="player seven"></div>
    <div className="player eight"></div>
    <div className="player nine"></div>
    <div className="player ten"></div>
    <div className="player eleven"></div>
  </div>
  <div className="visitor-team">
    <div className="player one"></div>
    <div className="player two"></div>
    <div className="player three"></div>
    <div className="player four"></div>
    <div className="player five"></div>
    <div className="player six"></div>
    <div className="player seven"></div>
    <div className="player eight"></div>
    <div className="player nine"></div>
    <div className="player ten"></div>
    <div className="player eleven"></div>
  </div>
</section>

    </div>
  );
};

export default SoccerField;
