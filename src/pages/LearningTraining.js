import React, { useState } from "react";
import learningData from "../assets/learning.json"; // 👈 Load dataset

export default function LearningTraining() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const currentQuestion = learningData[currentIndex];

  // 👇 Function to speak word aloud
  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = () => {
    if (userAnswer.trim().toUpperCase() === currentQuestion.answer.toUpperCase()) {
      setFeedback("✅ Correct!");
      setIsCorrect(true);
      setAttempts(0);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setIsCorrect(false);

      if (newAttempts === 1) {
        // 👈 Show clue on first wrong attempt
        setFeedback(`❌ Wrong. Clue: ${currentQuestion.clue}`);
      } else if (newAttempts === 2) {
        setFeedback("❌ Wrong again. Try once more!");
      } else if (newAttempts >= 3) {
        setFeedback(`❌ Wrong. The correct answer is: ${currentQuestion.answer}`);
        speakWord(currentQuestion.answer); // 👈 say correct word
        setIsCorrect(true); // allow moving to next
      }
    }
  };

  const nextQuestion = () => {
    if (currentIndex < learningData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setFeedback("");
      setIsCorrect(false);
      setAttempts(0);
    } else {
      setFeedback("🎉 You have finished all the questions!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Learning Training</h2>

      <p><b>{currentQuestion.question}</b></p>

      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer"
        style={{ padding: "8px", margin: "10px" }}
      />

      <div>
        <button onClick={checkAnswer} style={{ marginRight: "10px" }}>
          Submit
        </button>
        <button onClick={nextQuestion} disabled={!isCorrect}>
          Next
        </button>
      </div>

      <p>{feedback}</p>
    </div>
  );
}
