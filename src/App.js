import { useState } from "react";
import "./App.css";

const questions = [
  {
    questionText: "What language is spoken in Brazil?",
    answerOptions: [
      { answerText: "Portuguese", isCorrect: true },
      { answerText: "English", isCorrect: false },
      { answerText: "French", isCorrect: false },
      { answerText: "German", isCorrect: false },
    ],
  },
  {
    questionText:
      "Which countries have the highest and lowest life expectancy in the world?",
    answerOptions: [
      { answerText: "Japan and Sierra Leone", isCorrect: true },
      { answerText: "Australia and Afghanistan", isCorrect: false },
      { answerText: "Italy and Chad", isCorrect: false },
      { answerText: "Brazil and Congo", isCorrect: false },
    ],
  },
  {
    questionText: "What company created the iPhone?",
    answerOptions: [
      { answerText: "Apple", isCorrect: true },
      { answerText: "Intel", isCorrect: false },
      { answerText: "Amazon", isCorrect: false },
      { answerText: "Microsoft", isCorrect: false },
    ],
  },
  {
    questionText: "How to learn to program?",
    answerOptions: [
      { answerText: "Practicing what you learn", isCorrect: true },
      { answerText: "watching video", isCorrect: false },
      { answerText: "Reading", isCorrect: false },
      { answerText: "Sleeping", isCorrect: false },
    ],
  },
];

function App() {
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [fail, setFail] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [successProgress, setSuccessProgress] = useState(0);
  const [errorProgress, setErrorProgress] = useState(0);

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
      setSuccessProgress(successProgress + 100 / questions.length);
    } else {
      setErrorProgress(errorProgress + 25);
      setFail(fail + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }

  return (
    <>
      <div className="mb-10 flex items-center">
        <div>
          <progress
            className="progress progress-success h-4 w-[200px] mr-4 duration-progress"
            value={`${successProgress}`}
            max="100"
          >

          </progress>
          <p className="!text-black">{score} / {questions.length}</p>
        </div>
        <p
          className="mr-4 font-semibold text-white w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center"
        >
          {successProgress}
        </p>
        <div>
          <progress
            className="progress progress-error h-4 w-[200px] !indeterminate:after:bg-green-700"
            value={`${errorProgress}`}
            max="100"
          >

          </progress>
          <p className="!text-black">{fail} / {questions.length}</p>
        </div>
      </div>
      <div className="app">

        {showScore ? (
          <div className="score-section">
            You scored {score} Out of {questions.length}
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>

            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map(
                (answerOption, index) => (
                  <button
                    onClick={() => handleAnswer(answerOption.isCorrect)}
                    key={index}
                  >
                    {answerOption.answerText}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
