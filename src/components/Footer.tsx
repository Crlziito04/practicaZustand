import { Button } from "@mui/material";
import { useQuestionsData } from "../hooks/useQuestionsData";
import { useQuestionsStore } from "../store/questions";

export function Footer() {
  const { incorrect, correct, unasnwered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✔️${correct} Correctas - ❌${incorrect} Incorrectas - ❔${unasnwered} Sin Responder`}</strong>
      <div style={{ marginTop: "16px" }}>
        <Button onClick={reset}>Reset Game!</Button>
      </div>
    </footer>
  );
}
