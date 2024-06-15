import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/questions";

const MAX_QUESTIONS = 10;

export function Start() {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(MAX_QUESTIONS);
  };

  return (
    <Button onClick={handleClick} variant="contained">
      Empezar!
    </Button>
  );
}
