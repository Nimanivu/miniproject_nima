import React, { useState, useEffect } from "react";
import wordsData from "../assets/words.json"; // load words dataset

export default function ReadingTraining() {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [lastResult, setLastResult] = useState(""); // track last result

  // Pick a random word when component loads
  useEffect(() => {
    pickRandomWord();
  }, []);

  const pickRandomWord = () => {
    const randomWord =
      wordsData[Math.floor(Math.random() * wordsData.length)].word;
    setTargetWord(randomWord);
    setSpokenText("");
    setLastResult("");
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Your browser does not support Speech Recognition. Please use Chrome or Edge."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase().trim();
      setSpokenText(text);
      setIsListening(false);

     if (text === targetWord.toLowerCase()) {
  setLastResult("✅ Correct pronunciation!");
} else {
  setLastResult(`❌ Wrong. You said: ${text}`);
  speakWord(targetWord);
}

    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
      setLastResult("⚠️ Error during recognition, please try again.");
    };
  };

  // Text-to-Speech function
  const speakWord = (word) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";

  // Speak the first time
  window.speechSynthesis.speak(utterance);

  // Speak again after 2 seconds
  setTimeout(() => {
    const repeatUtterance = new SpeechSynthesisUtterance(word);
    repeatUtterance.lang = "en-US";
    window.speechSynthesis.speak(repeatUtterance);
  }, 2000); // 2000ms = 2 seconds delay
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Reading Training</h2>
      <p>
        Say this word: <b>{targetWord}</b>
      </p>

      <button onClick={startListening} disabled={isListening}>
        {isListening ? "🎤 Listening..." : "Start Speaking"}
      </button>

      <p>You said: {spokenText}</p>
      <p>{lastResult}</p>

      {/* Try Again Button */}
      <button
        onClick={startListening}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        🔁 Try Again
      </button>

      {/* Next Word Button */}
      <button
        onClick={pickRandomWord}
        style={{ marginTop: "10px", padding: "10px 20px", marginLeft: "10px" }}
      >
        ⏭ Next Word
      </button>
    </div>
  );
}
