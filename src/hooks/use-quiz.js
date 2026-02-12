import { decodeHtml, shuffleArray } from "@/libs/utils";
import { useCallback, useEffect, useState } from "react";
import { useTimer } from "./use-timer";

const QUIZ_STORAGE_KEY = 'quiz_state';

export function useQuiz() {
  // Quiz data
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizConfig, setQuizConfig] = useState(null);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [hasSavedQuiz, setHasSavedQuiz] = useState(false);

  useEffect(() => {
    const savedQuizState = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (savedQuizState) {
      try {
        const state = JSON.parse(savedQuizState);
        // Check if there's an active quiz that's not complete
        if (state.isQuizActive && state.questions && state.questions.length > 0) {
          setHasSavedQuiz(true);
          setQuestions(state.questions || []);
          setCurrentQuestionIndex(state.currentQuestionIndex || 0);
          setAnswers(state.answers || {});
          setTimeRemaining(state.timeRemaining || 0);
          setIsQuizActive(false); // Don't auto-resume, wait for user action
          setQuizConfig(state.quizConfig || null);
        }
      } catch (error) {
        console.error('Error parsing saved quiz state:', error);
        localStorage.removeItem(QUIZ_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (isQuizActive && questions.length > 0) {
      const state = {
        questions,
        currentQuestionIndex,
        answers,
        timeRemaining,
        isQuizActive,
        quizConfig,
      };
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state));
    }
  }, [questions, currentQuestionIndex, answers, timeRemaining, isQuizActive, quizConfig]);

  useTimer(isQuizActive, timeRemaining, setTimeRemaining, () => {
    completeQuiz();
  });

  const fetchQuestions = async (amount = 10, category = '', difficulty = '', type = 'multiple') => {
    setLoading(true);
    try {
      let url = `https://opentdb.com/api.php?amount=${amount}`;
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      if (type) url += `&type=${type}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.response_code !== 0) {
        throw new Error('Failed to fetch questions');
      }

      const formattedQuestions = data.results.map((q, index) => ({
        id: index,
        question: decodeHtml(q.question),
        correctAnswer: decodeHtml(q.correct_answer),
        allAnswers: shuffleArray([
          decodeHtml(q.correct_answer),
          ...q.incorrect_answers.map(a => decodeHtml(a))
        ]),
        category: decodeHtml(q.category),
        difficulty: q.difficulty,
        type: q.type,
      }));
      setQuestions(formattedQuestions);
      return { success: true, questions: formattedQuestions };

    } catch (error) {
      console.error('Error fetching questions:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = (config) => {
    setQuizConfig(config);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(config.duration * 60); // Convert minutes to seconds
    setIsQuizActive(true);
    setIsQuizComplete(false);
  };

  const answerQuestion = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));

    // Auto-advance to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = useCallback(() => {
    setIsQuizActive(false);
    setIsQuizComplete(true);
  }, []);

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeRemaining(0);
    setIsQuizActive(false);
    setIsQuizComplete(false);
    setQuizConfig(null);
    setHasSavedQuiz(false);
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  };

  const resumeQuiz = () => {
    setIsQuizActive(true);
    setIsQuizComplete(false);
    setHasSavedQuiz(false);
  };

  const getSavedQuizInfo = () => {
    if (!hasSavedQuiz || questions.length === 0) {
      return null;
    }
    return {
      currentQuestion: currentQuestionIndex + 1,
      totalQuestions: questions.length,
      answered: Object.keys(answers).length,
      timeRemaining: timeRemaining
    };
  };

  const getResults = () => {
    let correct = 0;
    let incorrect = 0;
    let answered = Object.keys(answers).length;

    questions.forEach(q => {
      if (answers[q.id]) {
        if (answers[q.id] === q.correctAnswer) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    return {
      correct,
      incorrect,
      answered,
      total: questions.length,
      unanswered: questions.length - answered,
      percentage: questions.length > 0 ? (correct / questions.length * 100).toFixed(1) : 0
    };
  };

  return {
    fetchQuestions,
    questions,
    loading,
    currentQuestionIndex,
    answers,
    timeRemaining,
    isQuizActive,
    isQuizComplete,
    answerQuestion,
    completeQuiz,
    resetQuiz,
    resumeQuiz,
    getResults,
    quizConfig,
    startQuiz,
    hasSavedQuiz,
    getSavedQuizInfo,
  }
}
