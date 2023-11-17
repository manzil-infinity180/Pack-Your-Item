import {useState} from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Shirt", quantity: 5, packed: false },
// ];

export default function App() {
  // Lifting state up to the first common parent component
  const [items,setItems] = useState([]);
  function handleAddItems(item){
    setItems(items => [...items , item])
  }
  function handleDeleteItems(id){
    setItems(items => items.filter((item)=> item.id!==id ));
  }
  function handleToggleItems(id){
    setItems(items => items.map((item)=> (item.id===id) ? {...item, packed:!item.packed} : item ))
  }
  function handleClearLists(){
    const confirmed = window.confirm("CONFIRMING,By doing this ALL the PACKING LIST will CLEAR !!! \n ARE YOU REALLY WANT TO DELETE ❌")
    if(confirmed)
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItems={handleDeleteItems} onToggleItems={handleToggleItems} 
      onClearList={handleClearLists}/>
      <Stats items={items} />
     
    </div>
  );
}
function Logo(){
  return (
    
      <h1> 👁️ Pack Your ITEMS 💀</h1>
    
  )
}
function Form({onAddItems}){
  const [description,setDescription] = useState("");
  const [quantity,setQuantity] = useState(1);
 

  
  
  function handleSubmit(e){
    e.preventDefault();
    // console.log(e.target);
    if(!description) return;

    const newItems = {
      id: Date.now(),
      description,
      packed: false,
      quantity
    }
    onAddItems(newItems);

    console.log(newItems);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form " onSubmit={handleSubmit}>
      <h3>What do you need for your trip?🧠</h3>
      <select value={quantity} onChange={(e)=> setQuantity(1*e.target.value)}>
        {
        Array.from({length:20},(_,i)=> i+1).map(
          (num) => <option value ={num}>{num}</option>
        )
        }
      </select>
        <input type="text" placeholder="Item....."
         value={description} onChange={(e)=> setDescription(e.target.value)}>

         </input>
        <button>Add</button>
      
    </form>
  )
}
function PackingList({items,onDeleteItems,onToggleItems,onClearList}){
  const [sortBy,setSortBy] = useState("input");
  let sortedItem;
  if(sortBy==='input') sortedItem=items;
  if(sortBy==='description') sortedItem = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  if(sortBy ==='packed') sortedItem = items.slice().sort((a,b)=> Number(a.packed) - Number(b.packed));
  console.log(sortedItem);

  return (
    <div className="list">

    <ul > 
     { sortedItem.map(el=> <Items itemsObj={el} onDeleteItems={onDeleteItems} onToggleItems={onToggleItems} />)}

    </ul>
    <div className="action">
      <select value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
        <option value="input">SORT BY INPUT ORDER</option>
        <option value="description">SORT BY DESCRIPTION</option>
        <option value="packed">SORT BY PACKED STATUS</option>
      </select>
      <button onClick={onClearList}>Clear List</button>
    </div>
    </div>
  )
}
function Items({itemsObj,onDeleteItems,onToggleItems}){
  return <li>
    <input type="checkbox" value={itemsObj.packed} onChange={()=> onToggleItems(itemsObj.id)}></input>
    <span style={itemsObj.packed ? {textDecoration:"line-through"} : {}}>
      {itemsObj.quantity} {itemsObj.description}
      </span>
      <button onClick={()=>onDeleteItems(itemsObj.id)}>❌</button>
    </li>
 

}

function Stats({items}){
  if(!items.length){
    return (
      <p className="stats">Add Some Item in your Packing List</p>
    )
  }
  const totalItems = items.length;
  const packedItems = items.filter((item)=> item.packed===true).length;
  const percentage = Math.round((packedItems/totalItems)*100);

  return <footer className="stats">
    <em> 
      {
        percentage===100 ? `You packed Everything, Here we Go for Flight ✈️` : 
        `You have ${totalItems} items, and you have already packed ${packedItems} (${percentage}%) `
      }
      </em>
  </footer>
}