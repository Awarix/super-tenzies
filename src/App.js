import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Intro from "./components/Intro"


export default function App() {

    //Wallet connect
  // State
  const [walletAddress, setWalletAddress] = React.useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          setStart(prevStart => !prevStart)
          setShow(prevShow => !prevShow)
          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
      setStart(true)
      setShow(false)
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="intro-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  // UseEffects
  React.useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  //Wallet connect end

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    const [isOpen, setIsOpen] = React.useState(false);
    const [jackpot, setJackpot] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
        if (firstValue=== 6 && allSameValue && allHeld) {
            setJackpot(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 25; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

    // Intro

    const [start, setStart] = React.useState (false)
    const [show, setShow] = React.useState (true)
    function letStart () {
    setStart(prevStart => !prevStart)
    setShow(prevShow => !prevShow)
    console.log(start)
    }
    
    return (
        <div>
            {!walletAddress && show && <Intro letStart={letStart} walletButton={renderNotConnectedContainer()}/>}
        {start && <main>
            {tenzies && <Confetti />}
            <h1 className="title">Super Tenzies</h1>
            <p className="instructions">
            Super Tenzies is a simple roll-dice game. <br />
            Roll until all dice are the same.  <br />
            Click each die to freeze it at its current value between rolls. <br />
            You need to win the game in <p style={{textDecoration:"underline" , display: "inline"}}>less than 30 seconds to be whitelisted</p>
            !</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>}
        {/* {jackpot && <h1>JAAAAAACKPOOOOOOOOT!</h1>} */}
        </div>
    )
}