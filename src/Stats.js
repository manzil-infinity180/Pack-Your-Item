export default function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">Add Some Item in your Packing List</p>
    );
  }
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((packedItems / totalItems) * 100);

  return <footer className="stats">
    <em>
      {percentage === 100 ? `You packed Everything, Here we Go for Flight ✈️` :
        `You have ${totalItems} items, and you have already packed ${packedItems} (${percentage}%) `}
    </em>
  </footer>;
}
