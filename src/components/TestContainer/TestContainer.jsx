import React from "react";
import TryAgain from '../TryAgain/TryAgain';
import TypingChallengeContainer from "../TypingChallengeContainer/TypingChallengeContainer";
import './TestContainer.css';


const TestContainer = ({
    selectedParagraph, words, startAgain, onInputChange, characters, wpm, timeRemaining, timerStarted, testInfo
}) => {


    return (
        <div className="test-container">

            {
                timeRemaining > 0 ? (
                    <div data-aos="fade-up" className="typing-challenge-cont">
                        <TypingChallengeContainer
                            testInfo={testInfo}
                            timeRemaining={timeRemaining}
                            timerStarted={timerStarted}
                            selectedParagraph={selectedParagraph}
                            words={words}
                            characters={characters}
                            wpm={wpm}
                            onInputChange={onInputChange}
                        />
                    </div>
                ) : (
                    <div className="try-again-cont">
                        <TryAgain words={words} characters={characters} wpm={wpm} startAgain={startAgain} />
                    </div>
                )}
        </div>
    );
};

export default TestContainer;
