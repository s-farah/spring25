import { useState } from 'react';
import './App.css';
import ShoppingList from './ShoppingList';
import CategoryFilter from './CategoryFilter';

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [budget] = useState(100);

  const addItem = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());
    formDataObj.purchased = false;

    setShoppingList([...shoppingList, formDataObj]);
    form.reset();
  };

  const removeItem = (event) => {
    const name = event.target.value;
    setShoppingList(shoppingList.filter(item => item.name !== name));
  };

  return (
    <>
      <h1>Shopping List Manager</h1>

      <div className='card'>
        <form onSubmit={addItem} className='flex-apart'>
          <input type="text" name="name" placeholder="Item name..." required />
          <select name="category" defaultValue="Grocery">
            <option value="Grocery">Grocery</option>
            <option value="School">School</option>
            <option value="Personal">Personal</option>
          </select>
          <input type="text" name="due" placeholder="Due date (e.g. 11-1)" />
          <button className='btn purple' type="submit">Add</button>
        </form>
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <ShoppingList
        shoppingList={
          selectedCategory === "All"
            ? shoppingList
            : shoppingList.filter(item => item.category === selectedCategory)
        }
        removeItem={removeItem}
      />
    </>
  );
}

export default App;
