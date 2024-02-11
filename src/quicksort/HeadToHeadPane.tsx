import { Item } from "../types";

type Props = {
  item: Item;
  handleClick: () => void;
};

const HeadToHeadPane = ({ item, handleClick }: Props) => {
  return (
    <div className="head-to-head-pane">
      {item.img && (
        <img className="scale-img" src={item.img} alt={item.value}></img>
      )}
      <button
        type="button"
        className="btn btn-secondary btn-block"
        onClick={handleClick}
      >
        {item.value}
      </button>
    </div>
  );
};

export default HeadToHeadPane;
