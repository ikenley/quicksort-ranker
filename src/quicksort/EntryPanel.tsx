import { useState } from "react";

type Props = {
  setInitialList: React.Dispatch<React.SetStateAction<string[]>>;
};

const EntryPanel = ({ setInitialList }: Props) => {
  const [rawText, setRawText] = useState<string>("");

  const handleListInputChange = () => {};

  const handleSubmit = () => {};

  return <div className="entry-panel">Coming Soon</div>;
};

export default EntryPanel;
