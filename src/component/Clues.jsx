import React, { useState, useEffect } from 'react';

const Clues = (props) => {
    const { guessedWord, actualWord } = props;
    const [clues, setClues] = useState([]);
    // TODO: Change repetition for first clue
    useEffect(() => {
        const newCorrectChars = [];
        const newPresentChars = [];
        console.log(`guessedWord in Clues:- ${guessedWord} `);

        for (let i = 0; i < actualWord.length; i++) {
            if (guessedWord[i] === actualWord[i]) {
                newCorrectChars.push(guessedWord[i]);
            } else if (actualWord.includes(guessedWord[i])) {
                newPresentChars.push(guessedWord[i]);
            }
        }
        setClues((prevClues) =>[...prevClues, {"correctChars": newCorrectChars, "presentChars": newPresentChars }]);

        }, [guessedWord, actualWord] );




    const getClues = clues.map((clue, index) => (
        <div key={index}>
            <h2>Clues {index + 1}</h2>
            <h3>Correct Letters</h3>
            <ul>
                {clue["correctChars"].map((char, i) => (
                    <li key={`${index}-${i}`}>"{char}" is in the correct position</li>
                ))}
            </ul>
            <h3>Letters present in Word</h3>

            <ul>
                {clue["presentChars"].map((char, i) => (
                    <li key={`${index}-${i}`}>"{char}" is present in the word</li>
                ))}
            </ul>
        </div>
    ));

    return <div>{getClues}</div>;
};

export default Clues;
