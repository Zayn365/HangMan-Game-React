import { Component } from "react";
import { randomWord } from "./words.js";
import "./Hangman.css"


// console.log(randomWord());
class Hangman extends Component {
static defaultProps = {
 maxWrong: 6,
 img: ['0','1','2','3','4','5','6'],
}   
state = { nWrong: 0, guessed: new Set(), answer: randomWord() };

resetBtn = () => {
  this.setState({
    nWrong: 0,
    guessed: new Set(),
    answer: randomWord()
  })
}

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess = (evt) => {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
      key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        className="Hangman-btns"
      >
        {ltr}
      </button>
    ));
  }
  
    render () {
      const wrong = this.state.nWrong;
      const gameOver = wrong >= this.props.maxWrong;
      const isWinner = this.guessedWord().join("") === this.props.answer;
      const alt = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
      let gameState = this.generateButtons();
      if(isWinner) gameState = "YOU WIN!!!!";
      if(gameOver) gameState = "YOU LOSE!!!"; 
      console.log(this.state.answer);
      console.log(isWinner)
        return (
          <>
           <img className="logo" src='https://ccrs2006.github.io/Hangman-Game/assets/images2/logo.png' alt='logo' />
            <div className="Hangman">
               <img src={ !gameOver ? wrong+`.jpg` : "rage.png"} 
               style={!gameOver ? {} : {width: '27%'} }
               alt={alt} />
               <p className="para">WRONG GUESSES: {wrong}</p>
               <p className="Hangman-word">
                {!gameOver ? this.guessedWord() : this.state.answer}
                </p>
               <p className="para">{gameState}</p>
                <button id="reset" onClick={this.resetBtn}>Reset</button>
            </div></>
        )
    }
}
// // {!gameOver ?
// this.generateButtons() : 
// `You LOSE!`} //


export default Hangman;