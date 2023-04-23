import './App.css';
import Login from './components/login';
import ProductList from './components/productList';
import Register from './components/register';
import CreateProduct from './components/createProduct';
import UpdateProduct from './components/updateProduct';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/products" element={<ProductList/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/createproduct" element={<CreateProduct/>} />
        <Route path="/updateproduct" element={<UpdateProduct/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
