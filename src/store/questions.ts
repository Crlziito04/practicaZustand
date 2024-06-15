import { Question } from "../types";
import { create } from "zustand";
import conffeti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestions: number;
  fetchQuestions: (limit: number) => void;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestions: 0,
        fetchQuestions: async (limit: number) => {
          const res = await fetch("http://localhost:5173/data.json");
          const json = await res.json();

          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);

          set({ questions });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          //*Obtener questions del estado
          const { questions } = get();
          //*Strutureclone copia profunda
          const newQuestions = structuredClone(questions);
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          const questionInfo = newQuestions[questionIndex];

          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;

          if (isCorrectUserAnswer) conffeti();
          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          //*Act estado
          set({ questions: newQuestions });
        },
        goNextQuestion: () => {
          const { currentQuestions, questions } = get();
          const newQuestions = currentQuestions + 1;

          if (newQuestions < questions.length) {
            set({ currentQuestions: newQuestions });
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestions } = get();
          const previousQuestion = currentQuestions - 1;
          if (previousQuestion >= 0) {
            set({ currentQuestions: previousQuestion });
          }
        },
        reset: () => {
          set({
            currentQuestions: 0,
            questions: [],
          });
        },
      };
    },
    {
      name: "questions",
    }
  )
);
