import { useState } from "react"

export default function CreateProduct(){
    const [name,setName] = useState('');
    const [detail,setDetail] = useState('');
    const [type,setType] = useState('');
    const [price,setPrice] = useState();
    const [image,setImage] = useState();

    const handleCreateProduct = (event) => {
        event.preventDefault();
        
        const endpoint = 'http://localhost:8080/product';
        const data = JSON.stringify({
            name: name,
            detail: detail,
            type: type,
            price: parseInt(price),
            image: image
        });
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODE3MzE2MTF9.iBQaS1kD20qo9mdndTPO4ZwRCJXGH1bFUO7gYJSNzKg';

        fetch(endpoint,{
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
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
            console.log(jsonResponse);
        })
    }

    return (
        <div className="mt-3 mx-auto p-3" style={{ width:'400px', background:'#cee'}}>
        <h1 className="text-center">Create Product</h1>
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
                <input type="file" id="image" name="image" className="form-control" value={image} onChange={(e)=>setImage(e.target.value)} required/>
            </div>
            <button className="btn btn-primary col-12" type='submit'>Save</button>
        </form>
    </div>
    )
}