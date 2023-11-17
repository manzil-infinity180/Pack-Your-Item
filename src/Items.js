export default function Items({ itemsObj, onDeleteItems, onToggleItems }) {
  return <li>
    <input type="checkbox" value={itemsObj.packed} onChange={() => onToggleItems(itemsObj.id)}></input>
    <span style={itemsObj.packed ? { textDecoration: "line-through" } : {}}>
      {itemsObj.quantity} {itemsObj.description}
    </span>
    <button onClick={() => onDeleteItems(itemsObj.id)}>❌</button>
  </li>;
}
