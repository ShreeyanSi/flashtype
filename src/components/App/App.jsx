import React from "react";
import "./App.css";
import Nav from "../Nav/Nav";
import Landing from "..//Landing/Landing";
import Footer from "../Footer/Footer";
import ChallengeSection from "../ChallengeSection/ChallengeSection";
import { SAMPLE_PARAGRAPHS } from "../data/sampleParagraphs";

const TotalTime = 60;
const ServiceUrl = "http://metaphorpsum.com/paragraphs/1/9";
const DefaultState = {
    selectedParagraph: "",
    timerStarted: false,
    timeRemaining: TotalTime,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo: [],
};


class App extends React.Component {

    state = DefaultState;

    fetchNewParagraphFallback = () => {
        const data = SAMPLE_PARAGRAPHS[
            Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
        ];
        const selectedParagraphArray = data.split("");
        const testInfo = selectedParagraphArray.map(selectedLetter => {
            return {
                testLetter: selectedLetter,
                status: "notAttempted",

            };

        });
        this.setState({ ...DefaultState, testInfo, selectedParagraph: data });


    }

    fetchNewParagraph = () => {
        fetch(ServiceUrl)
            .then(response => response.text())
            .then((data) => {

                const selectedParagraphArray = data.split("");
                const testInfo = selectedParagraphArray.map(selectedLetter => {
                    return {
                        testLetter: selectedLetter,
                        status: "notAttempted",

                    };

                });
                this.setState({ ...DefaultState, testInfo, selectedParagraph: data });
            });

    }



    componentDidMount() {

        this.fetchNewParagraphFallback();


    }

    startTimer = () => {
        this.setState({ timerStarted: true });
        const timer = setInterval(() => {
            if (this.state.timeRemaining > 0) {

                const timeSpent = TotalTime - this.state.timeRemaining;
                const wpm = timeSpent > 0
                    ? (this.state.words / timeSpent) * TotalTime
                    : 0;
                this.setState({
                    timeRemaining: this.state.timeRemaining - 1,
                    wpm: parseInt(wpm),
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

    };

    startAgain = () => this.fetchNewParagraph();


    handleUserInput = (inputValue) => {
        if (!this.state.timerStarted) this.startTimer();

        const characters = inputValue.length;
        const words = inputValue.split(" ").length;
        const index = characters - 1;

        if (index < 0) {
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted"
                    },
                    ...this.state.testInfo.slice(1)
                ],
                characters,
                words,

            });
            return;

        }
        if (index > this.state.selectedParagraph.length) {
            this.setState({ characters, words });
            return;

        }

        const testInfo = this.state.testInfo;
        if (!(index === this.state.selectedParagraph.length - 1))
            testInfo[index + 1].status = "notAttempted";

        const isCorrect = inputValue[index] === testInfo[index].testLetter;
        testInfo[index].status = isCorrect ? "correct" : "incorrect";

        this.setState({
            testInfo,
            words,
            characters
        })
    };


    render() {
        return (
            <div className="app">
                {/* Nav Section */}
                <Nav />

                {/* Landing page */}
                <Landing />

                <ChallengeSection
                    selectedParagraph={this.state.selectedParagraph}
                    words={this.state.words}
                    characters={this.state.words}
                    wpm={this.state.wpm}
                    timeRemaining={this.state.timeRemaining}
                    timerStarted={this.state.timerStarted}
                    testInfo={this.state.testInfo}
                    onInputChange={this.handleUserInput}
                    startAgain={this.startAgain}
                />


                <Footer />


            </div>
        );
    };

}

export default App;
