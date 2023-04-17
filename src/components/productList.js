import React, {useState, useEffect} from "react";
import { useLocation,useNavigate } from 'react-router-dom';

export default function ProductList(){
    const location = useLocation();
    const receivedData = location.state.data;
    const navigate = useNavigate();
    const endpoint = 'http://localhost:8080/product/list';
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(endpoint)
        .then((response)=>{
            if (response.ok){
                return response.json();
            }
            throw new Error('Failed to fetch products');
        })
        .then((jsonResponse)=>{
            setProducts(jsonResponse.products);
        })
        .catch((error)=>{alert(error)});
    },[])

    const handleDelete = (id) => {
        setProducts(products.filter((product)=>{
            return product.id !== id;
        }));

        const productId = "26d0d531-22a2-4058-a836-b39ad36c8ed8";
        const url = `http://localhost:8080/product/${productId}`;

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE3MTc2NDl9.tageWyJRzh3eUxO0jCrSy_eqriHFN6Atk5CC4YSJrp8";

        fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Product deleted successfully');
        return response.json();
        })
        .then((jsonResponse)=>{
            console.log(jsonResponse);
        })
        .catch(error => {
        console.error('There was a problem deleting the product:', error);
        });
    }

    const handleUpdate = (id) => {
        console.log("updated id: " + id);
    }

    const handleCreateProduct = () => {
        navigate('/createproduct',{state:{data:receivedData}});
    }
    
    return (
        <div className="row text-center">
            <h1>Product List</h1>
            <p>{receivedData}</p>
            <button onClick={handleCreateProduct}>Create Product</button>
            {
                products.length > 0 &&
                products.map((product)=>{
                    return (
                    <div className="card col-4" style={{width: "18rem"}} key={product.id}>
                        <img src={`http://localhost:8080/uploads/products/${product.image}`} className="card-img-top" alt={product.name}/>
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">Type: {product.type}</p>
                            <button className="btn btn-primary" onClick={() => handleUpdate(product.id)}>Update</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                        </div>
                    </div>
                    )
                })
            }
        </div>
    )
}