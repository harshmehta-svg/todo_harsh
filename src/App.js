// @flow

import React from 'react';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>E-commerce Products</h1>
      </header>
      <ProductList />
    </div>
  );
}

export default App;