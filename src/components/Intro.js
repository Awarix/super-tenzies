import React from "react";

export default function Intro (props) {
    return (
        <div className="container">
            <h1 className="intro-tittle">Welcome to the Super Tenzies!</h1>
            <p className="intro-about">
            Super Tenzies is a simple roll-dice game. <br />
            Roll until all dice are the same.  <br />
            Click each die to freeze it at its current value between rolls. <br />
            You need to win the game in <p style={{textDecoration:"underline" , display: "inline"}}>less than 30 seconds to be whitelisted</p>
            !</p>
            <div className="button-holder">
            <button className="intro-button" onClick={props.letStart}>Connect Wallet</button>
            <button className="intro-button" onClick={props.letStart}>Play without wallet</button>
            </div>
        </div>
    )
}