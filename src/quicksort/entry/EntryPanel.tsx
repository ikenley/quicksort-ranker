import { useState } from "react";
import csvToList from "./csvToList";

type Props = {
  setInitialList: React.Dispatch<React.SetStateAction<string[]>>;
};

const originalInput = `All Quiet on the Western Front
Avatar: The Way of Water
The Banshees of Inisherin
Elvis
Everything Everywhere All at Once
The Fabelmans
Tár
Top Gun: Maverick
Triangle of Sadness
Women Talking`;

const originalList = csvToList(originalInput);

const EntryPanel = ({ setInitialList }: Props) => {
  const [inputText, setInputText] = useState<string>(originalInput);
  const [list, setList] = useState<string[]>(originalList);

  const handleTextInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const csv = event.target.value;
    setInputText(csv);

    const nextList = csvToList(csv);
    setList(nextList);
  };

  const handleSubmit = () => {
    setInitialList(list);
  };

  return (
    <div className="entry-panel">
      <form action="#">
        <div className="form-group">
          <label htmlFor="inputText">
            Enter a comma or newline-delimited list of items to rank:
          </label>
          <textarea
            className="form-control"
            id="inputText"
            rows={15}
            value={inputText}
            onChange={handleTextInputChange}
          ></textarea>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleSubmit}
          disabled={!list || list.length === 0}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default EntryPanel;
