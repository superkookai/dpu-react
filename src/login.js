
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const form = React.useRef();
    const navigate = useNavigate();

    const onSubmitForm = (event) => {

        event.preventDefault();
        
        const formData = new FormData(form.current);
        const formEnt = Object.fromEntries(formData.entries());
        
        const endpoint = 'http://localhost:8080/login';
        const data = JSON.stringify({
            username: formEnt.username,
            password: formEnt.password
        });

        fetch(endpoint,{
            method: 'POST',
            body: data
        })
        .then((response)=>{
            if (response.ok){
                return response.json();
            }
            throw new Error('Fail to login');
        })
        .then((jsonResponse)=>{
            const jwt = jsonResponse.jwt;
            navigate('/products',{state:{data:jwt}});
        })
        .catch((error)=>{alert(error)});
        
    }

    const goToRegister = (event) => {
        navigate('/register');
    }
  
    return (
        <div className="mt-3 mx-auto p-3" style={{ width:'400px', background:'#cee'}}>
            <h1 className="text-center">Login</h1>
            <form ref={form} onSubmit={onSubmitForm}>
                <div className="form-group mb-3">
                    <label htmlFor="username">Username *</label>
                    <input type="text" id="username" name="username" className="form-control" required/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password *</label>
                    <input type="password" id="password" name="password" className="form-control" required/>
                </div>
                <button className="btn btn-primary col-12" type='submit'>Login</button>
                <button className="btn btn-outline-success col-12 mt-3" onClick={goToRegister}>Register</button>
            </form>
        </div>
    );
}