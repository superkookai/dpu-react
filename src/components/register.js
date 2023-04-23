import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Register(){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirm, setConfirm] = React.useState('');
    const navigate = useNavigate();

    const onSubmitForm = (event) => {
        event.preventDefault();
        if (password !== confirm){
            alert('Password not match!!');
        }else{
            const endpoint = 'http://localhost:8080/register';
            const data = JSON.stringify({
                username: username,
                password: password
            });

            fetch(endpoint,{
                method: 'POST',
                body: data
            })
            .then((response)=>{
                if (response.ok){
                    return response.json();
                }
                throw new Error('Fail to register');
            })
            .then((jsonResponse)=>{
                doLogin(username,password);
            })
            .catch((error)=>{alert(error)});
        }
    }

    const doLogin = (user,pass)=>{
        const endpoint = 'http://localhost:8080/login';
        const data = JSON.stringify({
            username: user,
            password: pass
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

    return (
        <div className="mt-5 mx-auto p-3 rounded" style={{ width:'400px', background:'skyblue'}}>
            <h3 className="text-center">Register</h3>
            <form onSubmit={onSubmitForm}>
                <div className="form-group mb-3">
                    <label htmlFor="username">Username *</label>
                    <input type="text" id="username" name="username" className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">Password *</label>
                    <input type="password" id="password" name="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="confirm">Confirm Password *</label>
                    <input type="password" id="confirm" name="confirm" className="form-control" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required/>
                </div>
                <button className="btn btn-primary col-12" type='submit'>Register</button>
            </form>
        </div>
    );
}