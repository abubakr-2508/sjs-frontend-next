import { useState } from "react";

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  function startListening() {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech recognition not supported in this browser"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (
      event: any
    ) => {
      const result =
        event.results[0][0]
          .transcript;

      setTranscript(result);
    };

    recognition.onerror = () => {
      setIsListening(false);

      alert(
        "Microphone access failed"
      );
    };

    recognition.start();
  }

  function clearTranscript() {
    setTranscript("");
  }

  return {
    transcript,
    isListening,
    startListening,
    clearTranscript,
  };
}