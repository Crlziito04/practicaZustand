import { useQuestionsStore } from "../store/questions";
export const useQuestionsData = () => {
  const questions = useQuestionsStore((state) => state.questions);
  let correct = 0;
  let incorrect = 0;
  let unasnwered = 0;

  questions.forEach((q) => {
    const { userSelectedAnswer, correctAnswer } = q;

    if (userSelectedAnswer == null) unasnwered++;
    if (userSelectedAnswer === correctAnswer) correct++;
    if (userSelectedAnswer !== correctAnswer) incorrect++;
  });

  return { correct, incorrect, unasnwered };
};
