import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();

    const { register, handleSubmit } = useForm();
    
    const submitHandler = async (data) => {
        try{
            const res = await axios.post("http://localhost:4000/user/login",data);
            //console.log('reees',res);
            if(res.status === 200){
                alert('login successful');
                sessionStorage.setItem("id", res.data.data._id);
                navigate('/user/dashboard');
            }
        }
        catch(err){
            console.log('login error :', err);
        }
        //console.log("form data:", data);
    }
    
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(submitHandler)}>
                <div>
                    <label htmlFor='email'>E-mail:</label>
                    <input type='text' {...register('email')}></input>
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' {...register('password')}></input>
                </div>
                <div>
                    <input type='submit' value='LOGIN'></input> OR <Link to='/signup'>SIGN UP</Link>
                </div>
            </form>
        </div>
    )
}
