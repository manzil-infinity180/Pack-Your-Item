import {useState} from "react";
import  Stats  from "./Stats";
import  Logo  from "./Logo";
import  Form  from "./Form";
import  PackingList  from "./PackingList";

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

