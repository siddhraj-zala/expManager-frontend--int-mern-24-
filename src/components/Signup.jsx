import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {

    const navigate = useNavigate();

    useEffect(() => {

        getRole();

    }, [])

    const [roleData, setroleData] = useState([]);

    const getRole = async () => {
        try {

            const res = await axios.get("http://localhost:4000/role/getRole");
            //console.log("role data", res);
            setroleData(res.data.data);

        }
        catch (err) {
            console.log("getRole error:", err);
        }
    }

    const { register, handleSubmit } = useForm();
    const submitHandler = async (data) => {

        try {
            const res = await axios.post("http://localhost:4000/user/createUser", data);
            if (res.status === 201) {
                alert('SIGN UP done');
                //console.log('created user', res.data.data);
                navigate('/');

                // calling mail api of backend to send a mail
                // let htmlContent = `
                //                     <html>
                //                         <head>
                //                             <style>
                //                                 body {
                //                                     font-family: Arial, sans-serif;
                //                                 }
                //                                 .container {
                //                                     max-width: 600px;
                //                                     margin: 0 auto;
                //                                     padding: 20px;
                //                                     background-color: #f9f9f9;
                //                                 }
                //                             </style>
                //                         </head>
                //                         <body>
                //                             <div class="container">
                //                                 <h3 style="color:aqua">Welcome, ${res.data.data.firstName}!</h3>
                //                                 <p style="color:green">You are successfully registered at Expense manager.</p>
                //                             </div>
                //                         </body>
                //                     </html>
                //                 `;

                // const mailData = {
                //     to: res.data.data.email,
                //     subject: 'reg conf',
                //     html: htmlContent
                // }
                // const mailRes = await axios.post("http://localhost:4000/mail/sendMail", mailData);
            }
        }
        catch (err) {
            console.log('SIGN UP error :', err);
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4 className='card-title'>Sign-up</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor='firstName'>First name:</label>
                                            <input type='text' {...register('firstName')} className='form-control'></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor='lastName'>Last name:</label>
                                            <input type='text' {...register('lastName')} className='form-control'></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor='email'>E-mail:</label>
                                            <input type='text' {...register('email')} className='form-control'></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor='password'>Password:</label>
                                            <input type='password' {...register('password')} className='form-control'></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor='role'>Role:</label>
                                            <select {...register('role')} className='form-control'>
                                                <option>SELECT ROLE</option>
                                                {roleData.map((r) => {
                                                    return (
                                                        <option name={r.roleName} value={r._id}>{r.roleName} </option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-info btn-fill">
                                    Sign-up
                                </button>
                                <div className="clearfix" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

//     {/* <h1>Signup</h1>

        //     <form onSubmit={handleSubmit(submitHandler)}>
        //         <div>
        //             <label htmlFor='firstName'>First name:</label>
        //             <input type='text' {...register('firstName')} className='form-control'></input>
        //         </div>
        //         <div>
        //             <label htmlFor='lastName'>Last name:</label>
        //             <input type='text' {...register('lastName')} className='form-control'></input>
        //         </div>
        //         <div>
        //             <label htmlFor='email'>E-mail:</label>
        //             <input type='text' {...register('email')} className='form-control'></input>
        //         </div>
        //         <div>
        //             <label htmlFor='password'>Password:</label>
        //             <input type='password' {...register('password')} className='form-control'></input>
        //         </div>
        //         <div>
        //             <label htmlFor='role'>Role:</label>
        //             <select {...register('role')} className='form-control'>
        //                 <option>SELECT ROLE</option>
        //                 {roleData.map((r) => {
        //                     return (
        //                         <option name={r.roleName} value={r._id}>{r.roleName} </option>
        //                     )
        //                 })}
        //             </select>
        //         </div>
        //         <div>
        //             <input type='submit' value='SING UP'></input>
        //         </div>
        //     </form>

        // </div> */}
