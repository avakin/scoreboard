import { useState, useContext, ChangeEvent } from "react";
import { BoardContext } from "../lib/context";

export const NewMatchForm = () => {
  const initialValues = { home: "", away: "" };
  const [formValues, setValues] = useState(initialValues);
  const { onStart } = useContext(BoardContext);
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitForm = () => {
    if (!formValues.away || !formValues.home) {
      console.error("Please fill in all the fields ");
      return;
    }

    onStart(formValues);
    setValues(initialValues);
  };

  return (
    <div>
      <h3>Add new match</h3>
      <div className="formWrapper">
        <input
          onChange={onChangeInput}
          name="home"
          type="text"
          placeholder="Home team"
          value={formValues.home}
        />
        <input
          onChange={onChangeInput}
          name="away"
          type="text"
          placeholder="Away team"
          value={formValues.away}
        />
        <button onClick={onSubmitForm}>▶️</button>
      </div>
    </div>
  );
};
