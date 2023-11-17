import { useState } from "react";
import Items from "./Items";

export default function PackingList({ items, onDeleteItems, onToggleItems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItem;
  if (sortBy === 'input') sortedItem = items;
  if (sortBy === 'description') sortedItem = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed') sortedItem = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  console.log(sortedItem);

  return (
    <div className="list">

      <ul>
        {sortedItem.map(el => <Items itemsObj={el} onDeleteItems={onDeleteItems} onToggleItems={onToggleItems} />)}

      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESCRIPTION</option>
          <option value="packed">SORT BY PACKED STATUS</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
