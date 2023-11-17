import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);




  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target);
    if (!description) return;

    const newItems = {
      id: Date.now(),
      description,
      packed: false,
      quantity
    };
    onAddItems(newItems);

    console.log(newItems);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form " onSubmit={handleSubmit}>
      <h3>What do you need for your trip?🧠</h3>
      <select value={quantity} onChange={(e) => setQuantity(1 * e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(
          (num) => <option value={num}>{num}</option>
        )}
      </select>
      <input type="text" placeholder="Item....."
        value={description} onChange={(e) => setDescription(e.target.value)}>

      </input>
      <button>Add</button>

    </form>
  );
}
