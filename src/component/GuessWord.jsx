import React, {useEffect, useState} from 'react';


const GuessWord = () => {
    const initialGuesses = 6;
    const [guesses, setGuesses] = useState(initialGuesses);
    const [guessWord, setGuessWord] = useState('');
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
            if (event.target.value.toString().length === 5 ) {
                console.log("Enter Clicked");
                validateWithAnswer(guessWord, answer)
                setIsWordFormed(true);
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
                    <h1>Answer is: {answer} Remaining chances {guesses}</h1>
                    <input value={guessWord} onChange={handleGuessWord} minLength={5} maxLength={5} onKeyDown={handleEnterKey}/>
                    <h2>{guessWord}</h2>
                    {!isWordFormed && minChars }
                    {isWrong && wrongAnswer}
                    {isCorrect && correctAnswer}
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