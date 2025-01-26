import React, { useState, useEffect } from 'react';
import './Style.css';

const ItemTable = ({ items, deleteItem, setEditItem }) => {
  const sortItemsByQuantity = () => {
    return [...items].sort((a, b) => a.quantity - b.quantity);
  };

  return (
    <table className="item-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortItemsByQuantity().map((item) => (
          <tr key={item.id} className={item.quantity < 10 ? 'low-stock' : ''}>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.quantity}</td>
            <td>
              <button onClick={() => setEditItem(item)}>Edit</button>
              <button onClick={() => deleteItem(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ItemForm = ({ addItem, editItem, editExistingItem }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setCategory(editItem.category);
      setQuantity(editItem.quantity);
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      editExistingItem({ id: editItem.id, name, category, quantity });
    } else {
      addItem({ name, category, quantity });
    }
    setName('');
    setCategory('');
    setQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <h2>{editItem ? 'Edit Item' : 'Add Item'}</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button type="submit">{editItem ? 'Update' : 'Add'}</button>
    </form>
  );
};

const InventoryApp = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item A', category: 'Electronics', quantity: 10 },
    { id: 2, name: 'Item B', category: 'Furniture', quantity: 5 },
    { id: 3, name: 'Item C', category: 'Electronics', quantity: 3 },
  ]);
  const [filter, setFilter] = useState('');
  const [editItem, setEditItem] = useState(null);

  const addItem = (item) => {
    setItems([...items, { ...item, id: items.length + 1 }]);
  };

  const editExistingItem = (item) => {
    setItems(items.map((i) => (i.id === item.id ? item : i)));
    setEditItem(null);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) => item.category.includes(filter));

  return (
    <div className="inventory-app">
      <h1>Inventory Management</h1>
      <ItemForm
        addItem={addItem}
        editItem={editItem}
        editExistingItem={editExistingItem}
      />
      <div className="filter">
        <label>Filter by Category:</label>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <ItemTable
        items={filteredItems}
        deleteItem={deleteItem}
        setEditItem={setEditItem}
      />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <InventoryApp />
    </div>
  );
}

export default App;
