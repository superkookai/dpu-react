import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';

export default function ProductList(){
    const location = useLocation();
    const receivedData = location.state.data;
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
    },[endpoint])

    const handleDelete = (id) => {
        setProducts(products.filter((product)=>{
            return product.id !== id;
        }));

        const productId = id;
        const url = `http://localhost:8080/product/${productId}`;

        const token = receivedData;

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
    
    return (
        <div className="row text-center">
            <h1>Product List</h1>
            <p>{receivedData}</p>
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