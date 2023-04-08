import logo from './logo.svg';
import './App.css';
import Login from './login';
import ProductList from './productList';
import Register from './register';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
