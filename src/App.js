import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import StockManagement from './components/StockManagement';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/stock-management" element={<StockManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
