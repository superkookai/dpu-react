import { useState } from "react"
import { useLocation,useNavigate } from 'react-router-dom';

export default function CreateProduct(){
    const [name,setName] = useState('');
    const [detail,setDetail] = useState('');
    const [type,setType] = useState('');
    const [price,setPrice] = useState();
    const [image,setImage] = useState();

    const location = useLocation();
    const receivedData = location.state.data;
    const navigate = useNavigate();

    const handleCreateProduct = (event) => {
        event.preventDefault();
        
        const endpoint = 'http://localhost:8080/product';
        
        const data = new FormData();
        data.append('name', name);
        data.append('detail', detail);
        data.append('type', type);
        data.append('price', parseInt(price));
        data.append('image', image);

        const token = receivedData;

        fetch(endpoint,{
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then((response)=>{
            if (response.ok){
                return response.json();
            }
            throw new Error("Failed to create product");
        })
        .then((jsonResponse)=>{
            navigate('/products',{state:{data:receivedData}});
        })
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    }

    return (
        <div className="mt-5 mx-auto p-3 rounded" style={{ width:'400px', background:'skyblue'}}>
        <h3 className="text-center">Create Product</h3>
        <form onSubmit={handleCreateProduct}>
            <div className="form-group mb-3">
                <label htmlFor="productname">Product Name*</label>
                <input type="text" id="productname" name="productname" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} required/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="detail">Detail*</label>
                <input type="text" id="detail" name="detail" className="form-control" value={detail} onChange={(e)=>setDetail(e.target.value)} required/>
            </div>
            <div className="form-group mb-3">
            <label htmlFor="detail">Type*</label>
                <select className="form-select" aria-label="Default select example" value={type} onChange={(e)=>setType(e.target.value)} required>
                    <option value="COFFEE">COFFEE</option>
                    <option value="TEA">TEA</option>
                    <option value="CREATIVE">CREATIVE</option>
                    <option value="SNACK">SNACK</option>
                </select>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="price">Price*</label>
                <input type="number" id="price" name="price" className="form-control" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="image">Image*</label>
                <input type="file" id="image" name="image" className="form-control" onChange={handleImageChange} required/>
            </div>
            <button className="btn btn-primary col-12" type='submit'>Save</button>
        </form>
    </div>
    )
}