import { ChangeEvent, useContext, useState } from "react";
import { BoardContext } from "../lib/context";
import { Scores } from "../lib/types";

export const MatchScoresForm = ({
  scores,
  id,
}: {
  scores: Scores;
  id: number;
}) => {
  const [formValues, setValues] = useState<Scores>(scores);
  const [isFormShown, toggleForm] = useState(false);
  const { onUpdate, onFinish } = useContext(BoardContext);

  const onToggleForm = () => {
    toggleForm((prev) => !prev);
  };

  const onUpdateMatch = () => {
    onUpdate(id, formValues);
    onToggleForm();
  };

  const onFinishMatch = () => {
    onFinish(id);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: Number(e.target.value),
    }));
  };

  return (
    <div className="formWrapper">
      {isFormShown ? (
        <>
          <input
            onChange={onChange}
            name="home"
            type="number"
            min={0}
            value={formValues.home}
            placeholder="Home team score"
          />
          <input
            onChange={onChange}
            name="away"
            type="number"
            min={0}
            value={formValues.away}
            placeholder="Away team score"
          />
          <button onClick={onToggleForm}>❌</button>
          <button onClick={onUpdateMatch}>✔️</button>
        </>
      ) : (
        <button onClick={onToggleForm}>✏️</button>
      )}
      <button onClick={onFinishMatch}>🏁</button>
    </div>
  );
};
