import React, {useEffect, useState} from 'react';
import Clues from "./Clues";


const GuessWord = () => {
    const initialGuesses = 6;
    const [guesses, setGuesses] = useState(initialGuesses);
    const [guessWord, setGuessWord] = useState('');
    const [guessedWords, setGuessedWords] = useState([]);
    const [answer, setAnswer] = useState("");
    const [isWrong, setIsWrong] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWordFormed, setIsWordFormed] = useState(false);
    const wrongAnswer = <h1>Your answer is wrong!</h1>
    const correctAnswer = <h1>Your answer is correct!</h1>
    const minChars = <p>Word contains 5 characters</p>


    // const validateWithAnswer
    const getValue = async () => {
        const response = await fetch("http://localhost:8000/word/",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        setAnswer(data["word"]);
        return data;

    };
    useEffect(() => {
        console.log(getValue());

    }, []);

    const handleGuessWord = (event) => {
        setGuessWord(event.target.value.toUpperCase());
    }

    const handleEnterKey = (event) => {
        if(event.key === "Enter") {
            console.log(`Inside Enter ${guessWord}`);
            if (guessWord.length === 5 ) {
                console.log("Enter Clicked");
                setGuessedWords((prevGuessedWords) => [...prevGuessedWords, guessWord]);
                validateWithAnswer(guessWord, answer);

                setIsWordFormed(true);
                setGuessWord('');
            }
            else
            {
                setIsWordFormed(false);
            }

        }

    }
    const validateWithAnswer = (guessedWord, actualWord) => {
        console.log(guessedWord, actualWord);
        if (guessedWord !== actualWord) {
            setIsWrong(true);
            setIsCorrect(false);
            setGuesses(prevGuesses => prevGuesses - 1);
        } else if (guessedWord === actualWord) {
            setIsWrong(false);
            setIsCorrect(true);
        }

    }
        if (guesses > 0) {
            return (
                <div>
                    <h1>Answer is: {answer} </h1>
                    <h2>Remaining chances {guesses}</h2>
                    <input value={guessWord} onChange={handleGuessWord}  minLength={5} maxLength={5} onKeyDown={handleEnterKey}/>
                    <h3>Current Words are:</h3>
                    <h3>{guessedWords.length>0 &&
                        guessedWords.map((word, index) => (<div>{index} word is {word}</div>))
                    }</h3>
                    {!isWordFormed && minChars }
                    {isWrong && wrongAnswer}
                    {isCorrect && correctAnswer}
                    <br/>
                    {guessedWords.length>0 &&<Clues guessedWord={guessedWords[guessedWords.length-1]} actualWord={answer} />}
                </div>
            );
        }
        else {
            return <div>
                <h1>Game Over</h1>
            </div>;
        }

}

export default GuessWord;