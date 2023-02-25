import { Comparison } from "../types";

type Props = {
  comparison: Comparison;
};

/** Display panel for Comparison */
const PrompStatePanel = ({ comparison }: Props) => {
  return <div className="prompt-state-panel">{JSON.stringify(comparison)}</div>;
};

export default PrompStatePanel;
