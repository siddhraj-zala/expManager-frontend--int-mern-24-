import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateExpense = () => {

    useEffect(() => {
        getUser();
        getPayee();
        getCategory();
        getSubCategory();
        getTransactionType();
        getPaymentType();
    }, [])

    const userId = sessionStorage.getItem("id");

    const [user, setuser] = useState([]); //contains the data of logged-in user
    //console.log('first name', user.firstName);
    const getUser = async () => {
        try {
            const res = await axios.get("http://localhost:4000/user/getUserById/" + userId);
            //console.log("user", res);
            setuser(res.data.data);

        } catch (err) {
            console.log('getUser error :', err);
        }
    }

    const [payee, setpayee] = useState([]);
    const getPayee = async () => {
        try {
            const res = await axios.get("http://localhost:4000/payee/getPayee");
            //console.log("payee", res);
            setpayee(res.data.data);

        } catch (err) {
            console.log('getPayee error :', err);
        }
    }

    const [category, setcategory] = useState([]);
    const getCategory = async () => {
        try {
            const res = await axios.get("http://localhost:4000/category/getCategory");
            setcategory(res.data.data);

        } catch (err) {
            console.log('getCategory error :', err);
        }
    }

    const [subCategory, setsubCategory] = useState([]);
    const getSubCategory = async () => {
        try {
            const res = await axios.get("http://localhost:4000/subCategory/getSubCategory");
            setsubCategory(res.data.data);

        } catch (err) {
            console.log('getSubCategory error :', err);
        }
    }

    const [transactionType, settransactionType] = useState([]);
    const getTransactionType = async () => {
        try {
            const res = await axios.get("http://localhost:4000/transactionType/getTransactionType");
            settransactionType(res.data.data);

        } catch (err) {
            console.log('getTransactionType error :', err);
        }
    }

    const [paymentType, setpaymentType] = useState([]);
    const getPaymentType = async () => {
        try {
            const res = await axios.get("http://localhost:4000/paymentType/getPaymentType");
            setpaymentType(res.data.data);

        } catch (err) {
            console.log('getPaymentType error :', err);
        }
    }

    const navigate = useNavigate();

    const id = useParams().id;
    //console.log('transaction id',id);

    const { register, handleSubmit } = useForm({
        defaultValues: async () => {
            const res = await axios.get("http://localhost:4000/transaction/getTransactionById/" + id);
            console.log('data to be updated :', res);
            return ({
                payee: res.data.data.payee.payeeName,
                transactionDateTime: res.data.data.transactionDateTime,
                category: res.data.data.category.categoryName,
                subCategory: res.data.data.subCategory.subCategoryName,
                transactionType: res.data.data.transactionType.transactionType,
                paymentType: res.data.data.paymentType.paymentType,
                amount: res.data.data.amount,
                description: res.data.data.description,
                status: res.data.data.status
            })
        }

    });
    const submitHandler = async (data) => {
        //console.log('form data', data);
        try {
            const res = await axios.put("http://localhost:4000/transaction/updateTransactionById/" + id, data);
            if (res.status === 200) {
                alert('transaction updated');
                // console.log("transaction data :", res.data.data);
                navigate('/user/expenseList');
            }
        }
        catch (err) {
            console.log("transaction updation error :", err);
        }

    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Update Transaction</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className="row">
                                    <div className="col-md-5 pr-1">
                                        <div className="form-group">
                                            <label htmlFor='transactionDateTime'>Date & Time</label>
                                            <input
                                                type='datetime-local' {...register('transactionDateTime')}
                                                className="form-control"
                                                disabled=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-3 px-1">
                                        <div className="form-group">
                                            <label htmlFor='category'>Category:</label>
                                            <select {...register('category')} className="form-control">
                                                {category.map((dt) => {
                                                    return (<option value={dt._id}>{dt.categoryName}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 pl-1">
                                        <div className="form-group">
                                            <label htmlFor='subCategory'>Sub category:</label>
                                            <select {...register('subCategory')} className="form-control">
                                                {subCategory.map((dt) => {
                                                    return (<option value={dt._id}>{dt.subCategoryName}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pr-1">
                                        <div className="form-group">
                                            <label htmlFor='user'>User:</label>
                                            <select {...register('user')} className="form-control">
                                                <option value={user._id}>{user.firstName}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6 pl-1">
                                        <div className="form-group">
                                            <label htmlFor='payee'>Payee:</label>
                                            <select {...register('payee')} className="form-control">
                                                {payee.map((dt) => {
                                                    return (<option value={dt._id}>{dt.payeeName}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 pr-1">
                                        <div className="form-group">
                                            <label htmlFor='transactionType'>Transaction type:</label>
                                            <select {...register('transactionType')} className="form-control">
                                                {transactionType.map((dt) => {
                                                    return (<option value={dt._id}>{dt.transactionType}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 px-1">
                                        <div className="form-group">
                                            <label htmlFor='paymentType'>Payment type:</label>
                                            <select {...register('paymentType')} className="form-control">
                                                {paymentType.map((dt) => {
                                                    return (<option value={dt._id}>{dt.paymentType}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4 pl-1">
                                        <div className="form-group">
                                            <label htmlFor='amount'>Amount:</label>
                                            <input type='text' {...register('amount')} className="form-control"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor='description'>Description:</label>
                                            <textarea {...register('description')}
                                                rows={4}
                                                cols={80}
                                                className="form-control"
                                                placeholder="Here can be your description"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor='status'>Status:</label>
                                            <input type='text' {...register('status')} className="form-control"></input>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-info btn-fill pull-right">
                                    Update
                                </button>
                                <div className="clearfix" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // <div>
        //     <h1>UpdateExpense</h1>

        //     <form onSubmit={handleSubmit(submitHandler)}>
        //         <div>
        //             <label htmlFor='payee'>Payee:</label>
        //             <select {...register('payee')}>
        //                 {payee?.map((dt) => {
        //                     return (<option value={dt._id}>{dt.payeeName}</option>)
        //                 })}

        //             </select>
        //         </div>
        //         <div>
        //             <label htmlFor='transactionDateTime'>Date-Time:</label>
        //             <input type='datetime-local' {...register('transactionDateTime')}></input>
        //         </div>
        //         <div>
        //             <label htmlFor='category'>Category:</label>
        //             <select {...register('category')}>
        //                 {category?.map((dt) => {
        //                     return (<option value={dt._id}>{dt.categoryName}</option>)
        //                 })}
        //             </select>
        //         </div>
        //         <div>
        //             <label htmlFor='subCategory'>Sub category:</label>
        //             <select {...register('subCategory')}>
        //                 {subCategory?.map((dt) => {
        //                     return (<option value={dt._id}>{dt.subCategoryName}</option>)
        //                 })}
        //             </select>
        //         </div>
        //         <div>
        //             <label htmlFor='transactionType'>Transaction type:</label>
        //             <select {...register('transactionType')}>
        //                 {transactionType?.map((dt) => {
        //                     return (<option value={dt._id}>{dt.transactionType}</option>)
        //                 })}
        //             </select>
        //         </div>
        //         <div>
        //             <label htmlFor='paymentType'>Payment type:</label>
        //             <select {...register('paymentType')}>
        //                 {paymentType?.map((dt) => {
        //                     return (<option value={dt._id}>{dt.paymentType}</option>)
        //                 })}
        //             </select>
        //         </div>
        //         <div>
        //             <label htmlFor='amount'>Amount:</label>
        //             <input type='text' {...register('amount')}></input>
        //         </div>
        //         <div>
        //             <label htmlFor='description'>Description:</label>
        //             <textarea {...register('description')}></textarea>
        //         </div>
        //         <div>
        //             <label htmlFor='status'>Status:</label>
        //             <input type='text' {...register('status')}></input>
        //         </div>
        //         <div>
        //             <input type='submit' value='update'></input>
        //         </div>
        //     </form>

        // </div>
    )
}
