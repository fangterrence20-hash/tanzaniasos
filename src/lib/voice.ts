import { useCallback, useEffect, useRef, useState } from "react";

import type { Lang } from "@/lib/i18n";

const voiceLocale: Record<Lang, string> = { en: "en-GB", sw: "sw-TZ" };

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const want = lang === "sw" ? "sw" : "en";
  return voices.find((v) => v.lang.toLowerCase().startsWith(want)) ?? voices[0];
}

export type SpeakOptions = { onIndex?: (index: number) => void; onEnd?: () => void };

/** Speaks a list of phrases aloud, one after another, in the active language. */
export function useVoiceReader(lang: Lang) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [index, setIndex] = useState(-1);
  const cancelled = useRef(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    cancelled.current = true;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setIndex(-1);
  }, []);

  useEffect(() => stop, [stop]);

  const speak = useCallback(
    (phrases: string[], options: SpeakOptions = {}) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      cancelled.current = false;
      setSpeaking(true);

      const run = (i: number) => {
        if (cancelled.current || i >= phrases.length) {
          setSpeaking(false);
          setIndex(-1);
          if (!cancelled.current) options.onEnd?.();
          return;
        }
        setIndex(i);
        options.onIndex?.(i);
        const utterance = new SpeechSynthesisUtterance(phrases[i]);
        utterance.lang = voiceLocale[lang];
        const voice = pickVoice(lang);
        if (voice) utterance.voice = voice;
        utterance.rate = 0.92;
        utterance.pitch = 1;
        utterance.onend = () => run(i + 1);
        utterance.onerror = () => run(i + 1);
        window.speechSynthesis.speak(utterance);
      };

      run(0);
    },
    [lang],
  );

  return { speak, stop, speaking, supported, index };
}

type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

function getRecognitionCtor(): (new () => RecognitionLike) | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as {
    SpeechRecognition?: new () => RecognitionLike;
    webkitSpeechRecognition?: new () => RecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

/** Captures a short spoken phrase and returns the transcript. */
export function useVoiceInput(lang: Lang, onTranscript: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const ref = useRef<RecognitionLike | null>(null);
  const handler = useRef(onTranscript);
  handler.current = onTranscript;

  useEffect(() => {
    setSupported(Boolean(getRecognitionCtor()));
  }, []);

  const stop = useCallback(() => {
    ref.current?.stop();
    ref.current = null;
    setListening(false);
  }, []);

  useEffect(() => stop, [stop]);

  const start = useCallback(() => {
    const Ctor = getRecognitionCtor();
    if (!Ctor) return;
    const recognition = new Ctor();
    ref.current = recognition;
    recognition.lang = voiceLocale[lang];
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const text = event.results?.[0]?.[0]?.transcript ?? "";
      if (text) handler.current(text.trim());
    };
    recognition.onend = () => {
      ref.current = null;
      setListening(false);
    };
    recognition.onerror = () => {
      ref.current = null;
      setListening(false);
    };
    setListening(true);
    try {
      recognition.start();
    } catch {
      setListening(false);
    }
  }, [lang]);

  return { start, stop, listening, supported };
}
