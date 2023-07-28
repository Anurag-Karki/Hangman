import React, { useState } from "react";
import { randomWord } from "./Words";

import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";
import img7 from "./images/7.jpg";

const maxWrong = 7;
const images = [img0, img1, img2, img3, img4, img5, img6, img7];

function Hangman() {
  const [lucky_word, setLuckyWord] = useState(randomWord());
  const [guessed, setGuessed] = useState(new Set());
  const [nWrong, setWrong] = useState(0);

  //   console.log(lucky_word);
  console.log(guessed);
  //   console.log(nWrong);

  const guessWord = () => {
    return lucky_word.split("").map((ltr) => (guessed.has(ltr) ? ltr : " _"));
  };

  const resetGame = () => {
    setWrong(0);
    setGuessed(new Set());
    setLuckyWord(randomWord());
  };

  const handleGuess = (evt) => {
    const ltr = evt.target.value;
    setGuessed(new Set(guessed.add(ltr)));

    if (!lucky_word.includes(ltr)) {
      setWrong(nWrong + 1);
    }
  };

  const generateButton = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, index) => (
      <button
        key={index}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  };

  return (
    <div>
      <h1 className="main-header">Hangman</h1>
      <img src={images[nWrong]} alt="img" />
      <p>Wrong Guesses: {nWrong}</p>

      {lucky_word === guessWord().join("") ? (
        <p>You WIN!</p>
      ) : nWrong === maxWrong ? (
        <div>
          <p>YOU LOSE </p>
          <p>Correct Word is: {lucky_word}</p>
          <p>Guesses made: 
            {Array.from(guessed).map((item, index) => (
              <span key={index}> {item} </span>
            ))}
          </p>
          <p>Final State: {guessWord().join("")}</p>
        </div>
      ) : (
        <div>
          <p className="guessWord">{guessWord()}</p>
          <p className="hang-btn">{generateButton()}</p>
        </div>
      )}
      <button id="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default Hangman;
